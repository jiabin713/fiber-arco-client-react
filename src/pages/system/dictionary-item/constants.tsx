import { Button, Dropdown, Menu, TableColumnProps, Tag } from '@arco-design/web-react';
import { IconDelete, IconDown } from '@arco-design/web-react/icon';

import FiberTag from '@/components/FiberTag';

export function getColumns<T>(callback: (record: Partial<T>, type: string) => Promise<void>): TableColumnProps[] {
  return [
    { title: '名称', dataIndex: 'label' },
    { title: '编码', dataIndex: 'value' },
    {
      title: '颜色',
      dataIndex: 'color',
      render: (value) => (
        <Tag key={value} color={value}>
          {value}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value) => <FiberTag code='system_status' value={value} />,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 168,
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
