import { ExceptionToIndex } from './common';

export default [
  { exact: true, path: '/', redirect: '/home' },
  // ...ExceptionToIndex,
  {
    title: '登录',
    path: '/Login',
    component: '@/pages/login',
  },
  {
    title: 'content',
    path: '/main',
    component: '@/pages/Main',
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
    title: 'content',
    component: '@/layouts',
    routes: [
      {
        path: '/home',
        component: '@/pages/home',
      },
    ],
  },
];
