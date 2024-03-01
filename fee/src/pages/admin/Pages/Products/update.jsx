import { Button, notification, Form, Space} from 'antd';
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0); 
    const [description, setDescription] = useState(""); 
    const [count, setCount] = useState(0); 
    const [urlImg, setUrlImg] = useState(""); 
    const [categoryId, setCategoryId] = useState(0); 

    const [dataSourceCate, setDataSourceCate] = useState([]);
    const [productUpdate, setProductUpdate] = useState({});
    const [cateName, setCateName] = useState("");

    const findOneProduct = async (id) => {
        const token = JSON.parse(localStorage.getItem("token"));

        const data = await fetch('http://localhost:3000/product/' + id,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            .then(res => res.json());

            setProductUpdate(data);

            setName(data.name)
            setPrice(data.price);
            setDescription(data.description); 
            setCount(data.count);
            setUrlImg(data.urlImg);
            setCategoryId(data.categoryId);
            setIdCate(data.categoryId);

            console.log('SetName: ', name);
                       
            console.log("Product: ", productUpdate);
            
    };

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

            setCateName(data.name);

            console.log("Cate Name: ", cateName);
            
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
            console.log('dataCate',data);
            setDataSourceCate(data);
    };


    useEffect(() => {
        setLoading(true);
        findOneProduct(id);
        getCategory();
        findOneCategory(productUpdate.categoryId);
        setLoading(false);
    },[id, productUpdate.categoryId])


    const updateProduct = async (idProduct) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const data = await fetch('http://localhost:3000/product/' + idProduct,
         {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify ({ 
                'name': name,
                'price': parseInt(price),
                'description': description,
                'count': parseInt(count),
                'urlImg': urlImg,
                'categoryId': parseInt(categoryId)
            }),
        })
            .then(res => res.json());
            console.log(data);
            // window.location.href = "http://localhost:5173/admin/admin/product";
    };   

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const handleFileChange = (event) => {
        if (event.target.files) {
        setUrlImg(event.target.files[0].name);
        }
    };
    console.log('img', urlImg);    

    const Context = React.createContext({
        name: name,
      });

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {   
        api[type]({
            message: `Successful`,
            description: <Context.Consumer>{({ name }) => `Updated ${name} products!`}</Context.Consumer>,
        });
    };
    
    const contextValue = useMemo(
      () => ({
        name: 'Ant Design',
      }),
      [],
    );

    const handleClick = (id) => {
        updateProduct(id);
        openNotificationWithIcon('success');
        
        setTimeout("location.href = 'http://localhost:5173/admin/admin/product';",900);
    }


    return (
        // <Space size={20} direction="vertical">
            
        //     <div>
        //         <Typography.Title level={4}>Products</Typography.Title>
        //         <div className="App">
        //             <div className="infomation">
        //                 <label>Name:</label>
        //                 <input type="text"
        //                         defaultValue={productUpdate.name}
        //                         onChange={(event) => {
        //                         setName(event.target.value);
        //                     }} 
        //                 />

        //                 <label>Price:</label>
        //                 <input type="number"
        //                         defaultValue={productUpdate.price}
        //                         onChange={(event) => {
        //                         setPrice(event.target.value);
        //                     }} 
        //                 />

        //                 <label>Description:</label>
        //                 <input type="text"
        //                         defaultValue={productUpdate.description}
        //                         onChange={(event) => {
        //                         setDescription(event.target.value);
        //                     }} 
        //                 />

        //                 <label>Count:</label>
        //                 <input type="number"
        //                         defaultValue={productUpdate.count}
        //                         onChange={(event) => {
        //                         setCount(event.target.value);
        //                     }} 
        //                 />

        //                 <label>Image:</label>
        //                 <input type="text"
        //                         defaultValue={productUpdate.urlImg}
        //                         onChange={(event) => {
        //                         setUrlImg(event.target.value);
        //                     }} 
        //                 />

        //                 <label>Category:</label>
        //                 <select 
        //                         onChange={(event) => {
        //                         setCategoryId(event.target.value);
        //                         }}
        //                 >
        //                     {dataSourceCate.map((dataCate, index)=>
        //                         <option value={dataCate.id} id="idCate" key={index}>{dataCate.name}</option>
        //                     )}
                            
        //                 </select>
        //                 <button type="button" className="btn btn-primary" onClick={() => updateProduct(id)}> Update Product </button>
        //             </div>
        //         </div>
        //     </div>
        // </Space>

    <Space size={20} direction="vertical">
        <div value={contextValue}>
            {contextHolder}
            <h4 className='title-page'>Update Product</h4>
            <Form className='form-admin'>
        
                <Form.Item label="Name"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <input type="text"
                                defaultValue={productUpdate.name}
                                style={{borderRadius:10}}
                                onChange={(event) => {
                                setName(event.target.value);
                            }} 
                        />
                </Form.Item>

                <Form.Item label="Price"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <input type="number"
                                defaultValue={productUpdate.price}
                                style={{borderRadius:10}}
                                onChange={(event) => {
                                setPrice(event.target.value);
                            }} 
                        />
                </Form.Item>

                <Form.Item label="Description"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <textarea rows={4}
                                type="text"
                                defaultValue={productUpdate.description}
                                style={{borderRadius:10}}
                                onChange={(event) => {
                                setDescription(event.target.value);
                            }} />
                </Form.Item>

                <Form.Item label="Count"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <input type="text"
                                defaultValue={productUpdate.count}
                                style={{borderRadius:10}}
                                onChange={(event) => {
                                setCount(event.target.value);
                            }} 
                        />
                </Form.Item>

                <Form.Item label="Image"
                            rules={[
                                {required: true,},
                            ]}
                >
                        <input type="file"
                                id="file"
                                onChange={handleFileChange} 
                        />
                        <img height={60} width={60} src={productUpdate.urlImg}/>
                </Form.Item>

                <Form.Item name="categoryId"
                            label="Category"
                            rules={[
                                {required: true,},
                            ]}
                >       

                    <select onChange={(event) => {
                            setCategoryId(event.target.value);
                            }}
                    >  
                            <option>{cateName}</option>
                        {dataSourceCate.map((dataCate, index)=>
                            <option value={dataCate.id} id="idCate" key={index}>{dataCate.name}</option>
                        )}                                  
                    </select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 2,
                    }}
                >
                    <Button type="default" htmlType="button" 
                            style={{width:120}} onClick={() => handleClick(id)}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
        
   </Space>
    )
}

export default UpdateProduct;