import { Table, Typography, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function User() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const { Column, ColumnGroup } = Table;

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());

    console.log(data);
    setDataSource(data);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);

  return (
    // <Space size={20} direction="vertical">

    //     <div>
    //         <Typography.Title level={4}>Users</Typography.Title>

    //         <div className="justify-content-center align-items-center">
    //             <div className="w-50 bg-white rounded">
    //                 <table className="table">
    //                     <thead>
    //                         <tr>
    //                             <th>Id</th>
    //                             <th>Email</th>
    //                             <th>Role</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>

    //                         {
    //                             dataSource.map((data, index)=> (
    //                                 <tr key={index}>
    //                                     <td>{data.id}</td>
    //                                     <td>{data.email}</td>
    //                                     <td>{data.role}</td>
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
          <Typography.Title level={4}>Users</Typography.Title>
        </div>
        <div className="infomation">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => {
              navigate("add");
            }}
          >
            + Thêm mới user
          </button>
        </div>
      </div>
      <Table dataSource={dataSource.reverse()}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button type="button" className="btn btn-info">
                {" "}
                Update{" "}
              </button>
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this product?"
                // onConfirm={confirm}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className="btn btn-danger">
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

export default User;
