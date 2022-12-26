import '../style/league.css'
import useNotifications from "../hooks/useNotifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import {Route} from "react-router-dom";
import Navigation from "./Navigation";
import ErrorNotification from "./ErrorNotification";
import Notifications from "./Notifications";
import Footer from "./Footer";
import Game from "../../game/components/Game";
import Home from "../../home/components/Home";

function League() {
  const {
    newNotification,
    notification,
    notifications,
    showNotifications,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel
  } = useNotifications(30000);

  return (
    <div>
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
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/home'>
              <Home/>
            </Route>
            <Route exact path='/current-game'>
              <Game newNotification={newNotification}/>
            </Route>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col>
            <Footer/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default League;