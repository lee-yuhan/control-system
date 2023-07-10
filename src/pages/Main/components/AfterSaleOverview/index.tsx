import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { Col, Progress, Row, Table } from 'antd';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';
import { typeOptions } from './config';
import { getSumarryStat } from '../../services';
import { useRequest, useSelector } from 'umi';
import { useEffect, useMemo, useState } from 'react';

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
      appId: 2,
      areaName: regionName,
      channelName,
      tagName,
    });
  }, [regionName, channelName, tagName]);

  const option = {
    grid: {
      right: 0,
      top: 40,
      height: 180,
    },
    legend: {
      top: 250,
      itemGap: 20,
      formatter: (name: string) => {
        const [name1, value] = name?.split('_');

        return `{a| ${name1}}` + `{b| ${value}}`;
        //  'Legend ' + name1 + value;
      },
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
          },
        },
      },
      data: [
        {
          name: `宽带_${data?.[currSelectItem!.key1] ?? 0}`,
          itemStyle: {
            color: '#2845E9',
          },
        },
        {
          name: `语音_${data?.[currSelectItem!.key2] ?? 0}`,
          itemStyle: {
            color: '#3DD7B1',
          },
        },
        {
          name: `IPTV_${data?.[currSelectItem!.key3] ?? 0}`,
          itemStyle: {
            color: '#0CA4D0',
          },
        },
      ],
    },

    xAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      // ...hiddenYAxis,
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#75B3FF',
        },
      },
      type: 'category',
      // show:false,
      data: ['宽带'],
    },
    series: [
      {
        name: `宽带_${data?.[currSelectItem!.key1] ?? 0}`,
        type: 'bar',
        data: [data?.[currSelectItem!.key1] ?? 0],
        barWidth: 18,
        barGap: 2,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: 'rgba(88, 224, 240, 1)',
            },
            {
              offset: 1,
              color: 'rgba(40, 69, 233, 1)',
            },
          ]),
        },
      },
      {
        name: `语音_${data?.[currSelectItem!.key2] ?? 0}`,
        type: 'bar',
        barWidth: 18,
        barGap: 2,
        data: [data?.[currSelectItem!.key2] ?? 0],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: 'rgba(214, 241, 131, 1)',
              },
              {
                offset: 1,
                color: 'rgba(61, 215, 177, 1)',
              },
            ]),
          },
        },
      },
      {
        name: `IPTV_${data?.[currSelectItem!.key3] ?? 0}`,
        type: 'bar',
        barWidth: 18,
        data: [data?.[currSelectItem!.key3] ?? 0],
        barGap: 2,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: 'rgba(137, 244, 190, 1)',
            },
            {
              offset: 1,
              color: 'rgba(12, 164, 208, 1)',
            },
          ]),
        },
      },
    ],
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
      <HomeCard title="售后概况">
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
