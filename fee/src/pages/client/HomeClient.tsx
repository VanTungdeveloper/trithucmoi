import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";



function HomeClient() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {

    async function loginUser() {
      const token= JSON.parse(localStorage.getItem('token')|| null);
      return fetch('http://localhost:3000/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(
          data => data.json()
          )
     }
         loginUser().then(items => {
          // setData(items)
          console.log(data)
      })
   
  }, [data])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
        <span className="h3 fw-bold mb-0 " style={{ color: "#FF0000" }}>
                  Food Love
                </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#categories">Categories</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar>
            <button onClick={logout}>Log out</button>
          </Navbar>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to Our Food Website!</h1>
            <p>Discover delicious recipes and more.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Featured Recipes</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Recipe 1</Card.Title>
                <Card.Text>This is a short description of Recipe 1.</Card.Text>
                <Button variant="primary">View Recipe</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Recipe 2</Card.Title>
                <Card.Text>This is a short description of Recipe 2.</Card.Text>
                <Button variant="primary">View Recipe</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Recipe 3</Card.Title>
                <Card.Text>This is a short description of Recipe 3.</Card.Text>
                <Button variant="primary">View Recipe</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeClient;
