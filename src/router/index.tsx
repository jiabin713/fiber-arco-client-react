import { Navigate, useRoutes } from 'react-router-dom';

import Exception404 from '@/pages/exception/404';
import Login from '@/pages/auth/login';
import PageLayout from '@/layouts/page-layout';
import { Route } from './type.d';
import appRoutes from './routes';

export const routes: Route[] = [
  {
    path: '/',
    element: <Navigate to='login' replace={true} />,
    index: true,
    name: '首页',
  },
  {
    path: 'login',
    element: <Login />,
    name: '登录',
  },
  {
    path: '/',
    name: '后台首页',
    element: <PageLayout />,
    children: [
      ...appRoutes,
      {
        path: '*',
        name: '404',
        element: <Exception404 />,
      },
    ],
  },
];

const MainRoutes = () => {
  return useRoutes(routes);
};

export default MainRoutes;
