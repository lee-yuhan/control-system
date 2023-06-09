import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import LabelsView from '@/compoments/LabelsView';
import { Col, Progress, Row, Table } from 'antd';
import { merge, random } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';
import { typeOptions } from './config';
import { useRequest, useSelector } from 'umi';
import { getSumarryStat } from '../../services';

const basicLegend = {
  itemGap: 20,
  textStyle: {
    color: '#fff',
    rich: {
      a: {
        fontSize: 18,
        color: '#0DB1EE',
      },
      b: {
        fontSize: 25,
        color: '#67DDFF',
        width: 80,
      },
    },
  },
};

const Index = () => {
  const { branchName, regionName, gridName, channelName, tagName } =
    useSelector((store: any) => store.main);
  const [selectKey, setSelectKey] = useState('1');
  const currSelectItem = useMemo(() => {
    return typeOptions?.find((item) => item.id === selectKey);
  }, [selectKey]);

  const { run, data, loading } = useRequest(getSumarryStat, {
    manual: true,
  });

  useEffect(() => {
    if (!regionName) return;
    run({
      appId: 1,
      areaName: branchName || regionName,
      channelName,
      tagName,
    });
  }, [regionName, branchName, channelName, tagName]);

  const baseSeries = useMemo(() => {
    return [
      {
        name: '情况统计',
        type: 'pie',
        startAngle: 0,
        radius: ['50%', '75%'],
        center: ['50%', 120],
        emphasis: { disabled: true },
        height: 300,
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: data?.[currSelectItem!.key1] ?? 0,
            name: '装',
            itemStyle: {
              color: 'rgba(40, 69, 233, 1)',
            },
          },
          {
            value: data?.[currSelectItem!.key2] ?? 0,
            name: '拆',
            itemStyle: {
              color: 'rgba(61, 215, 177, 1)',
            },
          },
          {
            value: data?.[currSelectItem!.key3] ?? 0,
            name: '移',
            itemStyle: {
              color: 'rgba(12, 164, 208, 1)',
            },
          },
          {
            value: data?.[currSelectItem!.key4] ?? 0,
            name: '改',
            itemStyle: {
              color: 'rgba(245, 100, 100,1)',
            },
          },
        ],
      },
    ];
  }, [data, currSelectItem]);

  const option = {
    animation: false,
    legend: [
      {
        ...basicLegend,
        bottom: 100,
        left: 10,
        data: ['装'],
        formatter: (name: string) => {
          return `{a| ${name}}` + `{b| ${data?.[currSelectItem!.key1] ?? 0}}`;
        },
      },
      {
        ...basicLegend,
        bottom: 100,
        left: '55%',
        data: ['拆'],
        formatter: (name: string) => {
          return `{a| ${name}}` + `{b| ${data?.[currSelectItem!.key2] ?? 0}}`;
        },
      },
      {
        ...basicLegend,
        bottom: 50,
        left: 10,
        data: ['移'],
        formatter: (name: string) => {
          return `{a| ${name}}` + `{b| ${data?.[currSelectItem!.key3] ?? 0}}`;
        },
      },
      {
        ...basicLegend,
        bottom: 50,
        left: '55%',
        data: ['改'],
        formatter: (name: string) => {
          return `{a| ${name}}` + `{b| ${data?.[currSelectItem!.key4] ?? 0}}`;
        },
      },
    ],
    series: baseSeries
      ?.map((item) => {
        return [
          item,
          {
            ...item,
            radius: ['35%', '60%'],
            data: item?.data?.map((sitem) =>
              merge({}, sitem, {
                itemStyle: {
                  opacity: 0.6,
                },
              }),
            ),
          },
          {
            ...item,
            height: 255,
            radius: ['35%', 46],
          },
        ];
      })
      .flat(),
  };

  return (
    <>
      {/* <LabelsView
        single
        value={type}
        dataSource={typeOptions}
        onChange={setType as any}
        style={{ marginBottom: 4 }}
      /> */}
      <HomeCard title="售中概况">
        <Row style={{ height: '100%', marginTop: 20 }}>
          <Col span={9}>
            <MenuButton dataSource={typeOptions} onChange={setSelectKey} />
          </Col>
          <Col span={15}>
            <Echarts5
              loading={loading}
              style={{ height: '100%' }}
              option={option}
            ></Echarts5>
          </Col>
        </Row>
      </HomeCard>
    </>
  );
};
export default Index;
