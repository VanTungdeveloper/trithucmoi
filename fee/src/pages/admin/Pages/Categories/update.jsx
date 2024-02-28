import { Button, Form } from 'antd';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateCategory() {
    const {id} = useParams();
    const [name, setName] = useState(""); 
    const [cateUpdate, setCateUpdate] = useState({});
    const [loading, setLoading] = useState(false);

    const findOneCategory = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));

        const data = await fetch('http://localhost:3000/category/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            .then(res => res.json());

            setCateUpdate(data);
            setName(data.name);

            console.log("Name: ", name);
            console.log("CateUpdate: ", cateUpdate);
            
    };

    useEffect(() => {
        setLoading(true);
        findOneCategory(id);
        setLoading(false);
    },[id]);

    
    const updateCategory = async (idCate) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const data = await fetch('http://localhost:3000/category/' + idCate,
         {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify ({ 
                'name': name,
            }),
        })
            .then(res => res.json());

            console.log(data);
            console.log(data.name);
            
            window.location.href = "http://localhost:5173/admin/category";
    };   

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    return (
        // <Space size={20} direction="vertical">
            
        //     <div>
        //         <Typography.Title level={4}>Categories</Typography.Title>
        //         <div className="App">
        //             <div className="infomation"> 
        //                 <label>Name: </label>
                    
        //                 <input type="text"
        //                         defaultValue={cateUpdate.name}
        //                         onChange={(event) => {
        //                             setName(event.target.value);
                                
        //                     }} 
        //                 />
                        
        //                 <button type="button" className="btn btn-primary" onClick={() => updateCategory(id)}> Update Category </button>
        //             </div>
        //         </div>
        //     </div>
        // </Space>

        <div>
             <h4 className='title-page'>Update Category</h4>
             <Form className='form-admin'>
           
                <Form.Item label="Name"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <input type="text"
                                defaultValue={cateUpdate.name}
                                style={{borderRadius:10}}
                                onChange={(event) => {
                                setName(event.target.value);
                            }} 
                        />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 2,
                    }}
                >
                    <Button type="default" htmlType="button" 
                            style={{width:120}} onClick={() => updateCategory(id)}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCategory;