export const extraProxyConfig = {
  '/control': {
    target: 'http://42.193.98.43:8077', // 联调需调整为对应后端
    changeOrigin: true,
  },
};
