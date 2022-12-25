import './game.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Badge, Button, ListGroup, Nav, NavDropdown, Offcanvas, Toast} from "react-bootstrap";
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
                  <span style={{cursor: "pointer"}} onClick={() => props.showNotifications()}>
                    <i className="nav-home fa-solid fa-bell"></i>
                    <Badge bg={"warning"}>{props.notificationCount}</Badge>
                  </span>
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
    <Toast show={!isEmpty(props.notification)} onClose={() => props.deleteNotification(props.notification.id)}>
      <Toast.Header>
        <strong className="me-auto">{props.notification.type}</strong>
      </Toast.Header>
      <Toast.Body>{props.notification.message}</Toast.Body>
    </Toast>
  )
}

function Notifications(props) {
  let notifications;
  if (props.notifications && props.notifications.length > 0) {
    // Show the newest (the last in the list) first
    notifications = [...props.notifications].reverse();
  } else {
    notifications = []
  }
  return (
    <Offcanvas show={props.show} onHide={props.hide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body key={Date.now().valueOf()}>
        <>
          <Button variant={"primary"}
                  disabled={notifications.length === 0}
                  onClick={() => props.deleteAllNotifications()}>
            Clear all
          </Button>
          <ListGroup>
            {notifications.map(notification => {
              return <ListGroup.Item key={notification.id}>
                <Button variant={"link"} onClick={() => props.deleteNotification(notification.id)}>
                  Delete
                </Button>
                {
                  notification.message
                }
              </ListGroup.Item>
            })}
          </ListGroup>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

function Game() {
  // state for showing/hiding the toast
  const [notification, setNotification] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false);

  const deleteNotification = (id) => {
    const newNotifications = notifications.filter(notification => notification.id !== id)
    setNotification({});
    setNotifications(newNotifications);
    setNotificationCount(newNotifications.length);
  }

  const deleteAllNotifications = () => {
    setNotification({});
    setNotifications([]);
    setNotificationCount(0);
  }

  const showNotificationsPanel = () => {
    setNotification({});
    setShowNotifications(true);
  }
  const hideNotificationsPanel = () => {
    setShowNotifications(false);
  }

  // toggle the toast
  useEffect(() => {
    let interval = setInterval(() => {
      const notify = {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh ' + Date.now()
      }
      const newNotifications = [...notifications];
      newNotifications.push(notify);
      setNotifications(newNotifications)
      setNotificationCount(newNotifications.length);
      if (!showNotifications) {
        setNotification(notify);
      }
    }, 2500);
    return () => clearInterval(interval);
  })


  return (
    <>
      <TopNavBar notificationCount={notificationCount} showNotifications={showNotificationsPanel}/>
      <Container className="main-view">
        <Row className="justify-content-center text-center">
          <Col>
            <ErrorNotification notification={notification}
                               deleteNotification={deleteNotification}
            />
            Main page
            <Notifications show={showNotifications}
                           hide={hideNotificationsPanel}
                           deleteNotification={deleteNotification}
                           deleteAllNotifications={deleteAllNotifications}
                           notifications={notifications}/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Game;
