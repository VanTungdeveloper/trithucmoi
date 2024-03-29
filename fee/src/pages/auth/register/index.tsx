import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

interface Props {
  setToken: any;
}

async function loginUser(credentials: any) {
  return fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [dataSource, setDataSource] = useState([]);

  const [errorMessage, setErrorMessage] = useState("")

  const validEmail = dataSource.find((i) => i.email === username);

  const handleSubmit = async (e: any) => {
    if (password !== passwordConfirm) {
      setErrorMessage("Mật khẩu không khớp");
    } else if(password.length !== 8){
      setErrorMessage("Mật khẩu phải dài trên 8 kí tự");
    }else if(validEmail){
      setErrorMessage("Email đã tồn tại")
    }else {
      const req = {
        email: username,
        password,
      };
      
      e.preventDefault();
      const res = await loginUser(req);
      localStorage.setItem('user', JSON.stringify(res));
      window.location.href = '/home'
    }
  };


  const getUser = async () => {
    const data = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    setDataSource(data);
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0 " style={{ color: "#FF0000" }}>
                  Food Love
                </span>
              </div>

              <h3
                className="fw-normal my-4 pb-3"
                style={{
                  letterSpacing: "1px",
                  color: "#FF5B00",
                  fontWeight: "700",
                }}
              >
                Đăng ký
              </h3>

              <label htmlFor="" style={{ fontSize: "18px" }}>
                Email
              </label>

              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                type="email"
                size="lg"
                required
                onChange={(e) => setUserName(e.target.value)}
              />

              <label htmlFor="" style={{ fontSize: "18px" }}>
                Mật khẩu
              </label>

              <MDBInput
                wrapperClass="mb-2"
                id="formControlLg"
                type="password"
                size="lg"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="" style={{ fontSize: "18px" }}>
                Nhập lại mật khẩu!
              </label>

              <MDBInput
                wrapperClass="mb-2"
                id="formControlLg"
                type="password"
                size="lg"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />

              <p style={{color: "red"}}>{errorMessage}</p>
              {/* <a className="small text-muted" href="#!">
                Quên mật khẩu?
              </a> */}

              <MDBBtn
                className="mb-4 px-5 mt-4"
                color="dark"
                size="lg"
                onClick={handleSubmit}
              >
                Đăng nhập
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>{" "}
              </p>
            </MDBCardBody>
          </MDBCol>

          <MDBCol md="6">
            <MDBCardImage
              src="https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0"
              alt="login form"
              className="rounded-start w-100 h-100"
              style={{ borderRadius: "5px" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
