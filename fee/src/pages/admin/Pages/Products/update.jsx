import { Button, notification, Form, Space } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const [urlImg, setUrlImg] = useState("");
  const [categoryId, setCategoryId] = useState();

  const [dataSourceCate, setDataSourceCate] = useState([]);
  const [productUpdate, setProductUpdate] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const findOneProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/product/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());

    setProductUpdate(data);

    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setCount(data.count);
    setUrlImg(data.urlImg);
    setCategoryId(data.categoryId);
    setcategoryName(data.category.name);
  };

  const getCategory = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());
    setDataSourceCate(data);
  };

  useEffect(() => {
    setLoading(true);
    findOneProduct(id);
    getCategory();
    setLoading(false);
  }, []);

  const updateProduct = async (idProduct) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const urlData = new FormData();
    urlData.append("urlImg", urlImg);
    urlData.append("name", name);
    urlData.append("price", parseInt(price));
    urlData.append("description", description);
    urlData.append("count", count);
    urlData.append("categoryId", parseInt(categoryId));

    const data = await fetch("http://localhost:3000/product/" + idProduct, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
      body: urlData,
    })
      .then((res) => res.json())
      .catch((er) => console.log(er));
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setUrlImg(event.target.files[0]);
    }
  };

  const Context = React.createContext({
    name: name,
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: `Successful`,
      description: (
        <Context.Consumer>
          {({ name }) => `Updated ${name} products!`}
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
    updateProduct(id);
    openNotificationWithIcon("success");

    setTimeout(
      "location.href = 'http://localhost:5173/admin/admin/product';",
      900
    );
  };

  return (
    <Space size={20} direction="vertical">
      <div value={contextValue}>
        {contextHolder}
        <h4 className="title-page">Update Product</h4>
        <Form className="form-admin">
          <Form.Item label="Name" rules={[{ required: true }]}>
            <input
              type="text"
              defaultValue={productUpdate.name}
              style={{ borderRadius: 10 }}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Price" rules={[{ required: true }]}>
            <input
              type="number"
              defaultValue={productUpdate.price}
              style={{ borderRadius: 10 }}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Description" rules={[{ required: true }]}>
            <textarea
              rows={4}
              type="text"
              defaultValue={productUpdate.description}
              style={{ borderRadius: 10 }}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Count" rules={[{ required: true }]}>
            <input
              type="text"
              defaultValue={productUpdate.count}
              style={{ borderRadius: 10 }}
              onChange={(event) => {
                setCount(event.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Image" rules={[{ required: true }]}>
            <input type="file" id="file" onChange={handleFileChange} />
            <img height={60} width={60} src={urlImg} />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
          >
            <select
              onChange={(event) => {
                setCategoryId(event.target.value);
              }}
            >
              <option>{categoryName}</option>
              {dataSourceCate.map(
                (dataCate, index) =>
                  dataCate.name != categoryName && (
                    <option value={dataCate.id} key={index}>
                      {dataCate.name}
                    </option>
                  )
              )}
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
              onClick={() => handleClick(id)}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Space>
  );
}

export default UpdateProduct;
