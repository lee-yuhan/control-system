import { Echarts5 } from '@/compoments/Echarts5';
import HomeCard from '@/compoments/HomeCard';
import { orderBy, random } from 'lodash';
import { useMemo } from 'react';
import './index.less';
import * as echarts from 'echarts';
import bg from '../../../../newAssets/6_bg.png';
import useInitialState from '@/hooks/useInitialState';

const Index = () => {
  const { districtBureauList } = useInitialState();

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
          .map((item, index) => districtBureauList?.[index]?.label),
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
      series: [
        {
          type: 'bar',
          barWidth: 8,
          label: {
            normal: {
              show: true,
              position: 'top',
              fontSize: 12,
              color: '#fff',
            },
          },
          itemStyle: {
            // barBorderRadius: [2, 2, 0, 0], //柱体圆角
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#52CE74',
              },
              {
                offset: 1,
                color: '#379450',
              },
            ]),
          },

          data: orderBy(
            Array(13)
              .fill(null)
              .map((item) => random(0, 100)),
            (item) => item,
            ['desc'],
          ),
        },
      ],
    };
  }, [districtBureauList]);

  return (
    <>
      {/* <LabelsView
        single
        value={type}
        dataSource={typeOptions}
        onChange={setType as any}
        style={{ marginBottom: 4 }}
      /> */}
      <HomeCard
        title={
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open(`${window.location.origin}/home`);
            }}
          >
            区局总评分排名
          </span>
        }
        style={{
          backgroundImage: `url(${bg})`,
        }}
        titleStyle={{
          top: 16,
        }}
        hiddenSelect
      >
        <Echarts5
          option={option}
          minHeight={200}
          style={{ height: 260 }}
        ></Echarts5>
      </HomeCard>
    </>
  );
};
export default Index;
