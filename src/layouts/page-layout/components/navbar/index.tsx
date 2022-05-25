import { Input, Layout, Space, Typography } from '@arco-design/web-react';

import UserAvatar from './components/user-info';

const Navbar = () => {
  return (
    <Layout.Header className='z-100 h-16 inset-0 sticky w-full flex justify-between bg-arco-bg-2 shadow '>
      <div className='flex items-center pl-6'>
        <Space align='center'>
          <div className='flex items-center pl-6'></div>
          <Typography.Title heading={5} className='m-0'>
            Fiber Arco Pro
          </Typography.Title>
        </Space>
      </div>
      <div className='flex pr-6 items-center'>
        <Space size={'medium'}>
          <Input.Search className='rounded-2xl' placeholder={'搜索'} />
          <div className='language'>language</div>
          <div className='message-box'>message-box</div>
          <div className='changelight'>dark</div>
          <div className='settings'>settings</div>
          <div className='user-info'>
            <UserAvatar />
          </div>
        </Space>
      </div>
    </Layout.Header>
  );
};

export default Navbar;
