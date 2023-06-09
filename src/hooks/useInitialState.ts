import { useModel } from 'umi';

export default (): {
  // 支局下拉列表
  // branchList: OptionList;
  // 客户类型下拉列表
  customerTypeList: OptionList;
  // // 区局下拉列表
  districtBureauList: OptionList;
  // 网格下拉列表
  // gripList: OptionList;
} => {
  const {
    initialState: {
      // branchList,
      customerTypeList,
      districtBureauList,
      // gripList,
    },
  } = useModel('@@initialState') as any;
  return {
    // branchList,
    customerTypeList,
    districtBureauList,
    // gripList,
  };
};
