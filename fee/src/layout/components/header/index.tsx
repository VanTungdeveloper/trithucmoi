import { Layout, Menu, Button } from 'antd';
const { Header } = Layout;

const NavBar = () => (
  <Layout className="layout">
    <Header style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#fff" }}>
      <h3 className="logo" style={{ color: 'red', margin: 0, display: "flex", alignItems: "center" }}> Food Love</h3>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} >
        <Menu.Item key="1" >Trang chủ</Menu.Item>
        <Menu.Item key="2" >Danh sách món</Menu.Item>
        <Menu.Item key="3" >Liên hệ</Menu.Item>
      </Menu>
      <div>
        <Button href='/register' type="primary" style={{ marginRight: '10px' }} danger >Đăng ký</Button>
        <Button href='/login' danger>Đăng nhập</Button>
      </div>
    </Header>
  </Layout>
);

export default NavBar