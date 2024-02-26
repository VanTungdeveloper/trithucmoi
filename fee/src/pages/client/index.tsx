import { Image } from 'antd';
import Img from '../../assets/background.jpg';



function HomeClient() {
  // const [data, setData] = useState([]);
  // const logout = () => {
  //   localStorage.clear();
  //   window.location.href = "/login";
  // };

  // const callApi = async () => {
  //   // const token = JSON.parse(localStorage.getItem("token"));
  //   const dataApi: any = await fetch("http://localhost:3000/product", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((data) => data.json());

  //   setData(dataApi);
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  return (
    <div style={{height: "2000px"}}>
      <Image
        style={{width: "100%"}}
        width={1700}
        src={Img}
        preview={false}
      />
    </div>
  );
}

export default HomeClient;
