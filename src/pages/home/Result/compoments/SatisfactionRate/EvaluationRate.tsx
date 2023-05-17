// 满意率
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo } from 'react';
import { themeEhcartColor } from '@/utils/ehcart';
import { useRequest, useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { getStatData } from '../../service';
import { useDebounceEffect } from 'ahooks';
import { Spin } from 'antd';
const Index = () => {
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const { branchName, regionName } = useSelector((store: any) => store.home);
  const { data, run, loading } = useRequest(getStatData, {
    manual: true,
  });

  useDebounceEffect(
    () => {
      if (!branchName || !regionName) return;
      run({
        branchName,
        regionName,
        mode: '6',
      });
    },
    [branchName, regionName],
    { wait: 300 },
  );

  const option = useMemo(() => {
    return {
      series: [
        {
          hoverAnimation: false, // 滑动效果隐藏
          silent: true, // 取消滑动高亮效果
          name: '测评',
          type: 'pie',
          radius: [90, 120],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter:
                '{total|' +
                (data?.satisfaction ?? 0) +
                '%' +
                '}' +
                '\n\r' +
                '{active|总数}',
              rich: {
                total: {
                  fontSize: 42,
                  color: themeEhcartColor[theme]['--text-color2'],
                },
                active: {
                  fontSize: 18,
                  color: themeEhcartColor[theme]['--text-color1'],
                },
              },
            },
            emphasis: {
              //中间文字显示
              show: true,
            },
          },
          data: [
            {
              value: 100 * (data?.satisfaction ?? 0),
              name: '满意比例',
              itemStyle: { color: themeEhcartColor[theme]['--primary-color'] },
            },
            {
              value: 100 * (1 - data?.satisfaction ?? 0),
              name: '其他比例',
              itemStyle: {
                color: themeEhcartColor[theme]['--background-color1'],
              },
              label: { show: false },
            },
          ],
        },
      ],
    };
  }, [theme, data]);
  return (
    <Spin spinning={loading}>
      <Echarts5 style={{ height: '100%' }} option={option} />
    </Spin>
  );
};

export default Index;
