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
    grid: {
      top: 0,
      height: 200,
      with: 10,
    },
    legend: {
      bottom: 0,

      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '情况统计',
        type: 'pie',
        radius: ['50%', '60%'],
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 67,
            name: '装',
            itemStyle: {
              color: 'rgba(40, 69, 233, 0.6)',
            },
          },
          {
            value: 67,
            name: '拆',
            itemStyle: {
              color: 'rgba(61, 215, 177, 0.6)',
            },
          },
          {
            value: 67,
            name: '移',
            itemStyle: {
              color: 'rgba(12, 164, 208, 0.6)',
            },
          },
          {
            value: 67,
            name: '改',
            itemStyle: {
              color: 'rgba(245, 100, 100, 0.6)',
            },
          },
        ],
      },
      {
        name: '情况统计',
        type: 'pie',
        radius: ['59%', '75%'],
        label: {
          show: false,
          position: 'center',
        },
        data: [
          {
            value: 67,
            name: '装',
            itemStyle: {
              color: 'rgba(40, 69, 233, 1)',
            },
          },
          {
            value: 67,
            name: '拆',
            itemStyle: {
              color: 'rgba(61, 215, 177, 1)',
            },
          },
          {
            value: 67,
            name: '移',
            itemStyle: {
              color: 'rgba(12, 164, 208, 1)',
            },
          },
          {
            value: 67,
            name: '改',
            itemStyle: {
              color: 'rgba(245, 100, 100,1)',
            },
          },
        ],
      },

      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '45%',
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
            color: [[1, 'rgba(6, 191, 255, 1)']],
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
