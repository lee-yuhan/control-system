import { defineConfig } from 'umi';
import routes from './routes';
import { extraProxyConfig } from './proxyMap';

const API_PREFIX = '/control';
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

// https://umijs.org/config/
export default defineConfig({
  title: '装维管控系统',
  publicPath: `./`,
  manifest: {},
  define: {
    PROJECT_KEY: 'control',
    API_PREFIX,
  },
  metas: [
    {
      httpEquiv: 'Cache-Control',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Pragma',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Expires',
      content: '0',
    },
  ],
  hash: true,
  dva: { hmr: false, immer: true },
  antd: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  routes,
  proxy: {
    ...extraProxyConfig,
  },
  ignoreMomentLocale: true,
  devtool: isDev ? 'eval' : false,
  nodeModulesTransform: {
    type: isDev ? 'none' : 'all',
    exclude: [],
  },

  chunks: isDev ? ['umi'] : ['vendors', 'umi'],

  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  mfsu: {},
});
