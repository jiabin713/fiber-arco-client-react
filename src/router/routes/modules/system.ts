import { createElement, lazy } from 'react';

export default {
  path: 'system',
  name: '组织架构',
  children: [
    {
      path: 'staff',
      element: createElement(lazy(() => import('@/pages/system/staff'))),
      name: '员工管理',
    },
    {
      path: 'organization',
      element: createElement(lazy(() => import('@/pages/system/organization'))),
      name: '组织管理',
    },
    {
      path: 'position',
      element: createElement(lazy(() => import('@/pages/system/position'))),
      name: '职位管理',
    },
  ],
};
