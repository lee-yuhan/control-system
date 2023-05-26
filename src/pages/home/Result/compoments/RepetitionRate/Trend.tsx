// 重复率
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
import { map, merge, random } from 'lodash';
import lineIcon3 from '../../../../../assets/icon_line3.png';

import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { baseConfig, satisfactionNameMap } from '../../config';
import { useRequestAid } from '../../hook';
import moment from 'moment';
import { Spin } from 'antd';
const Index = () => {
  const [tabValue] = useState<string>('7');
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const { data, params, setParams, loading } = useRequestAid(tabValue);

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        itemHeight: 18,
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: satisfactionNameMap[tabValue],
            icon: `image://${legendIcon4}`,
          },
          {
            name: '环比',
            icon: `image://${legendIcon7}`,
          },
        ],
      },
      xAxis: {
        data: map(data, 'latitude'),
      },

      series: [
        {
          name: satisfactionNameMap[tabValue],
          type: 'line',
          symbol: `image://${lineIcon3}`,
          symbolSize: 8,
          smooth: true,
          data: map(data, 'satisfaction'),

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
              return `${p.value ?? ''}%`;
            },
          },
        },
        {
          name: '环比',
          type: 'bar',
          data: map(data, 'rate'),
          itemStyle: {
            color: themeEhcartColor[theme]['--primary-color'],
          },
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            offset: [0, -4],
            color: themeEhcartColor[theme]['--primary-color'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}%`;
            },
          },
        },
      ],
    });
  }, [theme, tabValue, data]);
  return (
    <Spin spinning={loading}>
      <CardCondition
        mode={tabValue}
        params={params}
        onValuesChange={setParams}
      />
      <Echarts5 option={option} />
    </Spin>
  );
};

export default Index;
