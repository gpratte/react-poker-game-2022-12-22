import '../style/league.css'
import useNotifications from "../hooks/useNotifications";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {createContext} from "react";
import {Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import ErrorNotification from "./ErrorNotification";
import Notifications from "./Notifications";
import Footer from "./Footer";
import Game from "../../game/components/Game";
import Home from "../../home/components/Home";
import Loading from "../../common/components/Loading";

export const NotificationContext = createContext();

function League() {
  const {
    newNotification,
    notification,
    notifications,
    showNotifications,
    closeNotification,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel,
    isGlobalLoading,
    setIsGlobalLoading
  } = useNotifications(30000);

  return (
    <NotificationContext.Provider value={{newNotification, setIsGlobalLoading}}>
      <div>
        <Loading isLoading={isGlobalLoading}/>
        <Navigation notifications={notifications} showNotifications={showNotificationsPanel}/>
        <Container className="main-view">
          <Row className="justify-content-center text-center">
            <Col>
              <ErrorNotification notification={notification}
                                 deleteNotification={deleteNotification}
                                 closeNotification={closeNotification}
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
              <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/home/*" element={<Home />} />
                <Route path="/current-game" element={<Game />} />
              </Routes>
            </Col>
          </Row>
          <Row className="justify-content-center text-center">
            <Col>
              <Footer/>
            </Col>
          </Row>
        </Container>
      </div>
    </NotificationContext.Provider>
  )
}

export default League;