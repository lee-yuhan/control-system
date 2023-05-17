import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import './index.less';
import logoImg from '@/assets/logo.png';
import { history, useRequest } from 'umi';
import { login } from './service';
import cookie from 'react-cookies';

const Login = () => {
  const [form] = Form.useForm();

  const { run: loginRun } = useRequest(login, {
    manual: true,
    onSuccess: (res) => {
      cookie.save('AuthToken', res.token);
      window.location.href = '/home';
    },
  });

  return (
    <div className="login-container">
      <h1>{SYSTEM_NAME}</h1>
      <Form form={form} onFinish={loginRun} labelCol={{ span: 6 }}>
        <Form.Item
          label="帐号"
          name="username"
          rules={[{ required: true, message: '请输入帐号' }]}
        >
          <Input type="text" id="username" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input type="password" id="password" />
        </Form.Item>
        <Form.Item label="">
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
