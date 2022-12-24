import './game.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Nav, NavDropdown, Toast} from "react-bootstrap";
import React, {useEffect, useState} from "react";

function TopNavBar() {
  return (
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
  )
}

function ErrorNotification(props) {
    return (
      <Toast show={props.show} onClose={() => props.setShow(!props.show)}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>error message</Toast.Body>
      </Toast>
    )
}

function Game() {
  // state for showing/hiding the toast
  const [showErrNot, setShowErrNot] = useState(false);

  // toggle the toast
  useEffect(() => {
    let interval = setInterval(() => {
      setShowErrNot(!showErrNot);
    }, 5000);
    return () => clearInterval(interval);
  })


  return (
    <>
      <TopNavBar />
      <Container className="main-view">
        <Row className="justify-content-center text-center">
          <Col>
            <ErrorNotification show={showErrNot} setShow={setShowErrNot}/>
            Main page
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Game;
