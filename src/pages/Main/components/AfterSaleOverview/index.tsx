import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { Col, Progress, Row, Table } from 'antd';
import * as echarts from 'echarts';
import MenuButton from '../MenuButton';
import { typeOptions } from './config';

const Index = () => {
  const option = {
    grid: {
      right: 0,
      top: 10,
      height: 180,
    },
    legend: {
      top: 210,
      itemGap: 15,
      left: 20,
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
          name: '宽带_200',
          itemStyle: {
            color: '#2845E9',
          },
        },
        {
          name: '语音_200',
          itemStyle: {
            color: '#3DD7B1',
          },
        },
        {
          name: 'IPTV_200',
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
        name: '宽带_200',
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
        name: '语音_200',
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
        name: 'IPTV_200',
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
