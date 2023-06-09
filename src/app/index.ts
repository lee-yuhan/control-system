import moment from 'moment';
import 'moment/locale/zh-cn';
import { ErrorShowType, RequestConfig } from 'umi';
import { codeMessage, messageDebounce } from './config';
import { IEVersion } from '@/utils/url';
import { setTheme } from '@/utils/theme';
import { getDistrictBureauList, getPermission } from '@/service/commonServices';
import { map, merge } from 'lodash';
import cookie from 'react-cookies';

const noRequestPaths = ['/Login'];

const request: RequestConfig = {
  // ! 一般应该直接复制 yApi 中的接口地址，所以这里不配置全局 prefix
  // ! 当前缀需要与项目动态一致时，才需要特别配置 prefix 为 API_PREFIX
  params: {
    _t: IEVersion() === -1 ? undefined : moment().format('X'), // ie浏览器 加时间戳 放置get请求缓存bug
  },
  headers: merge(
    {
      'Cache-Control': 'no-store',
      Pragma: 'no-store',
    },
    {
      ...(cookie.load('AuthToken')
        ? { Authorization: `Basic ${cookie.load('AuthToken') ?? ''}` }
        : {}),
    },
  ),
  validateCache: () => false, // 关闭get请求缓存，ie11登录死循环问题

  responseInterceptors: [
    (response: any) => {
      const { ok, status } = response;
      if (ok && status === 200) {
        return response;
      }
      const error = Error(`${status} ${codeMessage[status]}`);
      error.name = `${status}`;

      throw error;
    },
  ],

  errorConfig: {
    adaptor: (res: any) => {
      return {
        success: res?.code === 200,
        data: res?.data,
        errorCode: res?.code,
        errorMessage: res?.message,
        showType: ErrorShowType.SILENT,
      };
    },
  },

  errorHandler: (error: any) => {
    if (error.name === '401') {
      cookie.remove('AuthToken');
      window.location.href = `/Login`;
    } else if (error?.data?.code !== '200') {
      messageDebounce(error?.data?.message ?? '请求出错');
    }

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

  let permissionList: IPermissionList = [];
  let gripList: OptionList = [];

  if (!isIE && !requestBasePath) {
    try {
      const [
        // branchListResp,
        // customerTypeListResp,
        districtBureauListResp,
        permissionResp,
        // gripListResp,
      ] = await Promise.all([
        // getBranchList(),
        // getCustomerTypeList(),
        getDistrictBureauList(),
        getPermission(),
        // getGripList(),
      ]);

      districtBureauList = map(districtBureauListResp.data, (value) => ({
        label: value,
        value,
      }));

      permissionList = permissionResp.data;
    } catch (error: any) {
      console.log('error', error);
      // errorHandle(error);
    }
  }

  return {
    branchList,
    customerTypeList,
    districtBureauList,
    permissionList,
    gripList,
  };
}

export default {
  request,
  getInitialState,
};
