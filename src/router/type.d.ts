import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  name: string;
  breadcrumb?: boolean;
  children?: Route[];
};
