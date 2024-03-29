import { BellFilled, MailOutlined, LoginOutlined } from "@ant-design/icons";
import { Badge, Button, Space } from "antd";
import logo from "./logo.jpg";

function AdminHeader() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="AdminHeader">
      <Space className="logo-name">
        <div>
          <img width={60} height={60} src={logo} alt={logo} />
        </div>
        <div>
          <h4>Food Love</h4>
        </div>
      </Space>
      <Space>
        {/* <Badge count={9}>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge dot>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge> */}
        <Button danger icon={<LoginOutlined />} onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Space>
    </div>
  );
}

export default AdminHeader;
