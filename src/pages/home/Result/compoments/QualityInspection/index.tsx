// 质检
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { hiddenXAxis, hiddenYAxis, themeEhcartColor } from '@/utils/ehcart';
import { baseConfig } from '../../config';
import { getLocalStorageTheme } from '@/utils/theme';
import { merge, random } from 'lodash';
import { useSelector } from 'umi';
import lineIcon2 from '../../../../../assets/icon_line2.png';
import lineIcon5 from '../../../../../assets/icon_line5.png';
import legendIcon10 from '../../../../../assets/icon_legend10.png';
import legendIcon3 from '../../../../../assets/icon_legend3.png';
import * as echarts from 'echarts';
import { Button } from 'antd';
import moment from 'moment';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('aa');
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: '满意度',
            icon: `image://${legendIcon3}`,
          },
          {
            name: '环比',
            icon: `image://${legendIcon10}`,
          },
        ],
      },
      xAxis: {
        data: Array(7)
          .fill('')
          .map((_, index) => moment().clone().add(index).format('MM-DD')),
      },
      series: [
        {
          name: '满意度',
          type: 'line',
          data: Array(7)
            .fill('')
            .map((_) => random(0, 100)),
          symbol: `image://${lineIcon2}`,
          symbolSize: 8,
          lineStyle: {
            color: themeEhcartColor[theme]['--danger-color'],
            width: 3,
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--danger-color'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}`;
            },
          },
        },
        {
          name: '环比',
          type: 'line',
          data: Array(7)
            .fill('')
            .map((_) => random(0, 100)),
          symbol: `image://${lineIcon5}`,
          symbolSize: 8,
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: themeEhcartColor[theme]['--area-primary-color-start'],
              },
              {
                offset: 1,
                color: themeEhcartColor[theme]['--area-primary-color-end'],
              },
            ]),
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--primary-color'],
            valueAnimation: true,
            // formatter: (p: { value: number }) => {
            //   return `${p.value ?? ''}`;
            // },
          },
        },
      ],
    });
  }, [theme]);
  return (
    <CardWrapper
      extra={<Button className="export-btn">导入</Button>}
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: 'aa',
              name: '质检真实率',
            },
            {
              id: 'aa1',
              name: '质检规范性',
            },
          ]}
        />
      }
    >
      <CardCondition mode={tabValue} onValuesChange={() => {}} />
      <Echarts5 option={option} />
    </CardWrapper>
  );
};

export default Index;
