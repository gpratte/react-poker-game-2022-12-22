import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './game.css';
import {Nav, NavDropdown} from "react-bootstrap";
function Game() {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="text">
            <i className="nav-home fa-solid fa-house"></i>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={<span><i className="nav-home fa-regular fa-user"></i></span>} >
                <NavDropdown.Item href="#action/3.1">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={<span><i className="nav-home fa-solid fa-bars"></i></span>} id="collasible-bars-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Notifications
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="main-view">
        <Row className="justify-content-center text-center gp">
          <Col>Main page</Col>
        </Row>
      </Container>
    </div>
  )
}

export default Game;
