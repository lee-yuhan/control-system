import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import * as echarts from 'echarts';
import { timeOptions } from '../../config';
import TagsView from '@/compoments/TagsView';

// 顺序 红、绿、黄、蓝。跟系列顺序一致
const stackColor = [
  'rgba(74, 28, 25, 1)',
  'rgba(0, 193, 114, 1)',
  'rgba(17, 119, 245, 1)',
  'rgba(74, 28, 25, 1)',
];

const Index = () => {
  const [latitude, setLatitude] = useState<string[]>([timeOptions?.[0].id]);

  const baseSeries = useMemo(() => {
    return [
      // 红色
      {
        symbolSize: 0,
        name: '工单量',
        type: 'line',

        itemStyle: {
          color: 'rgba(255, 0, 0, 1)',
        },

        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(205, 55, 45, 1)',
              },
              /*柱图渐变色*/
              {
                offset: 1,
                color: 'rgba(255, 0, 0, 0)',
              },
            ]),
            // shadowOffsetY: -10,
            // shadowOffsetX: 0,
            // shadowBlur:10,
            // shadowColor: "rgba(205, 55, 45, 1)",
          },
        },

        data: Array(13)
          .fill(null)
          .map((item) => random(100, 500)),
      },
      // 绿色
      {
        symbolSize: 0,

        name: '生成订单量',
        type: 'line',
        smooth: true,

        itemStyle: {
          color: 'rgba(0, 193, 114, 1)',
        },
        lineStyle: {
          shadowOffsetY: -5,
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 193, 114, 1)',
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(67, 209, 74, 1)',
              },
              /*柱图渐变色*/
              {
                offset: 1,
                color: 'rgba(67, 209, 74, 0)',
              },
              /*柱图渐变色*/
            ]),
          },
        },

        data: Array(13)
          .fill(null)
          .map((item) => random(100, 500)),
      },
      // 黄色
      {
        name: '完工定单量',
        type: 'line',
        smooth: true,
        symbolSize: 0,

        itemStyle: {
          color: 'rgba(228, 203, 84, 1)',
        },
        lineStyle: {
          shadowOffsetY: -5,
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowColor: 'rgba(88, 64, 7, 0.73)',
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(88, 64, 7, 0.73)',
              },
              /*柱图渐变色*/
              {
                offset: 1,
                color: 'rgba(88, 64, 7, 0)',
              },
              /*柱图渐变色*/
            ]),
          },
        },

        data: Array(13)
          .fill(null)
          .map((item) => random(100, 500)),
      },
      // 蓝色
      {
        name: '工单量2',
        type: 'line',
        smooth: true,
        symbolSize: 0,

        itemStyle: {
          color: 'rgba(17, 119, 245, 1)',
        },
        lineStyle: {
          shadowOffsetY: -5,
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowColor: 'rgba(17, 119, 245, 1)',
        },
        areaStyle: {
          opacity: 1,
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 119, 245, 0.4)',
              },
              /*柱图渐变色*/
              {
                offset: 1,
                color: 'rgba(17, 119, 245, 0)',
              },
              /*柱图渐变色*/
            ]),
            // shadowOffsetY: -10,
            // shadowOffsetX: 0,
            // shadowBlur:10,
            // shadowBlur:10,
            // shadowColor: "rgba(205, 55, 45, 1)",
          },
        },

        data: Array(13)
          .fill(null)
          .map((item) => random(100, 500)),
      },
    ];
  }, []);

  const option = useMemo(() => {
    return {
      grid: {
        bottom: 20,
        top: 40,
        left: 0,
        right: 0,
      },
      xAxis: {
        data: Array(13)
          .fill(null)
          .map((item) => '漯河'),
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: '#fff',
        },
        axisLine: {
          lineStyle: {
            color: '#75B3FF',
          },
        },
      },
      yAxis: {
        // interval: 2,
        axisTick: { show: false },
        splitLine: {
          // show: false,
          lineStyle: {
            color: '#102152',
            width: 2,
          },
        },
        axisLine: { show: false },
        axisLabel: { show: false },
      },
      series: baseSeries?.map((item, index) => [
        item,
        {
          ...item,
          symbolSize: 0,
          /*折线点的大小*/
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            normal: {
              color: stackColor[index],
            },
          },

          data: item.data.map((item) => item * 0.1),
        },
      ]),
    };
  }, [baseSeries]);

  return (
    <>
      <HomeCard title="售中工单趋势">
        <>
          <Row justify="end">
            <TagsView
              single
              value={latitude}
              dataSource={timeOptions}
              onChange={setLatitude as any}
              style={{ marginBottom: 4 }}
            />
          </Row>

          <Echarts5 option={option}></Echarts5>
        </>
      </HomeCard>
    </>
  );
};
export default Index;
