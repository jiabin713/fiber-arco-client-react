import { Card, Table } from '@arco-design/web-react';
import { OrganizationParams, OrganizationRecord } from './type.d';
import { useOrganizationDelete, useOrganizations } from './query';

import MutationDrawer from './components/mutation-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { getColumns } from './constants';
import { useState } from 'react';

const Organization = () => {
  const [formParams, setFormParams] = useState<Partial<OrganizationParams>>({});
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<OrganizationRecord>>({});
  const { data, isLoading } = useOrganizations(formParams);
  const { confirmRemove } = useOrganizationDelete();

  //表格操作列回调
  const operationCallback = async (record: Partial<OrganizationRecord>, type: string) => {
    if (type === 'edit') {
      setCurrentRecord(record);
      setDrawerVisible(true);
    }
    if (type === 'delete') {
      confirmRemove(record);
    }
  };
  const columns = getColumns<OrganizationRecord>(operationCallback);
  const onCancel = () => {
    setDrawerVisible(false);
    setCurrentRecord({});
  };
  return (
    <Card bordered={false}>
      <SearchForm onSearch={(params) => setFormParams(params)} />
      <OperationButtons onAdd={() => setDrawerVisible(true)} />
      <Table rowKey='id' loading={isLoading} columns={columns} data={data} pagination={false} />
      <MutationDrawer visible={drawerVisible} onCancel={onCancel} formRecord={currentRecord} />
    </Card>
  );
};

export default Organization;
