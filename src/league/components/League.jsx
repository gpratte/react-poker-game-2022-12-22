import '../style/league.css'
import useNotifications from "../hooks/useNotifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Navigation from "./Navigation";
import ErrorNotification from "./ErrorNotification";
import Notifications from "./Notifications";
function League() {
  const {
    notification,
    notifications,
    showNotifications,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel
  } = useNotifications(5000);

  return (
    <>
      <Navigation notifications={notifications} showNotifications={showNotificationsPanel}/>
      <Container className="main-view">
        <Row className="justify-content-center text-center">
          <Col>
            <ErrorNotification notification={notification}
                               deleteNotification={deleteNotification}
            />
            <Notifications show={showNotifications}
                           hide={hideNotificationsPanel}
                           deleteNotification={deleteNotification}
                           deleteAllNotifications={deleteAllNotifications}
                           notifications={notifications}/>
            Main page
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default League;