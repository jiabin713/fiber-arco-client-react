import { Card, Grid, PaginationProps, Table, Tree } from '@arco-design/web-react';
import { StaffParams, StaffRecord } from './type.d';
import { useStaffDelete, useStaffs } from './query';

import MutationDrawer from './components/mutation-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { calCurrent } from '@/utils/paginator';
import { getColumns } from './constants';
import { useOrganizations } from '../organization/query';
import { useState } from 'react';

const Staff = () => {
  const [formParams, setFormParams] = useState<Partial<StaffParams>>({});
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<StaffRecord>>({});
  const { data: organizationTree, isLoading: organizationLoading } = useOrganizations({});
  const { data, isLoading } = useStaffs(formParams);
  const { confirmRemove } = useStaffDelete();
  

  // 分页操作
  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  //表格操作列回调
  const operationCallback = async (record: Partial<StaffRecord>, type: string) => {
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
  };
  const columns = getColumns<StaffRecord>(operationCallback);
  return (
    <Card>
      <Grid.Row gutter={24}>
        <Grid.Col span={4}>
          {!organizationLoading && (
            <Tree
              treeData={organizationTree}
              fieldNames={{ key: 'id', title: 'name' }}
              onSelect={(selectKeys) => setFormParams({ ...formParams, organization_id: selectKeys.find((x) => x) })}
              selectedKeys={formParams.organization_id ? [formParams.organization_id] : []}
            />
          )}
        </Grid.Col>
        <Grid.Col span={20} className='border-0 border-l border-solid border-arco-border-2'>
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
        </Grid.Col>
      </Grid.Row>
    </Card>
  );
};

export default Staff;
