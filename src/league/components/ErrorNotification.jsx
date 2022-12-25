import {Toast} from "react-bootstrap";
import {isEmpty} from "lodash";
import React from "react";

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

export default ErrorNotification;