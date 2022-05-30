import { createElement, lazy } from 'react';

export default {
  path: 'exception',
  name: '异常页',
  children: [
    {
      path: '403',
      element: createElement(lazy(() => import('@/pages/exception/403'))),
      name: '403',
    },
    {
      path: '404',
      element: createElement(lazy(() => import('@/pages/exception/404'))),
      name: '404',
    },
    {
      path: '500',
      element: createElement(lazy(() => import('@/pages/exception/500'))),
      name: '500',
    },
  ],
};
