import { Button, Card, Carousel, Image, Layout, List, Pagination } from "antd";
import Img from "../../../assets/-Pngtree-healthy food_3776802 1 (2).png";
import Img1 from "../../../assets/istockphoto-1191080960-612x612.jpg";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { getCategory, getProduct } from "../../../api";

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
          <h3 style={{ margin: "20px 0" }}>
            Tìm Kiếm Đồ Ăn Mà Bạn Mong Muốn Ngay Lập Tức
          </h3>
          <Search
            placeholder="Tìm kiếm ngay"
            allowClear
            style={{ width: 500, marginLeft: 50 }}
          />
        </div>
      </div>

      {/* <Layout>
        <Carousel autoplay style={{ minWidth: 1684, height: 300 }}>
          <div>
            <Image
              style={{ width: 1684, height: 300 }}
              src={Img1}
              preview={false}
            />
          </div>
          <div>
            <Image
              style={{ width: 1684, height: 300 }}
              src={Img1}
              preview={false}
            />
          </div>
          <div>
            <Image
              style={{ width: 1684, height: 300 }}
              src={Img1}
              preview={false}
            />
          </div>
          <div>
            <Image
              style={{ width: 1684, height: 300 }}
              src={Img1}
              preview={false}
            />
          </div>
        </Carousel>
      </Layout> */}

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

        <List
          grid={{ gutter: 24, column: 5 }}
          dataSource={products}
          style={{ margin: 20, padding: 20 }}
          renderItem={(item) => (
            <List.Item>
              <Card>
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
                  <Button danger style={{ marginRight: 10 }}>
                    Thêm vào giỏ{" "}
                  </Button>
                  <Button type="primary" danger>
                    Mua ngay
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />

        <Pagination
          style={{ textAlign: "center" }}
          defaultCurrent={1}
          total={50}
        />
      </Layout>
    </>
  );
}

export default ProductPage;
