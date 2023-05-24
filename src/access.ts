type Access = Record<string, IPermissionList | undefined>;

export default (initialState: any): Access => {
  return initialState?.permissionList || {};
};
