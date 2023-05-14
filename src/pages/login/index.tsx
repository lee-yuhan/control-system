import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import './index.less';
import logoImg from '@/assets/logo.png';

const Login = () => {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    console.log('values', values);

    // event.preventDefault();
    // 做登录验证的操作
  };

  return (
    <div className="login-container">
      <h1>系统</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        style={{ paddingTop: 50, paddingLeft: 30, paddingRight: 30 }}
      >
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
