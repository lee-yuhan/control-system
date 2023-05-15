import { useDebounceEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { useRequest, useSelector } from 'umi';
import { getStatData } from './service';

export const useRequestAid = (mode: string) => {
  const [params, setParams] = useState({
    latitude: '',
    custType: '',
  });
  const { branchName, regionName } = useSelector((store: any) => store.home);
  const { data, run } = useRequest(getStatData, {
    manual: true,
  });

  useDebounceEffect(
    () => {
      if (
        (mode !== '6' && (!params?.custType || !params?.latitude)) ||
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

  return { data, setParams };
};
