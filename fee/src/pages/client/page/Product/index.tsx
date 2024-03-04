import { Button, Card, Image, Layout, List, Pagination } from "antd";
import Img from "../../../../assets/-Pngtree-healthy food_3776802 1 (2).png";
import Search from "antd/es/input/Search";
import { useEffect, useState, useMemo } from "react";
import { getCategory, getProduct } from "../../../../api/index.js";
import { CartProvider } from "react-use-cart";
import ItemCard from "../Cart/Itemcard.jsx";

function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

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

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
    return products;
    }
    return products.filter((item) => item.categoryId === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  const filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  function handleCategoryChange(idCate) {
      setSelectedCategory(idCate);
  }

  const [page, setPage] = useState(1);


  const handleChange = (e, p) => {
    // console.log(e, p);
    setPage(p);
  }

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
          
          <div className="nav-category" style={{ display: "flex", justifyContent: "center"}}>
            <Button className="btn btn-default"   
                  style={{ justifyContent: "center", display: "flex", height: "141px", 
                            margin: "0px 27px 15px 0px", backgroundColor: "#F9ECD4",
                            border:"1px solid #c6c6ec", width: "118px", alignSelf: "center" }}
                            onClick={() => {handleCategoryChange("")}} >
                {/* <Image style={{width: "70px"}} src={Img} preview={false} /> */}
                <span style={{paddingTop:"85px"}}> ALL PRODUCT </span>
                  
            </Button>
           
            <List
              grid={{ gutter: 16, column: categories.length }}
              dataSource={categories}
              style={{ justifyContent: "center", display: "flex" }}
              renderItem={(item) => (
                <button 
                        className="btn btn-default"
                        name="category-list"
                        id="category-list"
                        onClick={() => {handleCategoryChange(item.id)}}
                >

                  <List.Item style={{ width: "100%"}}>
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
                          textTransform: "uppercase",
                        }}
                      >
                        {item.name}
                      </p>
                    </Card>
                  </List.Item>
                </button>              
              )}
            />
          </div>
          
          
          
          <List className="list-item"
                  grid={{ gutter: 24, column: 5 }}
                  style={{ margin: 10, padding: 10 }}
                  dataSource={filteredList}
                  renderItem={(element, index) => (
                    <CartProvider>
                      <List.Item>
                        <ItemCard {...element} key={index} />
                      </List.Item>
                    </CartProvider> 
                  )}                
          />    
          
          <Pagination
            style={{ textAlign: "center" }}
            defaultCurrent={1}
            // total={totalItems}
            onChange={handleChange}
          />
        </Layout>
      </div>
    </>
  );
}

export default ProductPage;
