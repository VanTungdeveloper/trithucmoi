import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Image, List, notification } from "antd";
import { getCategory, getProduct } from "../../../../api/index.ts";
import { useCart } from "react-use-cart";
import Header from "../../components/ClientHeader/index.jsx"


const Itemcard = () => {
    const [categories, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        addItem,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    const callApi = async () => {
        const dataCategories = await getCategory();
        const dataProducts = await getProduct();
        setCategory(dataCategories);
        setProducts(dataProducts);
            
    };

    useEffect(() => {
        setLoading(false);
        callApi();
        setLoading(true);
    }, []);

    const [addToCartProducts, setaddToCartProducts] = useState("");

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

    const handleClick = (item) => {
        setaddToCartProducts(item.name);
        addItem(item, 1);
        openNotificationWithIcon('success');
    }

    return (
        <div>
            <div hidden>
                <Header totalItems={totalItems} />
                {/* <Cart {...props} /> */}
            </div>
            <div value={contextValue}>
                {contextHolder}
                <List
                grid={{ gutter: 24, column: 5 }}
                dataSource={products}
                style={{ margin: 20, padding: 20 }}
                renderItem={(item, index) => (
                    <List.Item>
                        <Card item={item} key={index}>
                            <div
                            className=""
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: " center",
                            }}
                            >
                            <Image
                                style={{ height: 150, width: 200, borderRadius: 5 }}
                                src={item.urlImg}
                                preview={false}
                            />
                            </div>
                            <h5 style={{ marginTop: 10 }}>{item.name}</h5>
                            <p>Giá: {item.price}đ</p>
                            <div className="" style={{ display: "flex" }}>
                            <Button danger style={{ marginRight: 10 }} onClick={() => {handleClick(item)}} >
                                Thêm vào giỏ{" "}
                            </Button>
                            
                            </div>
                        </Card>
                    </List.Item>

                )}
            />
            </div>
        </div>
        
        
    )
}

export default Itemcard;