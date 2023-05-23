export const hiddenXAxis = {
  axisTick: { show: false },
  splitLine: { show: false },
  axisLine: { show: false },
};

export const hiddenYAxis = {
  axisTick: { show: false },
  splitLine: { show: false },
  axisLine: { show: false },
  axisLabel: { show: false },
};

export const themeEhcartColor = {
  light: {
    '--primary-color': '#194BFC',
    '--text-color1': 'rgba(0, 0, 0,0.5)',
    '--text-color2': 'rgba(0, 0, 0,1)',
    '--danger-color': '#CD372D',
    '--area-line-color': 'rgba(0, 0, 0,0.08)',
    '--area-color-start': 'rgba(0, 0, 0,0.1)',
    '--area-color-end': 'rgba(0, 0, 0,0.02)',
    '--area-danger-color-start': 'rgba(205, 55, 45,0.2)',
    '--area-danger-color-end': 'rgba(205, 55, 45,0.03)',
    '--area-primary-color-start': 'rgba(25, 75, 252,0.2)',
    '--area-primary-color-end': 'rgba(25, 75, 252,0.03)',
    '--background-color1': '#ebeff4',
  },
  dark: {
    '--primary-color': '#194BFC',
    '--background-color1': '#010b3a',
    '--text-color1': 'rgba(255, 255, 255,0.5)',
    '--text-color2': 'rgba(255, 255, 255,1)',
    '--danger-color': '#CD372D',
    '--area-line-color': 'rgba(255, 255, 255,0.08)',
    '--area-color-start': 'rgba(255, 255, 255,0.1)',
    '--area-color-end': 'rgba(255, 255, 255,0.02)',
    '--area-danger-color-start': 'rgba(205, 55, 45,0.2)',
    '--area-danger-color-end': 'rgba(205, 55, 45,0.03)',
    '--area-primary-color-start': 'rgba(25, 75, 252,0.2)',
    '--area-primary-color-end': 'rgba(25, 75, 252,0.03)',
  },
};

export const addClickEvent = (
  inst: any,
  callback?: (xAxisIndex: number) => void,
) => {
  inst?.getZr().on('click', (params: any) => {
    const pointInPixel = [params.offsetX, params.offsetY];
    if (inst.containPixel({ gridIndex: 'all' }, pointInPixel)) {
      const xIndex = inst.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0];
      callback?.(xIndex);
    }
  });
};
