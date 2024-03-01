import { useState, useEffect } from "react";
import { Button, Layout, Menu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../../page/Cart/Cart";
import { CartProvider } from "react-use-cart";
import { ProductOutlined, ShopOutlined, PhoneOutlined, LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";

// const { Header } = Layout;

function ClientHeader({totalItems}) {

    const token = localStorage.getItem("token");

    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState('/');

    console.log("totalItems", totalItems); 

    useEffect(() => { 
        const pathName = location.pathname;
        setSelectedKeys(pathName); 
    }, [location.pathname]);

    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const showCart = () => {
        setOpenCart(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
        localStorage.clear()
        setOpen(false);
        setConfirmLoading(false);
        }, 2000);
    };

    const cartOk = () => {
        setOpenCart(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCartCancel = () => {
        setOpenCart(false);
    };

    const afterClose = () => {
        window.location.href = "http://localhost:5173/menu";
    };
   
    return(
        <Layout className="layout">
            <div className="ClientHeader"
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
                    theme="light"
                    mode="horizontal"
                    style={{width:300}}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    selectedKeys={[selectedKeys]}
                    items={[
                        {
                            label:"Home",
                            icon: <ShopOutlined />,
                            key: "/",
                        },
                        {
                            label:"Menu",
                            icon: <ProductOutlined />,
                            key: "menu",
                        },
                        {
                            label:"Contact",
                            icon: <PhoneOutlined />,
                            key: "contact",
                        },
                    ]}
                ></Menu>
            <div style={{ paddingTop:8}} >
                {token ? (
                <>  
                    <Button icon={<ShoppingCartOutlined />} style={{ margin: 10, border:"none" }} onClick={showCart}>
                        {/* &#160; {totalItems}  */}
                    </Button>

                    <Button type="primary" icon={<LogoutOutlined />} danger onClick={showModal}>
                        Log out
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
                        Register
                    </Button>
                    <Button href="/login" danger>
                        Log in
                    </Button>
                </>
                )}
            </div>
            </div>

            <Modal
                title="Log out"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>

            <Modal
                title="Cart"
                open={openCart}
                onOk={cartOk}
                onCancel={handleCartCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                afterClose={afterClose}
            >
                <CartProvider>
                    < Cart />
                </CartProvider>       
            </Modal>
      </Layout>
    )
}

export default ClientHeader;