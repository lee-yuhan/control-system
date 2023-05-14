import { hiddenXAxis, hiddenYAxis } from '@/utils/ehcart';

export const baseConfig = {
  grid: {
    top: 65,
    left: 0,
    right: 0,
    bottom: 30,
  },
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
    itemWidth: 20,
    itemHeight: 12,

    // data: [
    //   {
    //     name: '满意度',
    //     icon: `image://${legendIcon2}`,
    //   },
    //   {
    //     name: '环比',
    //     icon: `image://${legendIcon1}`,
    //   },
    // ],
    selectedMode: false,
  },
};
