import { Navigate, Route, Routes } from 'react-router-dom';

import Exception404 from './pages/exception/404';
import Login from './pages/auth/login';
import MainRoutes from './router';
import PageLayout from './layouts/page-layout';
import Workplace from './pages/dashboard/workplace';

function App() {
  return (
    <div className='App'>
      {/* <Routes>
        <Route path='/' element={<Navigate to='login' replace={true} />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<PageLayout />}>
          <Route path='dashboard'>
            <Route index element={<Navigate to='workplace' replace />} />
            <Route path='workplace' element={<Workplace />} />
            <Route path='monitor' />
          </Route>
          <Route path='*' element={<Exception404 />} />
        </Route>
      </Routes> */}
      <MainRoutes />
    </div>
  );
}

export default App;
