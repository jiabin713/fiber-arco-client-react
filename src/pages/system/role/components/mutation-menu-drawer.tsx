import { Card, Drawer, Form, FormInstance } from '@arco-design/web-react';

import { RoleRecord } from '../type.d';
import { useRef } from 'react';
import { useRoleMenuMutation } from '../query';

const MutationMenuDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<RoleRecord> }) => {
  const formRef = useRef<FormInstance>(null);
  const mutation = useRoleMenuMutation();

  const afterOpen = () => {
    formRef.current?.setFieldsValue(props.formRecord);
  };

  const onOk = () => {
    formRef.current?.validate().then((values) => {
      mutation.mutate(
        { ...props.formRecord, ...values },
        {
          onSuccess: () => {
            props.onCancel();
          },
        },
      );
    });
  };

  return (
    <Drawer
      width='33.3%'
      unmountOnExit
      visible={props.visible}
      onCancel={props.onCancel}
      afterOpen={afterOpen}
      onOk={onOk}
      confirmLoading={mutation.isLoading}
      title={'授权菜单数据'}
    >
      <Form ref={formRef} scrollToFirstError layout={'vertical'}>
        <Card bordered={false}>
          <Form.Item
            label='角色名称'
            field='name'
            rules={[
              { required: true, message: '名称为必填选项' },
              { minLength: 2, message: '名称最小需要2个字符' },
              { maxLength: 32, message: '名称最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入名称' />
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationMenuDrawer;
