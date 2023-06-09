import { ExceptionToIndex } from './common';

export default [
  { exact: true, path: '/', redirect: '/main' },
  // ...ExceptionToIndex,
  {
    title: '登录',
    path: '/Login',
    component: '@/pages/login',
  },
  {
    title: '装维管控平台',
    path: '/main',
    component: '@/pages/Main',
  },
  {
    title: '装维管控平台',
    path: '/overview',
    component: '@/pages/overview',
  },
  // {
  //   title: 'content',
  //   path: '/new',
  //   component: '@/newLayouts',
  //   routes: [
  //     {
  //       path: '/new/main',
  //       component: '@/pages/home/Main',
  //     },
  //   ],
  // },
  {
    title: '装维管控平台',
    component: '@/layouts',
    routes: [
      {
        path: '/home',
        component: '@/pages/home',
      },
    ],
  },
];
