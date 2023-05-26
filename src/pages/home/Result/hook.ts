import { useDebounceEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useRequest, useSelector } from 'umi';
import { getLatitudeStatData } from './service';
import { cloneDeep, isNaN, isNil } from 'lodash';

export const useRequestAid = (mode: string) => {
  const [params, setParams] = useState({
    latitude: [],
    custType: '',
    gridName: '',
  });
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const { data, run, loading } = useRequest(getLatitudeStatData, {
    manual: true,
  });

  useDebounceEffect(
    () => {
      if (!mode || !regionName) return;
      run({
        branchName,
        custType: params?.custType,
        regionName,
        latitude: params?.latitude?.toString(),
        gridName: params?.gridName,
        mode,
      });
    },
    [
      branchName,
      params?.custType,
      params?.gridName,
      regionName,
      params?.latitude,
      mode,
    ],
    { wait: 400 },
  );

  return { data, params, setParams, loading };
};

export const useEchartMouseAid = (
  mRef: any,
  orignOption: any,
  orignIcon: any,
  hightIcon: any,
) => {
  useDebounceEffect(
    () => {
      const inst = mRef?.current;

      inst?.getZr().on('mousemove', (params: any) => {
        const option = inst.getOption();
        const currOption = cloneDeep(option);
        const pointInPixel = [params.offsetX, params.offsetY];

        if (inst.containPixel({ gridIndex: 'all' }, pointInPixel)) {
          const xIndex = inst.convertFromPixel(
            { gridIndex: 'all' },
            pointInPixel,
          )[0];

          if (isNaN(xIndex)) {
            return;
          }

          const symbol = currOption.series[1]?.data[xIndex]?.symbol;

          if (symbol === `image://${hightIcon}`) {
            return;
          }

          currOption.series[1].data?.forEach((item: any, index: number) => {
            if (index === xIndex) {
              item.symbol = `image://${hightIcon}`;
              item.symbolSize = 12;
            } else {
              item.symbol = `image://${orignIcon}`;
              item.symbolSize = 8;
            }
          });

          inst.setOption(currOption, true);
          inst.dispatchAction({
            type: 'highlight',
            seriesIndex: 1, // 指定series中的map的索引
            dataIndex: xIndex, // 高亮的区域的索引，可从回调参数params中获取
          });
        } else {
          inst.setOption(orignOption, true);
        }
      });
    },
    [mRef, orignOption],
    { wait: 300 },
  );

  // useDebounceEffect(
  //   () => {
  //     const inst = mRef?.current;
  //     const option = inst.getOption();
  //     const currOption = cloneDeep(option);
  //     inst?.getZr().on('mouseout', 'series.line', (params: any) => {
  //       console.log("mouseout");

  //       const pointInPixel = [params.offsetX, params.offsetY];
  //       if (inst.containPixel({ gridIndex: 'all' }, pointInPixel)) {
  //         currOption.series[1].data?.forEach((item: any, index: number) => {
  //           item.symbol = `image://${orignIcon}`;
  //         });

  //         inst.setOption(currOption, true);
  //       }
  //     });
  //   },
  //   [mRef],
  //   { wait: 300 },
  // );
};
