import { request } from 'umi';

// 查询支局下拉列表
export function getBranchList() {
  return request(`${API_PREFIX}/selection/branch`);
}

// 查询客户类型下拉列表
export function getCustomerTypeList() {
  return request(`${API_PREFIX}/selection/customer_type`);
}

// 查询区局下拉列表
export function getDistrictBureauList() {
  return request(`${API_PREFIX}/selection/district_bureau`);
}
