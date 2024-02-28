import { Card, Space, Statistic, Typography } from "antd";
import { DollarCircleOutlined, ProductOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
function Dashboard () {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    let countCategory = 0;
    let countProduct = 0;
    let countUser = 0;

    const [loading, setLoading] = useState(false);

    const getCategory = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        
        const data = await fetch('http://localhost:3000/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(res => res.json());

            setCategories(data);
    };

    const getProduct = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        
        const data = await fetch('http://localhost:3000/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(res => res.json());

            setProducts(data);

    };

    const getUser = async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        
        const data = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(res => res.json());
            setUsers(data);

    };

    useEffect(() => {
        setLoading(true);
        getCategory();
        getProduct();
        getUser();
        setLoading(false);
    },[])

    categories.forEach(cate => {
        countCategory++;
    });
    products.forEach(product => {
        countProduct++;
    });
    users.forEach(user => {
        countUser++;
    });

    return (
        <div>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
                <DashboardCard 
                    icon={<ProductOutlined 
                        style={{ 
                            color: "green", 
                            backgroundColor:"rgba(0,255,0,0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,  
                        }} 
                    />} 
                    title={"Categories"} 
                    value={countCategory} 
                />
                <DashboardCard 
                    icon={<ProfileOutlined 
                        style={{ 
                            color: "blue", 
                            backgroundColor:"rgba(0,0,255,0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,  
                            }} 
                    />} 
                    title={"Products"} 
                    value={countProduct} 
                />
                <DashboardCard 
                    icon={<UserOutlined 
                        style={{ 
                            color: "purple", 
                            backgroundColor:"rgba(0,255,255,0.5)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,  
                        }} 
                    />} 
                    title={"Users"} 
                    value={countUser} 
                />
                {/* <DashboardCard 
                    icon={<DollarCircleOutlined 
                        style={{ 
                            color: "red", 
                            backgroundColor:"rgba(255,0,0,0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 8,  
                        }} 
                    />} 
                    title={"Revenue"} 
                    value={999999} 
                /> */}
            </Space>
        </div>
    )
}

function DashboardCard({title, value, icon}) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

export default Dashboard;
