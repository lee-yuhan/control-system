// 质差
import { Echarts5 } from '@/compoments/Echarts5';
import { useMemo, useRef } from 'react';
import CardWrapper from '@/compoments/CardWrapper';
import Tab from '@/compoments/Tab';
import { useState } from 'react';
import CardCondition from '../CardCondition';
import { hiddenXAxis, hiddenYAxis, themeEhcartColor } from '@/utils/ehcart';
import lineIcon1 from '../../../../../assets/icon_line1.png';
import legendIcon1 from '../../../../../assets/icon_legend1.png';
import lineIcon4 from '../../../../../assets/icon_line4.png';
import lineIcon2 from '../../../../../assets/icon_line2.png';
import legendIcon9 from '../../../../../assets/icon_legend9.png';
import { useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { baseConfig, satisfactionNameMap } from '../../config';
import { map, merge } from 'lodash';
import * as echarts from 'echarts';
import {
  useEchartClick,
  useEchartMouseAid,
  useRequestAid,
  useStatExportAid,
} from '../../hook';
import moment from 'moment';
import { Button } from 'antd';
import ExportTypeModal from '../ExportTypeModal';
import DetailModal from '../DetailModal';

const Index = () => {
  const [tabValue, setTabValue] =
    useState<keyof typeof satisfactionNameMap>('8');
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);
  const mRef = useRef<any>(null);

  const { data, params, setParams, loading, requestParams } =
    useRequestAid(tabValue);
  const { exRef, handleExport, beforeExport } = useStatExportAid(requestParams);

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: satisfactionNameMap[tabValue],
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
          name: satisfactionNameMap[tabValue],
          type: 'line',
          data: map(data, 'satisfaction'),
          smooth: true,
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
          data: map(data, ({ rate }) => ({
            value: rate,
          })),
          symbol: `image://${lineIcon4}`,
          symbolSize: 8,
          smooth: true,
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
  }, [theme, data, tabValue]);

  useEchartMouseAid(mRef, option, lineIcon4, lineIcon2);

  const [_, dRef] = useEchartClick(
    {
      mode: tabValue,
      xAxisDatas: map(data, 'date'),
      custType: params?.custType,
    },
    mRef,
  );

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
          onChange={setTabValue as any}
          options={[
            {
              id: '8',
              name: '质差上门率',
            },
            {
              id: '9',
              name: '质差十分满意度',
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
