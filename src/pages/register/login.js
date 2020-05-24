import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = () => {
  let cntuser=[];
  
  const onFinish = values => {
    let storage = window.localStorage.getItem("users") || '',
        RegistUsers = (storage.length > 0) ? JSON.parse(storage) : [];
    let cntusername = values.username, cntpass = values.password;
    if(RegistUsers.length > 0) {
        console.log("Registered Users:", RegistUsers);
    } else {
        console.log("There is no registeres user.");
        return;
    }
    for (let i = 0; i < RegistUsers.length; i++) {
        if(RegistUsers[i].username === cntusername && RegistUsers[i].password === cntpass) {
            console.log("Logged in successfully!");
            cntuser = values;
            cntuser["id"] = RegistUsers[i].id;
            window.localStorage.setItem("cntuser",JSON.stringify(cntuser));
            window.location.href="/";
            return;
        } else {
            continue;
        }
    }
    console.log("Current username or password does not matched with the registered users.");
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      style={{width: "20%", marginLeft: "40%", minWidth: "300px", marginTop: "40px"}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="true" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="" style={{marginRight: 0}}>
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}>
          Log in
        </Button>
        Or <a href="/sign-up">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;