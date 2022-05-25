import Breadcrumb from '../breadcrumb';
import FallbackCompent from '@/components/FallbackCompent';
import { Layout } from '@arco-design/web-react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Content = () => {
  return (
    <Layout.Content className='flex flex-col bg-arco-fill-2 transition duration-200'>
      <Breadcrumb />
      <div className='px-6 py-4 h-full'>
        <Suspense fallback={<FallbackCompent />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout.Content>
  );
};

export default Content;
