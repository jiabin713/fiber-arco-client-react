import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  name: string;
  // element: React.ReactNode;
  breadcrumb?: boolean;
  children?: Route[];
};
