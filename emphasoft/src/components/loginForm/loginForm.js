import React from 'react';
import 'antd/dist/antd.css';
import './loginForm.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (props) => {
  return (
    <Form
      name="login_form"
      initialValues={{
        remember: true,
      }}
      onFinish={props.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Username is required.',
          },{
            pattern: /^([\w.@+-]){0,128}$/,
            message: 'Letters, digits and @/./+/-/_ only. 128 digits maximum.',
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Password is required.',
          },{
            pattern: /^(?=.*[A-Z])(?=.*\d).{8,150}$/,
            message: 'Password must contain an uppercase letter, digit and be at least 8 characters. 150 digits maximum.',
          }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;