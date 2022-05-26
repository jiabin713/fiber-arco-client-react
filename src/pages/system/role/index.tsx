import { Card, PaginationProps, Table } from '@arco-design/web-react';
import { RoleParams, RoleRecord } from './type';
import { useRoleDelete, useRoles } from './query';

import MutationDrawer from './components/mutation-drawer';
import MutationMenuDrawer from './components/mutation-menu-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { calCurrent } from '@/utils/paginator';
import { getColumns } from './constants';
import { useState } from 'react';

const Role = () => {
  const [formParams, setFormParams] = useState<Partial<RoleParams>>({});
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<RoleRecord>>({});

  const { data, isLoading } = useRoles(formParams);
  const { confirmRemove } = useRoleDelete();

  // 分页操作
  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  //表格操作列回调
  const operationCallback = async (record: Partial<RoleRecord>, type: string) => {
    if (type === 'edit') {
      setCurrentRecord(record);
      setDrawerVisible(true);
    }
    if (type === 'delete') {
      confirmRemove(record, () => {
        // 解决分页最后一行删除返回上一页
        const current = calCurrent(data?.current, data?.pageSize, data?.total);
        // 触发formParams更新，重新请求
        setFormParams({ ...formParams, current });
        return data?.current === current;
      });
    }
    if (type === 'grantMenu') {
      setCurrentRecord(record);
      setMenuDrawerVisible(true);
    }
  };
  const columns = getColumns<RoleRecord>(operationCallback);
  return (
    <Card bordered={false}>
      <SearchForm onSearch={(params) => setFormParams(params)} />
      <OperationButtons onAdd={() => setDrawerVisible(true)} />
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        data={data?.list}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          pageSize: data?.pageSize,
          current: data?.current,
          total: data?.total,
        }}
        onChange={onChangeTable}
      />
      <MutationDrawer
        visible={drawerVisible}
        onCancel={() => {
          setDrawerVisible(false);
          setCurrentRecord({});
        }}
        formRecord={currentRecord}
      />
      <MutationMenuDrawer
        visible={menuDrawerVisible}
        onCancel={() => {
          setMenuDrawerVisible(false);
          setCurrentRecord({});
        }}
        formRecord={currentRecord}
      />
    </Card>
  );
};

export default Role;
