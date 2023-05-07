import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';


function NavbarComponent({ currentUsername, setCurrentUsername, setCurrentUserEmail,
  setCurrentUserId, setCurrentToken, setCart }) {
  let navigate = useNavigate();

  let handleLogout = async () => {
    try {
      
      localStorage.removeItem("store2-user")
      
      // set states 
      setCurrentUsername(null)
      setCurrentUserEmail(null)
      setCurrentUserId(null)
      setCurrentToken(null)
      setCart(null)

      console.log("logout successful")
      navigate("/")

    } catch (err){
      console.log("error in logout: ", err)
    }
  }

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

              { currentUsername && <Nav.Link href="/cart">Cart</Nav.Link> }
              { currentUsername && <Navbar.Text> Signed in as: { currentUsername } </Navbar.Text> }
              {currentUsername && <Button 
                onClick={handleLogout} 
                variant="light" 
                style={{ marginLeft: "15px" }} >
                Logout
              </Button> }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
