// 质差
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { hiddenXAxis, hiddenYAxis, themeEhcartColor } from '@/utils/ehcart';
import lineIcon1 from '../../../../../assets/icon_line1.png';
import legendIcon1 from '../../../../../assets/icon_legend1.png';
import lineIcon4 from '../../../../../assets/icon_line4.png';

import legendIcon9 from '../../../../../assets/icon_legend9.png';
import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { baseConfig } from '../../config';
import { map, merge } from 'lodash';
import * as echarts from 'echarts';
import { useRequestAid } from '../../hook';
import moment from 'moment';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('8');
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const { data, setParams, loading } = useRequestAid(tabValue);

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: '满意度',
            icon: `image://${legendIcon1}`,
          },
          {
            name: '环比',
            icon: `image://${legendIcon9}`,
          },
        ],
      },
      xAxis: {
        data: map(data, 'latitude'),
      },
      series: [
        {
          name: '满意度',
          type: 'line',
          data: map(data, 'satisfaction'),
          symbol: `image://${lineIcon1}`,
          symbolSize: 8,
          lineStyle: {
            color: themeEhcartColor[theme]['--primary-color'],
            width: 3,
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--primary-color'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}%`;
            },
          },
        },
        {
          name: '环比',
          type: 'line',
          data: map(data, 'rate'),
          symbol: `image://${lineIcon4}`,
          symbolSize: 8,
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: themeEhcartColor[theme]['--area-danger-color-start'],
              },
              {
                offset: 1,
                color: themeEhcartColor[theme]['--area-danger-color-end'],
              },
            ]),
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--danger-color'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}%` as string;
            },
          },
        },
      ],
    });
  }, [theme, data]);
  return (
    <CardWrapper
      loading={loading}
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '8',
              name: '质差上门率',
            },
            {
              id: '9',
              name: '质差10分满意率',
            },
          ]}
        />
      }
    >
      <CardCondition onValuesChange={setParams} />
      <Echarts5 option={option} />
    </CardWrapper>
  );
};

export default Index;
