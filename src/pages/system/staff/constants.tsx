import { Button, Dropdown, Menu, TableColumnProps } from '@arco-design/web-react';
import { IconDelete, IconDown } from '@arco-design/web-react/icon';

import FiberTag from '@/components/FiberTag';

export function getColumns<T>(callback: (record: Partial<T>, type: string) => Promise<void>): TableColumnProps[] {
  return [
    { title: '用户名称', dataIndex: 'username' },
    { title: '姓名', dataIndex: 'name' },
    { title: '电子邮件', dataIndex: 'email' },
    { title: '电话号码', dataIndex: 'mobile' },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '10%',
      render: (value) => <FiberTag code='staff_gender' value={value} />,
    },
    { title: '备注', dataIndex: 'remark' },
    {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: (value) => <FiberTag code='staff_status' value={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 128,
      fixed: 'right',
      render: (_, record: Partial<T>) => (
        <Dropdown.Button
          onClick={() => callback(record, 'edit')}
          icon={<IconDown />}
          trigger={['click']}
          droplist={
            <Menu onClickMenuItem={(key) => callback(record, key)}>
              <Menu.Item key='delete'>
                <Button type='text' status='danger' icon={<IconDelete />}>
                  删除
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          编辑
        </Dropdown.Button>
      ),
    },
  ];
}
