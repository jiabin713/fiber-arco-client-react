import { Button, Checkbox, Form, Input, Link, Space } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';

import { useLoginMutation } from '../query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const onSubmitClick = () => {
    form.validate().then((values) => {
      loginMutation.mutate(values, {
        onSuccess: () => {
          navigate('/dashboard', { replace: true });
        },
      });
    });
  };
  return (
    <div className='w-320px'>
      <div className='text-2xl text-arco-text-1 font-500 '>登录 Fiber Arco Pro</div>
      {/* <div className='text-lg text-arco-text-3'>登录 Arco Design Pro</div> */}
      <Form form={form} layout='vertical' className='my-9'>
        <Form.Item field='username' rules={[{ required: true, message: '名称不能为空' }]}>
          <Input prefix={<IconUser />} placeholder='请输入用户名称' onPressEnter={onSubmitClick} />
        </Form.Item>
        <Form.Item field='password' rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password prefix={<IconLock />} placeholder='请输入用户密码' onPressEnter={onSubmitClick} />
        </Form.Item>
        <Space size={16} direction='vertical'>
          <div className='flex justify-between'>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码</Link>
          </div>
          <Button type='primary' long onClick={onSubmitClick} loading={loginMutation.isLoading}>
            <span>登录</span>
          </Button>
          <Button type='text' long>
            <span className='text-arco-text-3'>注册</span>
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default LoginForm;
