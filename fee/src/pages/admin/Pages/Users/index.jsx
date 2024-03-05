import { Table, Typography, Space, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function User() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { Column, ColumnGroup } = Table;
  const navigate = useNavigate();

  const getUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());

    setDataSource(data);
  };

  const deleteUser = async (id) => {
    console.log(id);
    const user = JSON.parse(localStorage.getItem("user"));
    const data = await fetch("http://localhost:3000/user/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.accessToken,
      },
    }).then((res) => res.json());
  };

  const confirm = (id) => {
    setLoading(false);
    deleteUser(id);
    message.success("Deleted!");
    setLoading(true);
  };

  const handleCancel = () => {
    message.error("Canceled!");
  };

  useEffect(() => {
    getUser();
    setLoading(false);
  }, []);

  return (
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
              <Popconfirm
                title="Delete the product"
                description="Are you sure to delete this user?"
                onConfirm={() => confirm(record.id)}
                onCancel={handleCancel}
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
