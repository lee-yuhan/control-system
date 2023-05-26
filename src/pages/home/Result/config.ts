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
      padding: [0, 0, 0, 0],
    },
    selectedMode: false,
  },
};

export const satisfactionNameMap = {
  '1': '履约率',
  '2': '改约率',
  '3': '退单率',
  '4': '履约率',
  '5': '改约率',
  '6': '测评率',
  '7': '重复率',
  '8': '上门率',
  '9': '满意率',
  '10': '真实率',
};
