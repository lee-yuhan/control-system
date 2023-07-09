import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useMemo, useState } from 'react';
import * as echarts from 'echarts';
import { timeOptions } from '../../config';
import TagsView from '@/compoments/TagsView';
import bottomBg from '../../../../newAssets/4_bg.png';

// 顺序绿、 红、黄、蓝。跟系列顺序一致
const stackColor = [
  'rgba(67, 209, 74, 0.4)',
  'rgba(17, 119, 245, 0.4)',
  'rgba(74, 28, 25, 1)',
];

const Index = () => {
  const [latitude, setLatitude] = useState<string[]>([timeOptions?.[0].id]);

  const baseSeries = useMemo(() => {
    return [
      // 绿色
      {
        symbolSize: 0,
        emphasis: { disabled: true },
        stack: '2',

        name: '申告数',
        type: 'line',

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
                color: 'rgba(0, 193, 114, 0.6)',
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

      // 蓝色
      {
        name: '外派数',
        type: 'line',

        symbolSize: 0,
        emphasis: { disabled: true },
        stack: '4',
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

      // 红色
      {
        symbolSize: 0,
        name: '外派线数',
        type: 'line',
        emphasis: { disabled: true },
        stack: '1',
        itemStyle: {
          color: 'rgba(255, 0, 0, 1)',
        },

        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(205, 55, 45, 0.4)',
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
    ];
  }, []);

  const option = useMemo(() => {
    return {
      legend: {
        textStyle: {
          color: '#fff',
        },
        left: 20,
        top: 0,
        icon: 'roundRect',
        itemWidth: 15,
        itemHeight: 2,
      },
      grid: {
        bottom: 60,
        top: 40,
        left: 40,
        right: 0,
      },
      xAxis: {
        offset: 35,
        data: Array(13)
          .fill(null)
          .map((item) => '漯河'),
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          color: '#2F7FBC',
        },
        axisLine: {
          lineStyle: {
            color: '#102152',
          },
        },
      },
      yAxis: {
        // interval: 2,
        splitLine: {
          // show: false,
          lineStyle: {
            color: '#102152',
            width: 2,
          },
        },
        axisLabel: {
          color: '#2F7FBC',
        },
      },
      series: baseSeries
        ?.map((item, index) => [
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
        ])
        .flat(),
    };
  }, [baseSeries]);

  return (
    <>
      <HomeCard title="售后工单趋势">
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

          <div style={{ position: 'relative' }}>
            <Echarts5 option={option}></Echarts5>
            <img
              style={{
                position: 'absolute',
                height: 35,
                bottom: 25,
                left: 35,
                width: 'calc(100% - 35px)',
              }}
              src={bottomBg}
              alt=""
            />
          </div>
        </>
      </HomeCard>
    </>
  );
};
export default Index;
