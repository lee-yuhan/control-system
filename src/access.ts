type Access = Map<string, IPermissionList[number] | undefined>;

export default (initialState: { permissionList: IPermissionList }): Access => {
  return new Map(
    initialState?.permissionList?.map((item) => [item.code, item]),
  );
};
