import { Card, Drawer, Tree } from '@arco-design/web-react';
import { useGrantMenus, useRoleMenuMutation } from '../query';

import FallbackCompent from '@/components/FallbackCompent';
import { RoleRecord } from '../type';
import { useMenus } from '@/pages/system/menu/query';
import { useState } from 'react';

const MutationMenuDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<RoleRecord> }) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const grantMutation = useRoleMenuMutation();

  const { data: menuData, isLoading: queryMenu } = useMenus({}, { enabled: !!props.visible });
  const { isLoading: queryGrant } = useGrantMenus(
    { role_id: props.formRecord.id || '1' },
    { enabled: Boolean(props.formRecord.id), onSuccess: (data) => setCheckedKeys(data.map((item) => item.menu_id)) },
  );

  const afterClose = () => {
    setCheckedKeys([]);
  };

  const onOk = () =>
    grantMutation.mutate(
      { role_id: props.formRecord.id, menu_ids: checkedKeys },
      {
        onSuccess: () => {
          props.onCancel();
        },
      },
    );

  const onCheck = (checkedKeys: string[]) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <Drawer
      width='33.3%'
      unmountOnExit
      visible={props.visible}
      onCancel={props.onCancel}
      afterClose={afterClose}
      onOk={onOk}
      confirmLoading={grantMutation.isLoading}
      title={'授权菜单数据'}
    >
      <Card bordered={false}>
        {queryMenu && queryGrant ? (
          <FallbackCompent />
        ) : (
          <Tree
            checkable
            autoExpandParent
            treeData={menuData}
            fieldNames={{ key: 'id', title: 'name' }}
            checkedKeys={checkedKeys}
            onCheck={onCheck}
            virtualListProps={{ height: '100%' }}
          />
        )}
      </Card>
    </Drawer>
  );
};

export default MutationMenuDrawer;
