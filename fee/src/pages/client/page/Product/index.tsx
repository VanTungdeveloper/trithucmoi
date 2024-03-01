import { Button, Card, Carousel, Image, Layout, List, Pagination } from "antd";
import Img from "../../../../assets/-Pngtree-healthy food_3776802 1 (2).png";
// import Img1 from "../../../assets/istockphoto-1191080960-612x612.jpg";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { getCategory, getProduct } from "../../../../api/index.js";
import { CartProvider, useCart } from "react-use-cart";
import ItemCard from "../Cart/Itemcard.jsx";
import ClientHeader from "../../components/ClientHeader/index.jsx";
import ClientFooter from "../../components/ClientFooter/index.jsx";

function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div>
        <div
          className=""
          style={{ height: 220, backgroundColor: "#FDFFA3", display: "flex" }}
        >
          <div className="" style={{ width: "30%", height: "100%" }}>
            <Image
              style={{ margin: "10px 0 0 30px ", overflow: "hidden" }}
              width={234}
              src={Img}
              preview={false}
            />
          </div>
          <div className="" style={{ width: "70%" }}>
            <h3 style={{ margin: "20px 0", paddingLeft: "90px" }}>
              Find your desired dish instantly
            </h3>
            <Search
              placeholder="Search ..."
              allowClear
              style={{ width: 500, marginLeft: 30 }}
            />
          </div>
        </div>

        <Layout className="layout" style={{ padding: 20 }}>
          <List
            grid={{ gutter: 16, column: categories.length }}
            dataSource={categories}
            style={{ justifyContent: "center", display: "flex" }}
            renderItem={(item) => (
              <List.Item style={{ width: "100%" }}>
                <Card
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "#F9ECD4",
                  }}
                >
                  <Image width={70} src={Img} preview={false} />
                  <p
                    style={{
                      marginTop: 10,
                      marginBottom: 0,
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </p>
                </Card>
              </List.Item>
            )}
          />
          
          <CartProvider>
            < ItemCard />
          </CartProvider>

          <Pagination
            style={{ textAlign: "center" }}
            defaultCurrent={1}
            total={50}
          />
        </Layout>
      </div>
    </>
  );
}

export default ProductPage;
