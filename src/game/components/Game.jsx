import './game.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Badge, Nav, NavDropdown, Toast} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {isEmpty} from 'lodash';

function TopNavBar(props) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="text">
          <i className="nav-home fa-solid fa-house"></i>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title={<span><i className="nav-home fa-regular fa-user"></i></span>}>
              <NavDropdown.Item href="#action/3.1">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<span><i className="nav-home fa-solid fa-bars"></i></span>}
                         id="collasible-bars-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Notifications
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text>
              {props.notificationCount === 0 &&
                <>
                  <i className="nav-home fa-solid fa-bell-slash"></i>
                </>
              }
              {props.notificationCount > 0 &&
                <>
                  <i className="nav-home fa-solid fa-bell"></i>
                  <Badge bg={"warning"}>{props.notificationCount}</Badge>
                </>
              }
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function ErrorNotification(props) {
  return (
    <Toast show={!isEmpty(props.notification)} onClose={() => props.clearNotification(props.notification.id)}>
      <Toast.Header>
        <strong className="me-auto">{props.notification.type}</strong>
      </Toast.Header>
      <Toast.Body>{props.notification.message}</Toast.Body>
    </Toast>
  )
}

function Game() {
  // state for showing/hiding the toast
  const [notification, setNotification] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0)

  const clearNotification = (id) => {
    const newNotifications = notifications.filter(notification => notification.id !== id)
    setNotification({});
    setNotifications(newNotifications);
    setNotificationCount(newNotifications.length);
  }

  // toggle the toast
  useEffect(() => {
    let interval = setInterval(() => {
      const notify = {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh ' + Date.now()
      }
      setNotification(notify);
      const newNotifications = [...notifications];
      newNotifications.push(notify);
      setNotifications(newNotifications)
      setNotificationCount(newNotifications.length);
    }, 7000);
    return () => clearInterval(interval);
  })


  return (
    <>
      <TopNavBar notificationCount={notificationCount}/>
      <Container className="main-view">
        <Row className="justify-content-center text-center">
          <Col>
            <ErrorNotification notification={notification} clearNotification={clearNotification}/>
            Main page
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Game;
