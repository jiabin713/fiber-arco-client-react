import { Button, Form, Grid, Input, Select } from '@arco-design/web-react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';

import { StaffParams } from '../type.d';
import useOptions from '@/hooks/useDictOptions';

const SearchForm = (props: { onSearch: (values: Partial<StaffParams>) => void }) => {
  const [form] = Form.useForm();
  const [options, isLoading] = useOptions('staff_work_status');
  const handleSubmit = () => {
    const values = form.getFieldsValue();
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  return (
    <div className='flex border-0 border-b border-solid border-arco-border-1 mb-6'>
      <Form form={form} labelAlign='left' labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} className='mr-4'>
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label='名称' field='username' rules={[{ maxLength: 32, message: '用户名称最多为32个字符' }]}>
              <Input allowClear placeholder='请输入用户名称' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label='姓名' field='name' rules={[{ maxLength: 16, message: '真实姓名最多为16个字符' }]}>
              <Input allowClear placeholder='请输入真实姓名' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label='邮件' field='email' rules={[{ maxLength: 32, message: '电子邮件最多为32个字符' }]}>
              <Input allowClear placeholder='请输入电子邮件' />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row gutter={24}>
          <Grid.Col span={8}>
            <Form.Item label='手机' field='mobile' rules={[{ maxLength: 32, message: '真实姓名最多为32个字符' }]}>
              <Input allowClear placeholder='请输入手机号码' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label='备注' field='remark' rules={[{ maxLength: 32, message: '名称最多为64个字符' }]}>
              <Input allowClear placeholder='请输入备注' />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={8}>
            <Form.Item label='在职' field='status'>
              <Select allowClear placeholder='请选择状态' options={options} loading={isLoading} />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
      </Form>
      <div className='flex flex-col justify-between pl-6 mb-6 border-0 border-l border-solid border-arco-border-2'>
        <Button type='primary' icon={<IconSearch />} onClick={handleSubmit}>
          搜索
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
