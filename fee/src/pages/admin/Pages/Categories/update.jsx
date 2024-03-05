import { Button, notification, Form } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

function UpdateCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [cateUpdate, setCateUpdate] = useState({});
  const [loading, setLoading] = useState(false);

  const findOneCategory = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/category/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());

    setCateUpdate(data);
    setName(data.name);

    console.log("Name: ", name);
    console.log("CateUpdate: ", cateUpdate);
  };

  useEffect(() => {
    setLoading(true);
    findOneCategory(id);
    setLoading(false);
  }, [id]);

  const updateCategory = async (idCate) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await fetch("http://localhost:3000/category/" + idCate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
      body: JSON.stringify({
        name: name,
      }),
    }).then((res) => res.json());

    console.log(data);
    console.log(data.name);

    // window.location.href = "http://localhost:5173/admin/admin/category";
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
    exName: cateUpdate.name,
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: `Successful`,
      description: (
        <Context.Consumer>
          {({ name, exName }) => `Updated ${name} to ${exName}!`}
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

  const handleClick = (id) => {
    updateCategory(id);
    openNotificationWithIcon("success");

    setTimeout(
      "location.href = 'http://localhost:5173/admin/admin/category';",
      900
    );
  };

  return (
    <div value={contextValue}>
      {contextHolder}
      <h4 className="title-page">Update Category</h4>
      <Form className="form-admin">
        <Form.Item label="Name" rules={[{ required: true }]}>
          <input
            type="text"
            defaultValue={cateUpdate.name}
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
            onClick={() => handleClick(id)}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdateCategory;
