import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import LabelsView from '@/compoments/LabelsView';
import { Col, Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';
import { typeOptions } from './config';

const Index = () => {
  const option = {
    legend: {
      bottom: 40,
      width: 250,
      itemGap: 30,
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
    },
    series: [
      {
        name: '情况统计',
        center: ['76%', '30%'],
        width: '65%',
        type: 'pie',
        emphasis: { disabled: true },
        radius: ['35%', '60%'],

        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 67,
            name: '装_2',
            itemStyle: {
              color: 'rgba(40, 69, 233, 0.6)',
            },
          },
          {
            value: 67,
            name: '拆_3',
            itemStyle: {
              color: 'rgba(61, 215, 177, 0.6)',
            },
          },
          {
            value: 67,
            name: '移_5',
            itemStyle: {
              color: 'rgba(12, 164, 208, 0.6)',
            },
          },
          {
            value: 67,
            name: '改_6',
            itemStyle: {
              color: 'rgba(245, 100, 100, 0.6)',
            },
          },
        ],
      },
      {
        name: '情况统计',
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['76%', '30%'],
        emphasis: { disabled: true },

        width: '65%',

        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 67,
            name: '装_2',
            itemStyle: {
              color: 'rgba(40, 69, 233, 1)',
            },
          },
          {
            value: 67,
            name: '拆_3',
            itemStyle: {
              color: 'rgba(61, 215, 177, 1)',
            },
          },
          {
            value: 67,
            name: '移_5',
            itemStyle: {
              color: 'rgba(12, 164, 208, 1)',
            },
          },
          {
            value: 67,
            name: '改_6',
            itemStyle: {
              color: 'rgba(245, 100, 100,1)',
            },
          },
        ],
      },

      {
        type: 'gauge',
        center: ['49.5%', '30%'],
        emphasis: { disabled: true },

        radius: '20%',
        startAngle: 0,
        endAngle: 360,

        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        axisLine: {
          lineStyle: {
            width: 2,
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  // {
                  //   offset: 0,
                  //   color: '#31AE97',
                  // },
                  {
                    offset: 0.25,
                    color: '#0CA4D0',
                  },
                  {
                    offset: 0.5,
                    color: '#F36364',
                  },
                  {
                    offset: 0.75,
                    color: '#2845E9',
                  },
                  {
                    offset: 1,
                    color: '#31AE97',
                  },
                ]),
              ],
            ],
          },
        },
        pointer: {
          show: false,
        },
        // detail: {
        //   valueAnimation: true,
        //   width: '100%',
        //   lineHeight: 40,
        //   offsetCenter: [0, 0],
        //   fontSize: 34,
        //   fontWeight: 'normal',
        //   color: 'rgba(102, 255, 255, 1)',
        //   formatter: '{b|总数}\n{value}{a|个}',
        //   rich: {
        //     a: {
        //       fontSize: 18,
        //     },
        //     b: {
        //       fontSize: 15,
        //       color: '#fff',
        //     },
        //   },
        // },
        // data: [{
        //   value: 89,
        // },],
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
      <HomeCard title="售中概况">
        <Row style={{ height: '100%' }}>
          <Col span={9}>
            <MenuButton dataSource={typeOptions} onChange={() => {}} />
          </Col>
          <Col span={15}>
            <Echarts5 style={{ height: '100%' }} option={option}></Echarts5>
          </Col>
        </Row>
      </HomeCard>
    </>
  );
};
export default Index;
