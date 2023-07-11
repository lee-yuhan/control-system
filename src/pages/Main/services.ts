import { request } from 'umi';

// 查询历史区域下拉列表
export function getHistoryAreaList() {
  return request(`${API_PREFIX}/selection/his_area`, {
    params: {
      areaTpId: 1,
    },
  });
}

// 查询历史支局下拉列表
export function getBranchList(regionName: string) {
  return request(`${API_PREFIX}/selection/his_area`, {
    params: {
      areaTpId: 2,
      regionName,
    },
  });
}

// 查询历史渠道名称下拉列表
export function getHistoryChannelList(areaName: string) {
  return request(`${API_PREFIX}/selection/his_channel`, {
    params: {
      areaName,
    },
  });
}

// 查询历史标签名称下拉列表
export function getHistoryTagList(channelName: string) {
  return request(`${API_PREFIX}/selection/his_tag`, {
    params: {
      channelName,
    },
  });
}

// 售中/售后工单趋势
export function getLatitudeStat(params: {
  appId: number; //  统计模块 3：售中工单趋势/4：售后工单趋势
  areaName?: string;
  channelName?: string;
  latitude: string; // 纬度 0：日纬度/1：周维度/2：月纬度
  tagName?: string;
}) {
  return request(`${API_PREFIX}/first_stat/latitude_stat`, {
    params,
  });
}

// 售中/售后概况
export function getSumarryStat(params: {
  appId: number; // 统计模块 1：售中概况/2：售后概况
  areaName?: string;
  channelName?: string;
  tagName?: string;
}) {
  return request(`${API_PREFIX}/first_stat/stat_summary_current`, {
    params,
  });
}
