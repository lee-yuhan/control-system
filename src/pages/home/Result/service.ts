import { request } from 'umi';
import type { Moment } from 'moment';

// 通用统计接口
export function getLatitudeStatData(params: {
  branchName: string;
  custType: string;
  regionName: string;
  // 纬度 0：日纬度/1：周维度/2：月纬度
  latitude: string;
  // 查询模块 1：安装质量履约率/2：安装质量预约率/3：安装质量退单率/4、维修质量履约率/5、装维质量预约率/6、测评满意率/7：装维重复率趋势/8：质差上门率/9、质差10分满意率
  mode: string;
  // 网格名称
  gridName: string;
  date: Moment;
  queryNum: number;
}) {
  return request(`${API_PREFIX}/stat/latitude`, {
    params: {
      ...params,
      date: params?.date?.format('YYYY-MM-DD'),
    },
  });
}

export function getStatData(params: {
  branchName: string;
  regionName: string;
  // 查询模块 1：安装质量履约率/2：安装质量预约率/3：安装质量退单率/4、维修质量履约率/5、装维质量预约率/6、测评满意率/7：装维重复率趋势/8：质差上门率/9、质差10分满意率
  mode: string;
}) {
  return request(`${API_PREFIX}/stat`, {
    params,
  });
}

// 文件上传
export const uploadFile = (data: any) => {
  return request(`${API_PREFIX}/qualityTesting/importData`, {
    data,
    method: 'post',
  });
};

export const getQualityInspectionData = (params: {
  branchName: string;
  regionName: string;
  // 纬度 0：日纬度/1：周维度/2：月纬度
  latitude: string;
}) => {
  return request(`${API_PREFIX}/qualityTesting/latitudeStat`, {
    params,
  });
};

export const deleteQualityFileData = (id: string) => {
  return request(`${API_PREFIX}/qualityTestingFile/deleteData`, {
    params: { id },
    method: 'post',
  });
};

export const deleteQualityData = (id: string) => {
  return request(`${API_PREFIX}/qualityTesting/deleteData`, {
    params: { id },
    method: 'post',
  });
};

// 质检分页列表
export const getQualityData = (params: any) => {
  return request(`${API_PREFIX}/qualityTesting/page`, {
    params,
  });
};

// 质检文件分页列表
export const getQualityFileData = (params: any) => {
  return request(`${API_PREFIX}/qualityTestingFile/page`, {
    params,
  });
};

// 查询装维重复率排名
export const getRankData = (params: any) => {
  return request(`${API_PREFIX}/stat/rank`, {
    params,
  });
};

// 查询安装故障率排名
export const getFailureRankData = (params: any) => {
  return request(`${API_PREFIX}/stat/az_failure_rank`, {
    params,
  });
};
