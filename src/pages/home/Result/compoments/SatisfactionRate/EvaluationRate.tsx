// 满意率
import { Echarts5 } from '@/compoments/Echarts5';
import { FC, useImperativeHandle, useMemo } from 'react';
import { themeEhcartColor } from '@/utils/ehcart';
import { useRequest, useSelector } from 'umi';
import { getLocalStorageTheme } from '@/utils/theme';
import { getStatData } from '../../service';
import { useDebounceEffect } from 'ahooks';
import { Spin } from 'antd';
import { useEchartMouseAid, useRequestAid, useStatExportAid } from '../../hook';
import { map, merge } from 'lodash';
import { baseConfig } from '../../config';
import legendIcon3 from '../../../../../assets/icon_legend3.png';
import lineIcon2 from '../../../../../assets/icon_line2.png';
import CardCondition from '../CardCondition';
import ExportTypeModal from '../ExportTypeModal';

const Index: FC<{ mRef: any }> = ({ mRef }) => {
  const themeChangeTag = useSelector(
    (store: any) => store.common.themeChangeTag,
  );
  const theme = useMemo(() => {
    return getLocalStorageTheme();
  }, [themeChangeTag]);

  const { data, params, setParams, loading, requestParams } =
    useRequestAid('10');

  const { exRef, handleExport, beforeExport } = useStatExportAid(requestParams);

  useImperativeHandle(mRef, () => ({
    exportData: beforeExport,
  }));

  const option = useMemo(() => {
    return merge({}, baseConfig, {
      legend: {
        textStyle: {
          color: themeEhcartColor[theme]['--text-color2'],
        },
        data: [
          {
            name: '低分工单数',
            icon: `image://${legendIcon3}`,
          },
        ],
      },
      xAxis: {
        data: map(data, 'latitude'),
      },
      series: [
        {
          name: '低分工单数',
          type: 'line',
          data: map(data, 'satisfaction'),
          symbol: `image://${lineIcon2}`,
          symbolSize: 8,
          smooth: true,
          lineStyle: {
            color: themeEhcartColor[theme]['--danger-color'],
            width: 3,
          },
          label: {
            show: true,
            position: 'top',
            color: themeEhcartColor[theme]['--danger-color'],
            formatter: (p: { value: number }) => {
              return `${p.value ?? ''}`;
            },
          },
        },
      ],
    });
  }, [theme, data]);

  return (
    <Spin spinning={loading}>
      <CardCondition params={params} mode="10" onValuesChange={setParams} />

      <div style={{ flex: 1 }}>
        <Echarts5 option={option} style={{ height: '100%' }} />
      </div>
      <ExportTypeModal mRef={exRef} onConfirm={handleExport} />
    </Spin>
  );
};

export default Index;
