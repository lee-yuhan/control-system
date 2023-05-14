// 满意率
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { hiddenXAxis, hiddenYAxis, themeEhcartColor } from '@/utils/ehcart';
import legendIcon4 from '../../../../../assets/icon_legend4.png';
import legendIcon7 from '../../../../../assets/icon_legend7.png';
import * as echarts from 'echarts';
import { merge } from 'lodash';
import lineIcon3 from '../../../../../assets/icon_line3.png';
import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { baseConfig } from '../../config';
const Index = () => {
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        itemHeight: 20,
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: '满意度',
            icon: `image://${legendIcon4}`,
          },
          {
            name: '环比',
            icon: `image://${legendIcon7}`,
          },
        ],
      },
      xAxis: {
        data: Array(6)
          .fill('')
          .map((_, index) => index),
      },
      series: [
        {
          name: '满意度',
          type: 'line',
          // lineStyle: {
          //   color: themeEhcartColor[theme]['--danger-color'],
          //   width: 3,
          // },
          symbol: `image://${lineIcon3}`,
          symbolSize: 8,
          data: [5, 20, 36, 10, 10, 20],
          lineStyle: {
            color: themeEhcartColor[theme]['--area-line-color'],
            width: 1,
          },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: themeEhcartColor[theme]['--area-color-start'],
              },
              {
                offset: 1,
                color: themeEhcartColor[theme]['--area-color-end'],
              },
            ]),
          },

          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--text-color2'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}`;
            },
          },
        },
        {
          name: '环比',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],

          itemStyle: {
            color: themeEhcartColor[theme]['--danger-color'],
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--danger-color'],
            valueAnimation: true,
          },
        },
      ],
    });
  }, [theme]);
  return (
    <>
      <CardCondition />
      <Echarts5 option={option} />
    </>
  );
};

export default Index;
