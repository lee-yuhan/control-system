import {
  useEventListener,
  useMount,
  useUpdateEffect,
  useUpdateLayoutEffect,
} from 'ahooks';
import { Empty, Spin } from 'antd';
import * as echarts from 'echarts';
import { debounce } from 'lodash';
// import type { themeType } from './theme';
import {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { PpssContext } from '../../PpssContext';
import './index.less';

export type EchartInitOpts = Parameters<typeof echarts.init>[2];

export interface Echarts5Props {
  className?: string;
  width?: number;
  height?: number;
  /**
   * echart style
   */
  style?: React.CSSProperties;
  /**
   * wrapper dom style
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * 显示加载状态
   */
  loading?: boolean;
  /**
   * 显示空组件, 此时图不会渲染, 也获取不到图实例
   */
  isEmpty?: boolean;
  /**
   * react hooks ref
   */
  ref?: React.MutableRefObject<echarts.ECharts | undefined | null>;
  /**
   * 类型为 echarts.EChartsOption 请自己判断要不要使用
   */
  option: any;
  /**
   * 数据变化时的选项参数
   *
   * 文档参考 https://echarts.apache.org/zh/api.html#echartsInstance.setOption
   */
  optionOpts?: any;
  /**
   * echarts.init 主题，默认为 PpssContext.echarts.theme
   */
  // theme?: themeType;
  /**
   * echarts.init 附加参数
   */
  initOpts?: EchartInitOpts;
  // /**
  //  * 取消父元素大小变化监听，暂时没想到使用场景
  //  */
  // disableResizeObserver?: boolean;
  resizeUpdate?: boolean;
}

export const Echarts5HeightEnum = {
  DEFAULT: 270, // 默认高度
  DEVIATION: 400, // 偏差高度
};

/**
 * 使用 React Hooks 封装的 ECharts 5 组件，用于替代 echarts-for-react
 */
export const Echarts5 = memo(
  forwardRef((props: Echarts5Props, ref: any) => {
    const { className = '', resizeUpdate = true } = props;
    const [visible, setVisible] = useState(true);
    const style = useMemo(
      () => ({
        width: props.width ?? '100%',
        height: props.height ?? Echarts5HeightEnum.DEFAULT,
        minHeight: Echarts5HeightEnum.DEFAULT,
        ...props.style,
      }),
      [props.height, props.style, props.width],
    );

    // const { echarts: echartsContext } = useContext(PpssContext);
    // const theme = useMemo(
    //   () => props.theme ?? echartsContext?.theme,
    //   [echartsContext?.theme, props.theme],
    // );

    // !chartDomRef 与 props.isEmpty 互斥
    const chartDomRef = useRef<HTMLDivElement | null>(null);
    const chartInstRef = useRef<echarts.ECharts | null>(null);

    useEventListener('resize', () => {
      if (resizeUpdate) {
        setVisible(false);
        setTimeout(() => {
          setVisible(true);
        }, 0);
      }
    });

    // 初始化
    useMount(() => {
      if (chartDomRef.current) {
        chartInstRef.current = echarts.init(
          chartDomRef.current,
          undefined,
          props.initOpts,
        );
      }
      if (ref) {
        ref.current = chartInstRef.current;
      }
    });

    // 销毁重建
    useUpdateEffect(() => {
      chartInstRef.current?.dispose();
      chartInstRef.current = null;
      if (chartDomRef.current) {
        chartInstRef.current = echarts.init(
          chartDomRef.current,
          undefined,
          props.initOpts,
        );
        chartInstRef.current.setOption(props.option, props.optionOpts);
      }
      if (ref) {
        ref.current = chartInstRef.current;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.initOpts, props.isEmpty, visible]);

    // 数据变化
    useEffect(() => {
      /* 如果option没有用预设配置，给予警告 */
      if (!props.option.__preset__) {
        // eslint-disable-next-line no-console
        console.warn('Echarts5 without useEchartsOption!');
      }
      chartInstRef.current?.setOption(props.option, props.optionOpts);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.option]);

    // 监听容器大小变化
    useEffect(() => {
      if (!chartDomRef.current) {
        return () => null;
      }
      const fatherDom = chartDomRef.current?.parentElement;
      const onResize = debounce(() => {
        chartInstRef.current?.resize();
      }, 300);
      const ro = new ResizeObserver(() => {
        onResize();
      });
      if (fatherDom) {
        ro.observe(fatherDom);
      }
      return () => {
        ro.disconnect();
      };
    }, [props.isEmpty, visible]);

    // 图大小变化
    useUpdateLayoutEffect(() => {
      chartInstRef.current?.resize();
    }, [style.height, style.width]);

    return (
      visible && (
        <div className="echarts-5-wrapper" style={props.wrapperStyle}>
          <Spin spinning={!!props.loading}>
            {props.isEmpty ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={style} />
            ) : (
              <div
                ref={chartDomRef}
                className={`echarts-5 ${className}`}
                style={style}
              />
            )}
          </Spin>
        </div>
      )
    );
  }),
);
