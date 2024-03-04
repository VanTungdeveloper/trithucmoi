import { Button, notification, Form, Input } from "antd";
import React, { useState, useMemo } from "react";
import { createUser } from "../../../../api/index.ts";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await createUser({
      email,
      password,
    });
    console.log(data);
    if (data.accessToken) {
      openNotificationWithIcon("success");
      window.location.href = "http://localhost:5173/admin/admin/user";
    }
  };

  const Context = React.createContext({
    name: name,
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: `Successfully`,
      description: (
        <Context.Consumer>
          {({ name }) => `Added ${name} category!`}
        </Context.Consumer>
      ),
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <div value={contextValue}>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <h4 className="title-page" style={{ textAlign: "center" }}>
          {" "}
          Add new user{" "}
        </h4>

        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Vui lòng nhập email người dùng"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Vui lòng nhập password người dùng"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddUser;
