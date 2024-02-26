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
import "./index.css";
import { useState } from "react";

interface Props {
  setToken: any
}

async function loginUser(credentials: any) {
  return fetch('http://localhost:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = ({setToken} :Props ) => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    const req = {
      email: username,
      password
    }
    e.preventDefault();
    const res = await loginUser(req);
    setToken(res.accessToken);
    window.location.href = '/home'
    
  }

  return (
    <MDBContainer className="my-5 wrapper">
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
                Đăng nhập
              </h3>

              <label htmlFor="" style={{ fontSize: "18px" }}>
                Email
              </label>

              <MDBInput
                wrapperClass="mb-4"
                id="formControlLg"
                name="email"
                type="email"
                size="lg"
                onChange={e => setUserName(e.target.value)}
              />

              <label htmlFor="" style={{ fontSize: "18px" }}>
                Password
              </label>
              <MDBInput
                wrapperClass="mb-2"
                id="formControlLg"
                name="password"
                type="password"
                size="lg"
                onChange={e => setPassword(e.target.value)}
              />

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
                Chưa có tài khoản? <Link to="/register"  >Đăng ký</Link>
              </p>
            </MDBCardBody>
          </MDBCol>

          <MDBCol md="6">
            <MDBCardImage
              src="https://cdn.pixabay.com/photo/2023/05/28/11/47/ai-generated-8023476_1280.jpg"
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

export default Login;
