import { useDebounceEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useRequest, useSelector } from 'umi';
import { getLatitudeStatData } from './service';

export const useRequestAid = (mode: string) => {
  const [params, setParams] = useState({
    latitude: '',
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
        latitude: params?.latitude,
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
    { wait: 300 },
  );

  return { data, setParams, loading };
};
