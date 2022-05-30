import { Layout, Menu } from '@arco-design/web-react';
import { useLocation, useNavigate } from 'react-router-dom';

import DynamicIcon from '@/components/DynamicIcon';
import { MenuRecord } from '@/pages/system/menu/type';
import styles from './index.module.less';
import { useMenuTree } from '@/hooks/useMenuTree';
import { useState } from 'react';
import useToggle from '@/hooks/useToggle';

const renderMenu = (menuList: MenuRecord[] | undefined) => {
  if (!menuList) {
    return [];
  }
  return menuList.map((item) => {
    if (item.type === 'catalog' && item.children?.length) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={
            <span>
              <DynamicIcon icon={item.icon} /> {item.name}
            </span>
          }
        >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.path}>
        <span>
          <DynamicIcon icon={item.icon} /> {item.name}
        </span>
      </Menu.Item>
    );
  });
};

const Sidebar = () => {
  const [collapsed, toggle] = useToggle(false);
  const navigate = useNavigate();
  const menuList = useMenuTree();

  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);
  const [openKeys, setOpenKeys] = useState<string[]>(pathnames.slice(0, -1));
  const [selectedKeys, setSelectedKeys] = useState<string[]>(pathnames.slice(-1));

  return (
    <Layout.Sider
      // className='z-99 flex flex-col h-full overflow-y-auto'
      className={styles.sidebar}
      width={220}
      collapsed={collapsed}
      trigger={null}
      collapsible
      breakpoint='xl'
    >
      <Menu
        className='h-full'
        accordion
        autoScrollIntoView
        hasCollapseButton
        onCollapseChange={toggle}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClickSubMenu={(_, openKeys: string[]) => setOpenKeys(openKeys)}
        onClickMenuItem={(key: string, _event: any, keyPath: string[]) => {
          setSelectedKeys([key]);
          navigate(keyPath.reverse().join('/'));
        }}
      >
        {renderMenu(menuList)}
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
