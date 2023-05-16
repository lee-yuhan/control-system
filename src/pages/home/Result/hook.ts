import { useDebounceEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useRequest, useSelector } from 'umi';
import { getLatitudeStatData } from './service';

export const useRequestAid = (mode: string) => {
  const [params, setParams] = useState({
    latitude: '',
    custType: '',
  });
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const { data, run, loading } = useRequest(getLatitudeStatData, {
    manual: true,
  });

  useDebounceEffect(
    () => {
      if (
        !params?.custType ||
        !params?.latitude ||
        !mode ||
        !branchName ||
        !regionName
      )
        return;
      run({
        branchName,
        custType: params?.custType,
        regionName,
        latitude: params?.latitude,
        mode,
      });
    },
    [branchName, params?.custType, regionName, params?.latitude, mode],
    { wait: 300 },
  );

  return { data, setParams, loading };
};
