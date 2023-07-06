import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import LabelsView from '@/compoments/LabelsView';
import { Col, Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';
import { typeOptions } from './config';
import { hiddenXAxis, hiddenYAxis } from '@/utils/ehcart';

const Index = () => {
  const option = {
    color: ['#2845E9', '#3DD7B1', '#0CA4D0'],
    legend: {
      bottom: 0,
      textStyle: {
        color: '#fff',
      },
      data: [
        {
          name: '宽带',
          itemStyle: {
            color: '#2845E9',
          },
        },
        {
          name: '语音',
          itemStyle: {
            color: '#3DD7B1',
          },
        },
        {
          name: 'IPTV',
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
        name: '宽带',
        type: 'bar',
        data: [18203],
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
        name: '语音',
        type: 'bar',
        barWidth: 18,
        barGap: 2,
        data: [18203],
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
        name: 'IPTV',
        type: 'bar',
        barWidth: 18,
        data: [18203],
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
        <Row>
          <Col span={8}>
            <MenuButton dataSource={typeOptions} onChange={() => {}} />
          </Col>
          <Col span={16}>
            <Echarts5 option={option}></Echarts5>
          </Col>
        </Row>
      </HomeCard>
    </>
  );
};
export default Index;
