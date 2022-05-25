import { DictionaryItemParams, DictionaryItemRecord } from './type';
import { Drawer, PaginationProps, Table } from '@arco-design/web-react';
import { useDictionaryItemDelete, useDictionaryItems } from './query';

import { DictionaryRecord } from '../dictionary/type';
import MutationDrawer from './components/mutation-drawer';
import OperationButtons from './components/operation-buttons';
import SearchForm from './components/search-form';
import { getColumns } from './constants';
import { useState } from 'react';
import { calCurrent } from '@/utils/paginator';

const DictionaryItem = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<DictionaryRecord> }) => {
  const [formParams, setFormParams] = useState<Partial<DictionaryItemParams>>({});
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Partial<DictionaryItemRecord>>({});
  const { data, isLoading } = useDictionaryItems(
    { ...formParams, dictionary_id: props.formRecord.id },
    { enabled: props.visible },
  );
  const { confirmRemove } = useDictionaryItemDelete();

  const onChangeTable = (pagination: Partial<PaginationProps>) => {
    setFormParams({
      ...formParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  //表格操作列回调
  const operationCallback = async (record: Partial<DictionaryItemRecord>, type: string) => {
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

  const columns = getColumns<DictionaryItemRecord>(operationCallback);

  return (
    <Drawer
      width='50%'
      unmountOnExit
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      title={`${props.formRecord.name} 选项`}
    >
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
        formRecord={{ ...currentRecord, dictionary_id: props.formRecord.id }}
      />
    </Drawer>
  );
};

export default DictionaryItem;
