import { ExceptionToIndex } from './common';

export default [
  // { exact: true, path: "/", redirect: "/home" },
  // ...ExceptionToIndex,
  {
    title: '登录',
    path: '/Login',
    component: '@/pages/login',
  },

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
