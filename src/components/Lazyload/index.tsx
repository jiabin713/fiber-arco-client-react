import FallbackCompent from '../FallbackCompent';
import React from 'react';

const Lazyload = (path: string) => {
  const Component = React.lazy(() => import(`../views/${path}`));
  return (
    <React.Suspense fallback={<FallbackCompent />}>
      <Component />
    </React.Suspense>
  );
};

export default Lazyload;
