import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavbarComponent({ currentUsername, setCurrentUsername }) {
  let navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/all-products">Products</Nav.Link>
              { !currentUsername && <Nav.Link href="/register">Register</Nav.Link> }
              { !currentUsername && <Nav.Link href="/login">Login</Nav.Link> }
              { currentUsername && <Navbar.Text> Signed in as: { currentUsername } </Navbar.Text> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
