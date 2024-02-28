import { Button, Layout, Menu, Modal } from "antd";
import Foote from "./layout/components/footer";
import HomeClient from "./pages/client/home";
import { useState } from "react";
import ProductPage from "./pages/client/product";
import ContactPage from "./pages/client/contact";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Header } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const token = localStorage.getItem("token");

  const ComponentsSwitch: React.FC<{ key: string }> = ({ key }) => {
    switch (key) {
      case "1":
        return <HomeClient />;
      case "2":
        return <ProductPage />;
      case "3":
        return <ContactPage />;
      default:
        return <HomeClient />; // or some default component
    }
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      localStorage.clear()
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <h3
            className="logo"
            style={{
              color: "red",
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            Food Love
          </h3>
          <Menu
            onClick={(e) => setSelectedMenuItem(e.key)}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">Trang chủ</Menu.Item>
            <Menu.Item key="2">Danh sách món</Menu.Item>
            <Menu.Item key="3">Liên hệ</Menu.Item>
          </Menu>
          <div>
            {token ? (
              <>
                <Button icon={<ShoppingCartOutlined />} style={{ margin: 10 }}>
                  Xem giỏ hàng
                </Button>
                <Button type="primary" icon={<LogoutOutlined />} danger onClick={showModal}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button
                  href="/register"
                  type="primary"
                  style={{ marginRight: "10px" }}
                  danger
                >
                  Đăng ký
                </Button>
                <Button href="/login" danger>
                  Đăng nhập
                </Button>
              </>
            )}
          </div>
        </Header>
      </Layout>
      {ComponentsSwitch({ key: selectedMenuItem })}
      <Foote />

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
    </>
  );
}

export default App;
