import { Space, Table, Typography, message, Popconfirm} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Home.css";

function Category() {

    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState('/');
    const { Column, ColumnGroup } = Table;

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);

    }, [location.pathname])

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    let idCategory = 0;

    const getId = (id) => {
        idCategory = id;
    };

    const confirm = () => {
        deleteCategory(idCategory);
       
    };
    const cancel = () => {
        message.error('Canceled!');
    };

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

            console.log(data);
            setDataSource(data);
    };

    useEffect(() => {
        setLoading(true);
        getCategory();
        setLoading(false);
    },[])

    const deleteCategory = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const data = await fetch('http://localhost:3000/category/' + id,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                })
        .then(res => res.json());

        console.log(data);  
        
        message.success('Deleted!');
        getCategory();
    }

    return (
        // <Space size={20} direction="vertical">
            
        //     <div>
        //         <Typography.Title level={4}>Categories</Typography.Title>
        //         <div className="App">
        //             <div className="infomation">
        //                 <button type="button" className="btn btn-info" onClick={() => {navigate("add");}}> Add New Catergory </button>
        //             </div>
        //         </div>
                
        //         <div className="justify-content-center align-items-center">
        //             <div className="w-50 bg-white rounded">
        //                 <table className="table">
        //                     <thead>
        //                         <tr>
        //                             <th>Id</th>
        //                             <th>Name</th>
        //                             <th>Action</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
                                
        //                         {
        //                             dataSource.map((data, index)=> (
        //                                 <tr key={index}>
        //                                     <td>{data.id}</td>
        //                                     <td>{data.name}</td>
        //                                     <td>
        //                                         <button type="button" className="btn btn-info" onClick={() => {navigate("" + data.id);}}> Update </button>
        //                                         <button type="button" className="btn btn-danger" onClick={() => deleteCategory(data.id)}> Delete </button>
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
                    <Typography.Title level={4}>Categories</Typography.Title>
                </div>
                <div className="infomation">
                    <button type="button" className="btn btn-default" onClick={() => {navigate("add");}}> + Add New Category </button>
                </div>
            </div>
            <Table dataSource={dataSource}>
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <button type="button" className="btn btn-info" onClick={() => {navigate("" + record.id);}}> Update </button>                        
                            <Popconfirm
                                title="Delete the category"
                                description="Are you sure to delete this category?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No" 
                            >
                                <button type="button" className="btn btn-danger" onClick={getId(record.id)}> Delete </button>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </div>               
    );
}

export default Category;
