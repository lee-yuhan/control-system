// 满意率
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo } from 'react';
import { themeEhcartColor } from '@/utils/ehcart';
import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { useRequestAid } from '../../hook';
const Index = () => {
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const { data } = useRequestAid('6');

  const option = useMemo(() => {
    return {
      series: [
        {
          hoverAnimation: false, // 滑动效果隐藏
          silent: true, // 取消滑动高亮效果
          name: 'Access From',
          type: 'pie',
          radius: [90, 120],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: '{total|' + 200 + '}' + '\n\r' + '{active|总数}',
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
              value: 100,
              name: 'Search Engine',
              itemStyle: { color: themeEhcartColor[theme]['--primary-color'] },
            },
            {
              value: 10,
              name: 'Direct',
              itemStyle: {
                color: themeEhcartColor[theme]['--background-color1'],
              },
              label: { show: false },
            },
          ],
        },
      ],
    };
  }, [theme]);
  return (
    <>
      <Echarts5 style={{ height: '100%' }} option={option} />
    </>
  );
};

export default Index;
