import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { Progress, Row, Table } from 'antd';
import { random } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import { timeOptions } from '../../config';
import TagsView from '@/compoments/TagsView';
import bottomBg from '../../../../newAssets/4_bg.png';
import { useRequest, useSelector } from 'umi';
import { getLatitudeStat } from '../../services';

// 顺序绿、 红、黄、蓝。跟系列顺序一致
const stackColor = [
  'rgba(67, 209, 74, 0.4)',
  'rgba(74, 28, 25, 1)',
  'rgba(193, 173, 0, 0.3)',
  'rgba(17, 119, 245, 0.4)',
];

const Index = () => {
  const [latitude, setLatitude] = useState<string[]>([timeOptions?.[0].id]);
  const { branchName, regionName, gridName, channelName, tagName } =
    useSelector((store: any) => store.main);

  const { run, data, loading } = useRequest(getLatitudeStat, {
    manual: true,
  });

  useEffect(() => {
    if (!latitude?.length || !regionName) return;
    run({
      appId: 3,
      areaName: branchName || regionName,
      channelName,
      latitude: latitude?.[0], // 纬度 0：日纬度/1：周维度/2：月纬度
      tagName,
    });
  }, [regionName, branchName, channelName, latitude, tagName]);

  const baseSeries = useMemo(() => {
    return [
      // 绿色
      {
        symbolSize: 0,
        emphasis: { disabled: true },
        stack: '2',

        name: '生成订单量',
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

        data: data?.map((item: any) => item.value1),
      },
      // 红色
      {
        symbolSize: 0,
        name: '生成工单量',
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

        data: data?.map((item: any) => item.value3),
      },
      // 黄色
      {
        name: '完工定单量',
        type: 'line',

        symbolSize: 0,
        emphasis: { disabled: true },
        stack: '3',
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

        data: data?.map((item: any) => item.value2),
      },
      // 蓝色
      {
        name: '完工工单量',
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
          },
        },

        data: data?.map((item: any) => item.value4),
      },
    ];
  }, [data]);

  const option = useMemo(() => {
    return {
      legend: {
        textStyle: {
          color: '#39C9FF',
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
        type: 'category',
        offset: 35,
        data: data?.map((item: any) => item.latitude),

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

            data: item?.data?.map((item) => item * 0.1),
          },
        ])
        .flat(),
    };
  }, [baseSeries, data]);

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

          <div style={{ position: 'relative' }}>
            <Echarts5 loading={loading} option={option}></Echarts5>
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
