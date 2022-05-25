import Exception404 from '@/pages/exception/404';
import PageLayout from '@/layouts/page-layout';
import { Route } from './type.d';
import appRoutes from './routes';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Login = lazy(() => import('@/pages/auth/Login'));

export const routes: Route[] = [
  {
    path: 'login',
    element: <Login />,
    name: '登录',
  },
  {
    path: '/',
    name: '首页',
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
