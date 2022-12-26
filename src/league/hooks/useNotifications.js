import {useEffect, useState} from "react";

function useNotifications(delay = 2500) {
  const [notification, setNotification] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const newNotification = (notify) => {
    const newNotifications = [...notifications];
    newNotifications.push(notify);
    setNotifications(newNotifications)
    if (!showNotifications) {
      setNotification(notify);
      // Auto close after x seconds
    }
  }

  const deleteNotification = (id) => {
    const notificationToDelete = notifications.map((notification) => notification.id === id);
    if (notificationToDelete) {
      const newNotifications = notifications.filter(notification => notification.id !== id)
      setNotification({});
      setNotifications(newNotifications);
    }
  }

  const closeNotification = (id) => {
    const notificationToClose = notifications.map((notification) => notification.id === id);
    if (notificationToClose) {
      setNotification({});
    }
  }

  const deleteAllNotifications = () => {
    setNotification({});
    setNotifications([]);
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
        message: 'uh oh tick' + Date.now()
      }
      newNotification(notify);
    }, delay);
    return () => clearInterval(interval);
  })

  return {
    newNotification,
    notification,
    notifications,
    showNotifications,
    closeNotification,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel
  };
}

export default useNotifications;