import { Table, Typography } from "antd";
import { useEffect, useState } from "react";



function User() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const { Column, ColumnGroup } = Table;


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

            console.log(data);
            setDataSource(data);

    };

    useEffect(() => {
        setLoading(true);
        getUser();
        setLoading(false);
    },[])

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
        </div>
        <Table dataSource={dataSource}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Role" dataIndex="role" key="role" />
        </Table>
        </div>
        
    );
}

export default User;
