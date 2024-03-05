import {
  Button,
  Divider,
  notification,
  Space,
  Form,
  Alert,
  message,
} from "antd";
import React, { useState, useEffect, useMemo } from "react";
import "../../Home.css";
// import Product from "./index";

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [urlImg, setUrlImg] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [dataSourceCate, setDataSourceCate] = useState([]);

  const getCategory = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());
    console.log("dataCate", data);
    setDataSourceCate(data);
  };

  useEffect(() => {
    setLoading(true);
    getCategory();
    setLoading(false);
  }, []);

  const addProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const urlData = new FormData();
    urlData.append("urlImg", urlImg);
    urlData.append("name", name);
    urlData.append("price", parseInt(price));
    urlData.append("description", description);
    urlData.append("count", count);
    urlData.append("categoryId", parseInt(categoryId));

    const data = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      body: urlData,
    })
      .then((res) => res.json())
      .catch((er) => console.log(er));

    window.location.href = "http://localhost:5173/admin/admin/product";
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setUrlImg(event.target.files[0]);
    }
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
          {({ name }) => `Added ${name} product!`}
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
    addProduct();
    openNotificationWithIcon("success");

    // setTimeout("location.href = 'http://localhost:5173/admin/admin/category';",3000);
  };

  return (
    <div value={contextValue}>
      {contextHolder}
      <h4 className="title-page">Add New Product</h4>
      <Form className="form-admin">
        <Form.Item
          className="form-item"
          name="name"
          label="Name"
          rules={[{ required: true }]}
        >
          <input
            type="text"
            style={{ borderRadius: 10 }}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="price"
          label="Price"
          rules={[{ required: true }]}
        >
          <input
            type="number"
            style={{ borderRadius: 10 }}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <textarea
            className="form-textarea"
            rows={4}
            type="text"
            style={{ borderRadius: 10 }}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="count"
          label="Count"
          rules={[{ required: true }]}
        >
          <input
            type="number"
            style={{ borderRadius: 10 }}
            onChange={(event) => {
              setCount(event.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="urlImg"
          label="Image"
          rules={[{ required: true }]}
        >
          <input type="file" id="file" onChange={handleFileChange} />
        </Form.Item>

        <Form.Item
          className="form-item"
          name="categoryId"
          label="Category"
          rules={[{ required: true }]}
        >
          <select
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
          >
            {dataSourceCate.map((dataCate, index) => (
              <option value={dataCate.id} id="idCate" key={index}>
                {dataCate.name}
              </option>
            ))}
          </select>
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

export default AddProduct;
