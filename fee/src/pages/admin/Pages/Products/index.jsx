import { Space, Table, Typography, message, Popconfirm } from "antd";
import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Home.css";

function Product() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  const { Column, ColumnGroup } = Table;

  let idProduct = 0;

  const getId = (id) => {
    idProduct = id;
  };

  const confirm = () => {
    deleteProduct(idProduct);
  };
  const cancel = () => {
    message.error("Canceled!");
  };

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceCate, setDataSourceCate] = useState([]);

  const getCategory = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const data = await fetch("http://localhost:3000/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());
    console.log("dataCate", data);
    setDataSourceCate(data);
  };

  const getProduct = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const data = await fetch("http://localhost:3000/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());

    console.log(data);
    console.log("Token", token);
    setDataSource(data);
  };

  useEffect(() => {
    setLoading(true);
    getCategory();
    getProduct();
    setLoading(false);
  }, []);

  const deleteProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await fetch("http://localhost:3000/product/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());

    console.log(data);
    message.success("Deleted!");
    getProduct();
  };

  return (
    // <Space size={20} direction="vertical">

    //     <div className="page-content">
    //         <Typography.Title level={4}>Products</Typography.Title>
    //         <div className="App">
    //             <div className="infomation">
    //                 <button type="button" className="btn btn-info" onClick={() => {navigate("add");}}> Add New Product </button>
    //             </div>
    //         </div>

    //         <div className="justify-content-center align-items-center">
    //             <div className="w-50 bg-white rounded">
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Id</th>
    //                             <th>Name</th>
    //                             <th>Price</th>
    //                             <th>Description</th>
    //                             <th>Count</th>
    //                             <th>Image</th>
    //                             <th>Category</th>
    //                             <th>Action</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>

    //                         {
    //                             dataSource.map((data, index)=> (
    //                                 <tr key={index}>
    //                                     <td>{data.id}</td>
    //                                     <td>{data.name}</td>
    //                                     <td>{data.price}</td>
    //                                     <td>{data.description}</td>
    //                                     <td>{data.count}</td>
    //                                     <td><img src={data.urlImg} alt="" /></td>
    //                                     <td>
    //                                         {dataSourceCate.map((dataCate)=>
    //                                             {   if (data.categoryId === dataCate.id) {
    //                                                 return dataCate.name;
    //                                                 }
    //                                             }
    //                                         )}
    //                                     </td>

    //                                     <td>
    //                                         <button type="button" className="btn btn-info" onClick={() => {navigate("" + data.id);}}> Update </button>
    //                                         <button type="button" className="btn btn-danger" onClick={() => deleteProduct(data.id)}> Delete </button>
    //                                     </td>
    //                                 </tr>
    //                             ))
    //                         }

    //                     </tbody>

    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // </Space>
    <div>
      <div className="App">
        <div className="infomation">
          <Typography.Title level={4}>Products</Typography.Title>
        </div>
        <div className="infomation">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => {
              navigate("add");
            }}
          >
            {" "}
            + Add New Product{" "}
          </button>
        </div>
      </div>
      <Table dataSource={dataSource}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Count" dataIndex="count" key="count" />
        <Column
          title="Image"
          key="urlImg"
          render={(_, record) => (
            <Space size="middle">
              <img width={50} height={50} src={record.urlImg} />
            </Space>
          )}
        />

        <Column
          title="Category"
          key="categoryId"
          render={(_, record) => (
            <Space size="middle">
              {dataSourceCate.map((dataCate) => {
                if (record.categoryId === dataCate.id) {
                  return dataCate.name;
                }
              })}
            </Space>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  navigate("" + record.id);
                }}
              >
                {" "}
                Update{" "}
              </button>
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => getId(record.id)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Product;
