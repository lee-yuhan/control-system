import { useDebounceEffect, useSize } from 'ahooks';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRequest, useSelector } from 'umi';
import { getLatitudeStatData } from './service';
import { cloneDeep, isNaN, isNil } from 'lodash';
import qs from 'qs';
import { IExportType } from './compoments/ExportTypeModal';
import cookie from 'react-cookies';
import { addClickEvent } from '@/utils/ehcart';

export const useRequestAid = (mode: string) => {
  const [params, setParams] = useState({
    custType: '',
  });

  const { branchName, regionName, latitude, gridName, step, date } =
    useSelector((store: any) => store.home);
  const { data, run, loading } = useRequest(getLatitudeStatData, {
    manual: true,
  });

  const requestParams = useMemo(() => {
    return {
      branchName,
      custType: params?.custType,
      regionName,
      latitude: latitude?.toString(),
      gridName,
      mode,
      queryNum: step,
      date,
    };
  }, [
    branchName,
    step,
    date,
    params?.custType,
    gridName,
    regionName,
    latitude,
    mode,
  ]);

  useDebounceEffect(
    () => {
      if (!mode || !regionName) return;
      run(requestParams);
    },
    [regionName, requestParams, mode],
    { wait: 400 },
  );

  return { data, params, setParams, loading, requestParams };
};

export const useStatExportAid = (params: any) => {
  const exRef = useRef<any>();

  const formatParams = useMemo(() => {
    return {
      ...params,
      latitude: params?.latitude?.toString(),
      token: cookie.load('AuthToken'),
    };
  }, [params]);

  const handleExport = useCallback(
    (type: IExportType) => {
      if (type === 'ECHART_DATA') {
        window.open(`${API_PREFIX}/stat/export?${qs.stringify(formatParams)}`);
      } else {
        window.open(
          `${API_PREFIX}/stat/infoDetailExport?${qs.stringify(formatParams)}`,
        );
      }
    },
    [formatParams],
  );

  const beforeExport = () => {
    exRef?.current?.showModal();
  };

  return { handleExport, exRef, beforeExport };
};

export const useEchartMouseAid = (
  mRef: any,
  orignOption: any,
  orignIcon: any,
  hightIcon: any,
) => {
  useDebounceEffect(
    () => {
      const inst = mRef?.current;

      inst?.getZr().on('mousemove', (params: any) => {
        const option = inst.getOption();
        const currOption = cloneDeep(option);
        const pointInPixel = [params.offsetX, params.offsetY];

        if (inst.containPixel({ gridIndex: 'all' }, pointInPixel)) {
          const xIndex = inst.convertFromPixel(
            { gridIndex: 'all' },
            pointInPixel,
          )[0];

          if (isNaN(xIndex)) {
            return;
          }

          const symbol = currOption.series[1]?.data[xIndex]?.symbol;

          if (symbol === `image://${hightIcon}`) {
            return;
          }

          currOption.series[1].data?.forEach((item: any, index: number) => {
            if (index === xIndex) {
              item.symbol = `image://${hightIcon}`;
              item.symbolSize = 12;
            } else {
              item.symbol = `image://${orignIcon}`;
              item.symbolSize = 8;
            }
          });

          inst.setOption(currOption, true);
          inst.dispatchAction({
            type: 'highlight',
            seriesIndex: 1, // 指定series中的map的索引
            dataIndex: xIndex, // 高亮的区域的索引，可从回调参数params中获取
          });
        } else {
          inst.setOption(orignOption, true);
        }
      });
    },
    [mRef, orignOption],
    { wait: 300 },
  );

  // useDebounceEffect(
  //   () => {
  //     const inst = mRef?.current;
  //     const option = inst.getOption();
  //     const currOption = cloneDeep(option);
  //     inst?.getZr().on('mouseout', 'series.line', (params: any) => {
  //       console.log("mouseout");

  //       const pointInPixel = [params.offsetX, params.offsetY];
  //       if (inst.containPixel({ gridIndex: 'all' }, pointInPixel)) {
  //         currOption.series[1].data?.forEach((item: any, index: number) => {
  //           item.symbol = `image://${orignIcon}`;
  //         });

  //         inst.setOption(currOption, true);
  //       }
  //     });
  //   },
  //   [mRef],
  //   { wait: 300 },
  // );
};

export const useEchartHeightAid = () => {
  const dRef = useRef<any>();
  const size = useSize(dRef);
  const height = useMemo(() => {
    return size?.height;
  }, [size?.height]);
  return { height, dRef };
};

export const useEchartClick = (xAxisDatas: any) => {
  const mRef = useRef<any>();
  const dRef = useRef<any>();
  console.log('1113', xAxisDatas);

  const handleClick = useCallback(
    (xIndex: number) => {
      const r = xAxisDatas?.[xIndex];
      console.log('!11', r);

      // const [start, end] = r.split('-');
      dRef?.current?.showModal(r);
    },
    [xAxisDatas],
  );
  const inst = mRef.current;

  console.log('inst?.getZr()', inst?.getZr());

  addClickEvent(inst, handleClick);
  return [mRef, dRef];
};
