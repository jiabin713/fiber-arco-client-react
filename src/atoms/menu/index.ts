import * as MenuService from '@/pages/system/menu/service';

import { selector, useRecoilValueLoadable } from 'recoil';

import { MenuRecord } from '@/pages/system/menu/type';

// 根据用户id 获取相应的菜单和权限
export const menuTreeQuery = selector({
  key: 'menuTreeQuery',
  get: async () => {
    const data = await MenuService.queryTree({});
    return data;
  },
});

export const useMenuTree = () => {
  const loadable = useRecoilValueLoadable(menuTreeQuery);
  switch (loadable.state) {
    case 'hasValue':
      return loadable.contents;
    case 'loading':
      return [];
    case 'hasError':
      throw [];
  }
};

export const getFlattenRoutes = (routes: MenuRecord[]) => {
  const res: MenuRecord[] = [];
  function travel(_routes: MenuRecord[]) {
    _routes.forEach((route) => {
      if (route.path && !route.children) {
        // route.component = React.lazy(() => import(`./pages/${route.path}/index.tsx`));
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        res.push(route);
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
};

// export const flattenRoutes = selector({
//   key: 'flattenRoutes',
//   get: ({ get }) => {
//     const routes = get(menuTreeQuery);
//     const getFlattenRoutes = (routes: MenuRecord[]) => {
//       const res: MenuRecord[] = [];
//       function travel(_routes: MenuRecord[]) {
//         _routes.forEach((route) => {
//           if (route.path && !route.children) {
//             // route.component = React.lazy(() => import(`./pages/${route.path}/index.tsx`));
//             res.push(route);
//           } else if (Array.isArray(route.children) && route.children.length) {
//             res.push(route);
//             travel(route.children);
//           }
//         });
//       }
//       travel(routes);
//       return res;
//     };
//     return getFlattenRoutes(routes);
//   },
// });
