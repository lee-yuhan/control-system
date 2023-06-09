import { request } from 'umi';

// 查询支局下拉列表
export function getBranchList(regionName: string) {
  return request(`${API_PREFIX}/selection/branch`, {
    params: {
      regionName,
    },
  });
}

// 查询客户类型下拉列表
export function getCustomerTypeList() {
  return request(`${API_PREFIX}/selection/customer_type`);
}

// 查询区局下拉列表
export function getDistrictBureauList() {
  return request(`${API_PREFIX}/selection/district_bureau`);
}

// 查询网格下拉列表
export function getGripList(branchName: string) {
  return request(`${API_PREFIX}/selection/grip`, {
    params: {
      branchName,
    },
  });
}

// 获取用户权限
export function getPermission() {
  return request(`${API_PREFIX}/auth/permission`);
}

// 退出
export function logout() {
  return request(`${API_PREFIX}/auth/logout`, {
    method: 'post',
  });
}

export function loginRecord(params: { page: number; timer: number }) {
  return request(`${API_PREFIX}/loginRecord/save`, {
    method: 'post',
    params,
    skipErrorHandler: true,
  });
}
