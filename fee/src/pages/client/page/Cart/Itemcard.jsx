import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Image, List, notification } from "antd";
import { getCategory, getProduct } from "../../../../api/index.ts";
import { useCart } from "react-use-cart";
import HeaderClient from "../../components/ClientHeader/index.jsx"


const Itemcard = ({filteredList, id, name, urlImg, price, countItems}) => {
    const [categories, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [addProduct, setAddProduct] = useState({});
    const [addToCartProducts, setaddToCartProducts] = useState("");
    // const [productAdded, setProductAdded] = useState({});
    // let countIT = 0;

    const {
        addItem,
    } = useCart();

    const callApi = async () => {
        const dataCategories = await getCategory();
        const dataProducts = await getProduct();
        setCategory(dataCategories);
        setProducts(dataProducts);  
            
    };

    useEffect(() => {
        setLoading(false);
        if(filteredList != null) {
            setProducts(Object.keys(filteredList));
        }   
        console.log("Items", countItems);

        callApi();

        setLoading(true);
    }, [filteredList, countItems]);

    const Context = React.createContext({
        name: addToCartProducts,
      });
    
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {   
        api[type]({
            message: `Successfully`,
            description: <Context.Consumer>{({ name }) => `Product added to cart!`}</Context.Consumer>,
        });
    };
    
    const contextValue = useMemo(
      () => ({
        name: 'Ant Design',
      }),
      [],
    );

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
            
            // setProductAdded(data);
            console.log("Data: ", data);
            addItem(data);
    };


    const handleClick = (id) => {
        findOneProduct(id);
        // countIT++;
        // console.log("Items", countIT);
        openNotificationWithIcon('success');
    }

    return (
        <div>
            {/* <HeaderClient countIt = {countIT} /> */}

            <Card>                 
                <div className="item-product" value={contextValue}
                    style={{ height: "50%", width: "100%",
                            display: "flex", justifyContent: "center",
                            alignItems: " center",
                            }}
                >
                     {contextHolder}      
                    <Image style={{ height: 165, width: 250, borderRadius: 5 }}
                            src={urlImg} preview={false}
                    />
                </div>
                   
                    <h5 style={{ marginTop: 10 }}>{name}</h5>
                    <p>Giá: {price}đ</p>
                    <div style={{ display: "flex" }}>
                        <Button danger style={{ marginRight: 10 }} onClick={() => {handleClick(id)}} >
                            Thêm vào giỏ{" "} 
                        </Button>
                    </div>
        </Card>    
        </div>
           
    )
}

export default Itemcard;