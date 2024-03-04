import "./index.css";
 
function App() {

  const handleClick = () => {
    window.location.href = "http://localhost:5173/menu";
  }
  return (
    <div className="home-main">
      <main className="menuSection">
      <section className="imageSlideshow">
      <div className="foodItem">
        <div className="foodCatalog">
          <div className="cataContainer">
            <h1 className="title-main">Thế giới ẩm thực dành cho bạn</h1>
          </div>
        </div>
        <div className="pContainer">
          <p className="">
            Nơi cung cấp đa dạng các món đồ ăn ngon,
          </p>
          <p
          >{`từ đồ ăn nhanh đến món ngon miệng, để bạn có thể thưởng thức mỗi ngày. `}</p>
          <p>
            Đặt hàng ngay hôm nay để trải nghiệm sự tiện lợi và ngon miệng!
          </p>
        </div>
        <div className="orderFoodSection">
          <button className="order-now btn btn-danger" onClick={handleClick}>
            Đặt hàng ngay
          </button>
        </div>
      </div>
    </section>
      </main>
    </div>
  );
}

export default App;