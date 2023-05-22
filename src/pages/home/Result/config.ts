import { hiddenXAxis, hiddenYAxis } from '@/utils/ehcart';

export const baseConfig = {
  grid: {
    top: 65,
    left: 10,
    right: 10,
    bottom: 30,
  },
  animation: false,
  xAxis: {
    ...hiddenXAxis,
  },
  yAxis: hiddenYAxis,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: () => false,
  },
  legend: {
    left: 2,
    top: 20,
    itemWidth: 18,
    itemHeight: 8,
    textStyle: {
      rich: {
        a: {
          verticalAlign: 'middle',
        },
      },
      // // 图例与文字上下居中
      padding: [0, 0, -3, 0],
    },
    selectedMode: false,
  },
};
