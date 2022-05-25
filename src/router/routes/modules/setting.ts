import { createElement, lazy } from 'react';

export default {
  path: 'setting',
  name: '开发设置',
  children: [
    {
      path: 'dictionary',
      element: createElement(lazy(() => import('@/pages/system/dictionary'))),
      name: '字典管理',
    },
    {
      path: 'menu',
      element: createElement(lazy(() => import('@/pages/system/menu'))),
      name: '菜单管理',
    },
    {
      path: 'role',
      element: createElement(lazy(() => import('@/pages/system/role'))),
      name: '角色管理',
    },
  ],
};
