import { Avatar, Divider, Dropdown, Menu } from '@arco-design/web-react';
import {
  IconDashboard,
  IconExperiment,
  IconInteraction,
  IconPoweroff,
  IconSettings,
} from '@arco-design/web-react/icon';

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/atoms/user';

const UserAvatar = () => {
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const onClickMenuItem = (key: string) => {
    if (key === 'logout') {
      navigate('login', { replace: true });
    }
  };
  const dropList = (
    <Menu onClickMenuItem={onClickMenuItem}>
      <Menu.Item key='setting'>
        <IconSettings className='mr-2' />
        用户设置
      </Menu.Item>
      <Menu.SubMenu
        key='more'
        title={
          <div>
            <IconExperiment className='mr-2' />
            查看更多
          </div>
        }
      >
        <Menu.Item key='workplace'>
          <IconDashboard className='mr-2' />
          工作台
        </Menu.Item>
        <Menu.Item key='cardlist'>
          <IconInteraction className='mr-2' />
          数据概览
        </Menu.Item>
      </Menu.SubMenu>
      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key='logout'>
        <IconPoweroff className='mr-2' />
        安全退出
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown droplist={dropList} position='br' trigger={'click'}>
      <Avatar size={32} className='cursor-pointer'>
        <img alt='avatar' src={userInfo.avatar} />
      </Avatar>
    </Dropdown>
  );
};

export default UserAvatar;
