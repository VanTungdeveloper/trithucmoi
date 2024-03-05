import { Menu } from "antd";
import {
  ProductOutlined,
  ShopOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <ProductOutlined />,
            key: "admin/dashboard",
          },
          {
            label: "Category",
            icon: <ShopOutlined />,
            key: "admin/category",
          },
          {
            label: "Product",
            icon: <ProfileOutlined />,
            key: "admin/product",
          },
          {
            label: "User",
            icon: <UserOutlined />,
            key: "admin/user",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
