import { Card, Drawer, Form, Grid, Input, InputNumber, Radio, Select, TreeSelect } from '@arco-design/web-react';
import { useMenuMutation, useMenus } from '../query';

import { MenuRecord } from '../type.d';
import { StatusEnum } from '@/atoms/dictionary';
import useDictOptions from '@/hooks/useDictOptions';
import { useState } from 'react';

const MutationDrawer = (props: { visible: boolean; onCancel: () => void; formRecord: Partial<MenuRecord> }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [statusOptions, loadingStatus] = useDictOptions('system_status');
  const [typeOptions, loadingType] = useDictOptions('menu_type');

  const { isLoading, treeData } = useMenus(
    {},
    {
      enabled: !!props.visible,
    },
  );

  const mutation = useMenuMutation(title);

  const afterOpen = () => {
    // arco-react 2.32.2 可以使用 Form.setFieldsValue(props.formRecord)方法
    // 2.33.0 <Table /> 中的 树形结构修改了数据，只要有children属性，就多一个parent，并且无限循环
    // 简单点直接挨个复值 或者使用 lodash.pick 去除 parent 属性
    form.setFieldsValue({
      id: props.formRecord.id,
      parent_id: props.formRecord.parent_id || '1',
      name: props.formRecord.name,
      type: props.formRecord.type || typeOptions.find((el) => el != undefined)?.value,
      icon: props.formRecord.icon,
      permission: props.formRecord.permission,
      path: props.formRecord.path,
      component: props.formRecord.component,
      method: props.formRecord.method,
      link: props.formRecord.link,
      visible: props.formRecord.visible,
      redirect: props.formRecord.redirect,
      sort: props.formRecord.sort || 1000,
      status: props.formRecord.status || StatusEnum.enable,
      remark: props.formRecord.remark,
    });
    props.formRecord.id ? setTitle(`编辑 ${props.formRecord.name}`) : setTitle('新增菜单');
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
        <Card bordered={false}>
          <Grid.Row gutter={24}>
            <Grid.Col>
              <Form.Item
                label='上级菜单'
                field='parent_id'
                rules={[{ required: true, message: '上级菜单为必选项' }]}
                hidden={!!props.formRecord.id}
              >
                <TreeSelect
                  allowClear
                  placeholder='请选择上级菜单'
                  loading={isLoading}
                  treeData={treeData}
                  value={props.formRecord.parent_id}
                  fieldNames={{ key: 'id', title: 'name' }}
                  treeProps={{
                    autoExpandParent: false,
                  }}
                  showSearch={true}
                  filterTreeNode={(input, treeNode) => {
                    return treeNode.props.title.indexOf(input) > -1;
                  }}
                />
                {/* <TreeSelect
                  allowClear
                  unmountOnExit
                  placeholder='请选择上级菜单'
                  loading={isLoading}
                  value={props.formRecord.parent_id}
                  showSearch={true}
                  filterTreeNode={(input, treeNode) => {
                    return treeNode.props.title.indexOf(input) > -1;
                  }}
                >
                  <TreeSelect.Node key={'1'} title={'顶级菜单'} />
                  {data?.map((item) => {
                    return (
                      <TreeSelect.Node
                        key={item.id}
                        icon={<DynamicIcon icon={item.icon} />}
                        title={item.name}
                        disabled={item.status != StatusEnum.enable}
                      >
                        {item.children?.map((child) => {
                          return (
                            <TreeSelect.Node
                              key={child.id}
                              title={child.name}
                              disabled={item.status != StatusEnum.enable}
                            />
                          );
                        })}
                      </TreeSelect.Node>
                    );
                  })}
                </TreeSelect> */}
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='类型' field='type' rules={[{ required: true, message: '类型为必选项' }]}>
                <Radio.Group options={typeOptions} type='button' name='type' />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label='图标' field='icon' rules={[]}>
                <Input placeholder='选择图标' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item
                label='名称'
                field='name'
                rules={[
                  { required: true, message: '名称为必填选项' },
                  { minLength: 2, message: '名称最小需要2个字符' },
                  { maxLength: 32, message: '名称最多为32个字符' },
                ]}
              >
                <Input placeholder='请输入名称' />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label='权限标识' field='permission' rules={[]}>
                <Input placeholder='输入权限标识' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='路径' field='path' rules={[]}>
                <Input placeholder='输入路径' />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label='组件' field='component' rules={[]}>
                <Input placeholder='输入前端组件' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='外链' field='link' rules={[]}>
                <Input placeholder='输入外链地址' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={12}>
              <Form.Item label='状态' field='status' rules={[{ required: true, message: '状态为必选项' }]}>
                <Select placeholder='请选择状态' allowClear options={statusOptions} loading={loadingStatus} />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label='排序' field='sort' rules={[{ required: true, message: '排序为必填选项' }]}>
                <InputNumber placeholder='请输入排序数值' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={24}>
            <Grid.Col span={24}>
              <Form.Item label='备注' field='remark'>
                <Input.TextArea placeholder='请输入备注' />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Card>
      </Form>
    </Drawer>
  );
};

export default MutationDrawer;
