import { loginRecord } from '@/service/commonServices';
import { useTimeout } from 'ahooks';
import { useRequest } from 'umi';

export const useLoginRecordAid = (page: number) => {
  const pollingInterval = 5000;
  const { cancel, run } = useRequest(loginRecord, {
    manual: true,
    onSuccess: (res) => {
      if (res?.status) {
        cancel();
      }
    },
    onError: () => {
      cancel();
    },
    pollingInterval,
    pollingWhenHidden: true,
  });

  useTimeout(() => {
    run({ page, timer: pollingInterval / 1000 });
  }, pollingInterval);
};
