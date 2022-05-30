import { useEffect, useMemo, useState } from 'react';

import { Breadcrumb as ArcoBreadcrumb } from '@arco-design/web-react';
import { IconApps } from '@arco-design/web-react/icon';
import { MenuRecord } from '@/pages/system/menu/type';
import { getFlattenRoutes } from '@/atoms/menu';
import { useLocation } from 'react-router-dom';
import { useMenuTree } from '@/hooks/useMenuTree';

const Breadcrumb = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<MenuRecord[]>([]);
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x != undefined);
  const routes = useMenuTree();

  const getBreadcrumbs = (routes: MenuRecord[]) => {
    const res: MenuRecord[] = [];
    pathnames.forEach((pathname) => {
      const route = routes.find((route) => route.path === pathname);
      if (route) {
        res.push(route);
      }
    });
    return res;
  };

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes), [routes]);

  useEffect(() => {
    const breadcrumbs = getBreadcrumbs(flattenRoutes);
    setBreadcrumbs(breadcrumbs);
  }, [pathname, routes]);

  return (
    <ArcoBreadcrumb className='px-6 pt-4'>
      <ArcoBreadcrumb.Item>
        <IconApps className='text-xl align-text-bottom' />
      </ArcoBreadcrumb.Item>
      {breadcrumbs.map((item) => (
        <ArcoBreadcrumb.Item key={item.id}>{item.name}</ArcoBreadcrumb.Item>
      ))}
    </ArcoBreadcrumb>
  );
};

export default Breadcrumb;
