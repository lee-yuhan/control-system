export const common = [
  { exact: true, path: '/', redirect: '/Login' },
  // {
  //   title: '权限管理',
  //   path: '/Admin',
  //   component: '@/pages/common/Admin',
  // },
  {
    path: '/Exception',
    routes: [
      {
        title: '403',
        path: '/Exception/403',
        component: '@/pages/common/Exception/403',
      },
      {
        title: '404',
        path: '/Exception/404',
        component: '@/pages/common/Exception/404',
      },
      {
        title: '500',
        path: '/Exception/500',
        component: '@/pages/common/Exception/500',
      },
      {
        title: 'Incompatible',
        path: '/Exception/Incompatible',
        component: '@/pages/common/Exception/Incompatible',
      },
      {
        title: 'InitException',
        path: '/Exception/InitException',
        component: '@/pages/common/Exception/InitException',
      },
    ],
  },
];

export const ExceptionToIndex = [
  {
    path: '/Exception',
    routes: [
      {
        title: '403',
        path: '/Exception/403',
        component: '@/pages/common/Exception/403ToIndex',
      },
      {
        title: '404',
        path: '/Exception/404',
        component: '@/pages/common/Exception/404ToIndex',
      },
      {
        title: '500',
        path: '/Exception/500',
        component: '@/pages/common/Exception/500ToIndex',
      },
      {
        title: 'Incompatible',
        path: '/Exception/Incompatible',
        component: '@/pages/common/Exception/Incompatible',
      },
      {
        title: 'InitException',
        path: '/Exception/InitException',
        component: '@/pages/common/Exception/InitException',
      },
    ],
  },
];
