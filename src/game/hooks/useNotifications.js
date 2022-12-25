import {useEffect, useState} from "react";

function useNotifications(delay = 2500) {
  const [notification, setNotification] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const deleteNotification = (id) => {
    const newNotifications = notifications.filter(notification => notification.id !== id)
    setNotification({});
    setNotifications(newNotifications);
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
        message: 'uh oh ' + Date.now()
      }
      const newNotifications = [...notifications];
      newNotifications.push(notify);
      setNotifications(newNotifications)
      if (!showNotifications) {
        setNotification(notify);
      }
    }, delay);
    return () => clearInterval(interval);
  })

  return {
    notification,
    notifications,
    showNotifications,
    deleteNotification,
    deleteAllNotifications,
    showNotificationsPanel,
    hideNotificationsPanel
  };
}

export default useNotifications;