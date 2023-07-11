// 装维质量
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo, useRef } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { hiddenXAxis, hiddenYAxis, themeEhcartColor } from '@/utils/ehcart';
import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { baseConfig, satisfactionNameMap } from '../../config';
import { map, merge } from 'lodash';
import * as echarts from 'echarts';
import lineIcon1 from '../../../../../assets/icon_line1.png';
import lineIcon2 from '../../../../../assets/icon_line2.png';
import legendIcon3 from '../../../../../assets/icon_legend3.png';
import legendIcon5 from '../../../../../assets/icon_legend5.png';
import {
  useEchartClick,
  useEchartMouseAid,
  useRequestAid,
  useStatExportAid,
} from '../../hook';
import { Button } from 'antd';
import ExportTypeModal from '../ExportTypeModal';
import DetailModal from '../DetailModal';

const Index = () => {
  const [tabValue, setTabValue] = useState<string>('4');

  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);
  const mRef = useRef<any>();

  const { data, params, setParams, loading, requestParams } =
    useRequestAid(tabValue);

  const { exRef, handleExport, beforeExport } = useStatExportAid(requestParams);
  const [_, dRef] = useEchartClick(
    {
      mode: tabValue,
      xAxisDatas: map(data, 'date'),
      custType: params?.custType,
    },
    mRef,
  );
  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: satisfactionNameMap[tabValue],
            icon: `image://${legendIcon5}`,
          },
          {
            name: '环比',
            icon: `image://${legendIcon3}`,
          },
        ],
      },
      xAxis: {
        data: map(data, 'latitude'),
      },
      series: [
        {
          name: satisfactionNameMap[tabValue],
          type: 'bar',
          data: map(data, 'satisfaction'),
          itemStyle: {
            barBorderRadius: [2, 2, 0, 0], //柱体圆角
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(205, 55, 45, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(205, 55, 45, 0.03)',
              },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  // color: 'rgba(25, 75, 252, 0.4)',
                  color: 'rgba(205, 55, 45, 0.4)',
                },
                {
                  offset: 1,
                  color: 'rgba(205, 55, 45, 0.03)',
                },
              ]),
            },
          },

          label: {
            show: true,
            position: 'top',
            offset: [0, -4],
            color: themeEhcartColor[theme]['--text-color2'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}%`;
            },
          },
        },
        {
          name: '环比',
          type: 'line',
          data: map(data, ({ rate }) => ({
            value: rate,
          })),
          symbol: `image://${lineIcon2}`,
          symbolSize: 8,
          lineStyle: {
            color: themeEhcartColor[theme]['--danger-color'],
            width: 3,
          },
          smooth: true,
          label: {
            show: true,
            position: 'top',
            offset: [0, 0],
            color: themeEhcartColor[theme]['--danger-color'],
            valueAnimation: true,
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}%`;
            },
          },
        },
      ],
    });
  }, [theme, data, tabValue]);

  useEchartMouseAid(mRef, option, lineIcon2, lineIcon1);

  return (
    <CardWrapper
      loading={loading}
      extra={
        <Button className="export-btn" onClick={beforeExport}>
          导出
        </Button>
      }
      header={
        <Tab
          value={tabValue}
          onChange={setTabValue}
          options={[
            {
              id: '4',
              name: '维修工单履约率',
            },
            {
              id: '5',
              name: '维修工单改约率',
            },
          ]}
        />
      }
    >
      <CardCondition
        mode={tabValue}
        params={params}
        onValuesChange={setParams}
      />
      <div style={{ flex: 1 }}>
        <Echarts5 ref={mRef} option={option} style={{ height: '100%' }} />
      </div>
      <ExportTypeModal mRef={exRef} onConfirm={handleExport} />
      <DetailModal mRef={dRef} />
    </CardWrapper>
  );
};

export default Index;
