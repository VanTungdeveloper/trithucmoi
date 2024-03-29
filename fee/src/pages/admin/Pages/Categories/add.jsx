import { Button, notification, Form } from "antd";
import React, { useState, useMemo } from "react";

function AddCategory() {
  const [name, setName] = useState("");
  const addCategory = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({
        name: name,
      }),
    }).then((res) => res.json());

    console.log(data);
    // window.location.href = "http://localhost:5173/admin/category";
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
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

  const handleClick = () => {
    addCategory();
    openNotificationWithIcon("success");
  };

  return (
    <div value={contextValue}>
      {contextHolder}
      <h4 className="title-page"> Add New Category </h4>
      <Form className="form-admin">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <input
            type="text"
            style={{ borderRadius: 10 }}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 2,
          }}
        >
          <Button
            type="default"
            htmlType="button"
            style={{ width: 120 }}
            onClick={() => handleClick()}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCategory;
