import { createElement, lazy } from 'react';

import { Navigate } from 'react-router-dom';

export default {
  path: 'dashboard',
  name: '仪表盘',
  children: [
    { index: true, element: createElement(Navigate, { to: 'workplace', replace: true }) },
    {
      path: 'workplace',
      element: createElement(lazy(() => import('@/pages/dashboard/workplace'))),
      name: '工作台',
    },
  ],
};
