import { createElement, lazy } from 'react';

export default {
  path: 'dashboard',
  name: '仪表盘',
  children: [
    {
      path: 'workplace',
      element: createElement(lazy(() => import('@/pages/dashboard/workplace'))),
      name: '工作台',
    },
  ],
};
