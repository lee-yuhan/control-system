import { request } from 'umi';

// 通用统计接口
export function getStatData(params: {
  branchName: string;
  custType: string;
  regionName: string;
  // 纬度 0：日纬度/1：周维度/2：月纬度
  latitude: string;
  // 查询模块 1：安装质量履约率/2：安装质量预约率/3：安装质量退单率/4、维修质量履约率/5、装维质量预约率/6、测评满意率/7：装维重复率趋势/8：质差上门率/9、质差10分满意率
  mode: string;
}) {
  return request(`${API_PREFIX}/stat/latitude`, {
    params,
  });
}
