import { Card, Divider, Drawer, Form, Input, InputNumber, Select, TreeSelect } from '@arco-design/web-react';

import { StaffRecord } from '../type.d';
import { StatusEnum } from '@/atoms/dictionary';
import useDictOptions from '@/hooks/useDictOptions';
import { useOrganizations } from '@/pages/system/organization/query';
import { usePositionsAll } from '@/pages/system/position/query';
import { useRolesAll } from '@/pages/system/role/query';
import { useStaffMutation } from '../query';
import { useState } from 'react';

const MutationDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<StaffRecord> }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const mutation = useStaffMutation(title);
  const [statusOptions, statusOptionsLoading] = useDictOptions('staff_status');
  const [genderOptions, genderOptionsLoading] = useDictOptions('staff_gender');

  const { data: organizationTree, isLoading: organizationLoading } = useOrganizations({}, { enabled: !!props.visible });
  const { data: roleOptions, isLoading: roleLoading } = useRolesAll({}, { enabled: !!props.visible });
  const { data: positionOptions, isLoading: positionLoading } = usePositionsAll({}, { enabled: !!props.visible });

  const afterOpen = () => {
    form.setFieldsValue({
      username: props.formRecord.username,
      name: props.formRecord.name,
      email: props.formRecord.email,
      mobile: props.formRecord.mobile,
      gender: props.formRecord.gender || genderOptions.find((x) => x != null)?.value,
      status: props.formRecord.status || statusOptions.find((x) => x != null)?.value,
      sort: props.formRecord.sort || 1000,
      remark: props.formRecord.remark,
    });
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.name}`) : setTitle('新增用户');
  };
  const afterClose = () => {
    form.resetFields();
  };

  const onOk = () => {
    form.validate().then((values) => {
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
      afterClose={afterClose}
      onOk={onOk}
      confirmLoading={mutation.isLoading}
      title={title}
    >
      <Form form={form} scrollToFirstError layout={'vertical'}>
        <Divider orientation='left'>基础信息</Divider>
        <Card bordered={false}>
          <Form.Item
            label='用户名称'
            field='username'
            rules={[
              { required: true, message: '用户名称为必填选项' },
              { minLength: 2, message: '用户名称最小需要2个字符' },
              { maxLength: 32, message: '用户名称最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入用户名称' />
          </Form.Item>
          <Form.Item
            label='真实姓名'
            field='name'
            rules={[
              { required: true, message: '姓名为必填选项' },
              { minLength: 2, message: '姓名最小需要2个字符' },
              { maxLength: 16, message: '姓名最多为16个字符' },
            ]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label='电子邮件'
            field='email'
            rules={[
              { required: true, message: '电子邮件为必填选项' },
              { minLength: 2, message: '电子邮件最小需要2个字符' },
              { maxLength: 32, message: '电子邮件最多为32个字符' },
            ]}
          >
            <Input placeholder='请输入电子邮件' />
          </Form.Item>
          <Form.Item
            label='手机号码'
            field='mobile'
            rules={[
              { required: true, message: '手机号码为必填选项' },
              { minLength: 11, message: '手机号码最小需要11个字符' },
              { maxLength: 11, message: '手机号码最多为11个字符' },
            ]}
          >
            <Input placeholder='请输入手机号码' />
          </Form.Item>
          <Form.Item label='性别' field='gender' rules={[{ required: true, message: '性别为必选项' }]}>
            <Select
              placeholder='请选择性别'
              unmountOnExit
              allowClear
              options={genderOptions}
              loading={genderOptionsLoading}
            />
          </Form.Item>
          <Form.Item label='状态' field='status' rules={[{ required: true, message: '状态为必选项' }]}>
            <Select
              placeholder='请选择状态'
              unmountOnExit
              allowClear
              options={statusOptions}
              loading={statusOptionsLoading}
            />
          </Form.Item>
          <Form.Item
            label='排序'
            field='sort'
            initialValue={1000}
            rules={[{ required: true, message: '排序为必填选项' }]}
          >
            <InputNumber placeholder='请输入排序数值' />
          </Form.Item>
          <Form.Item label='备注' field='remark'>
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>
        </Card>
        <Divider orientation='left'>附属信息</Divider>
        <Card bordered={false}>
          <Form.Item label='角色' field='role_id' rules={[{ required: true, message: '角色为必选项' }]}>
            <Select
              allowClear
              unmountOnExit
              showSearch
              placeholder='请选择角色'
              loading={roleLoading}
              filterOption={(inputValue, option) => option.props.children.indexOf(inputValue) >= 0}
            >
              {roleOptions?.map((item) => (
                <Select.Option key={item.id} value={item.id} disabled={item.status != StatusEnum.enable}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='职位' field='position_id' rules={[{ required: true, message: '职位为必选项' }]}>
            <Select
              allowClear
              unmountOnExit
              showSearch
              placeholder='请选择职位'
              loading={positionLoading}
              filterOption={(inputValue, option) => option.props.children.indexOf(inputValue) >= 0}
            >
              {positionOptions?.map((item) => (
                <Select.Option key={item.id} value={item.id} disabled={item.status != StatusEnum.enable}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='组织' field='organization_id' rules={[{ required: true, message: '部门为必选项' }]}>
            <TreeSelect
              allowClear
              showSearch
              placeholder='请选择组织'
              loading={organizationLoading}
              treeData={organizationTree}
              fieldNames={{ key: 'id', title: 'name' }}
              filterTreeNode={(input, treeNode) => {
                return treeNode.props.title.indexOf(input) > -1;
              }}
            />
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationDrawer;
