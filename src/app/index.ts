import moment from 'moment';
import 'moment/locale/zh-cn';
import type { RequestConfig } from 'umi';
import { codeMessage } from './config';
import { IEVersion } from '@/utils/url';
import { setTheme } from '@/utils/theme';
import {
  getBranchList,
  getCustomerTypeList,
  getDistrictBureauList,
} from '@/service/commonServices';
import { map } from 'lodash';

const noRequestPaths = ['/Login'];

const request: RequestConfig = {
  // ! 一般应该直接复制 yApi 中的接口地址，所以这里不配置全局 prefix
  // ! 当前缀需要与项目动态一致时，才需要特别配置 prefix 为 API_PREFIX
  params: {
    _t: IEVersion() === -1 ? undefined : moment().format('X'), // ie浏览器 加时间戳 放置get请求缓存bug
  },
  headers: {
    'Cache-Control': 'no-store',
    Pragma: 'no-store',
  },
  validateCache: () => false, // 关闭get请求缓存，ie11登录死循环问题

  responseInterceptors: [
    (response: any) => {
      const { ok, status } = response;
      if (ok && status === 200) {
        return response;
      }
      const error = Error(`${status} ${codeMessage[status]}`);
      error.name = 'HttpError';
      throw error;
    },
  ],

  errorHandler: (error: any) => {
    // if (error?.data?.retCode === 'T302') {
    //   messageDebounce(error?.data?.retMsg || '登录超时');

    //   if (error?.data?.data?.redirectUrl) {
    //     window.location.href = `${error?.data?.data?.redirectUrl}`;
    //   }
    //   throw error;
    // }
    // if (error?.data?.retCode === 'T403') {
    //   if (error?.data?.data?.redirectUrl) {
    //     window.location.href = `${error?.data?.data?.redirectUrl}`;
    //   }
    //   throw error;
    // }
    // if (error.name === 'HttpError') {
    //   messageDebounce(error.message);
    //   throw error;
    // }

    // if (error?.data?.retMsg) {
    //   messageDebounce(error?.data?.retMsg);
    // }
    throw error;
  },
};

moment.locale('zh-cn');

export async function getInitialState() {
  setTheme(); // 设置主题

  const documentAny: any = document;
  // Internet Explorer 6-11
  const isIE = /* @cc_on!@ */ false || !!documentAny.documentMode;
  const requestBasePath = noRequestPaths.some((p: string) =>
    window.location.pathname.includes(p),
  );

  let branchList: OptionList = [];
  let customerTypeList: OptionList = [];
  let districtBureauList: OptionList = [];

  if (!isIE && !requestBasePath) {
    try {
      const [branchListResp, customerTypeListResp, districtBureauListResp] =
        await Promise.all([
          getBranchList(),
          getCustomerTypeList(),
          getDistrictBureauList(),
        ]);

      console.log('districtBureauList', branchListResp);

      branchList = map(branchListResp.data, (value) => ({
        label: value,
        value,
      }));
      customerTypeList = map(customerTypeListResp.data, (value) => ({
        label: value,
        value,
      }));
      districtBureauList = map(districtBureauListResp.data, (value) => ({
        label: value,
        value,
      }));
    } catch (error: any) {
      console.log('error', error);

      // errorHandle(error);
    }
  }

  return { branchList, customerTypeList, districtBureauList };
}

export default {
  request,
  getInitialState,
};
