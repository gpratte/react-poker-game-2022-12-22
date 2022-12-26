import {useContext, useEffect, useState} from "react";
import zeroPlayersData from '../data/zero-players.js'
import {AddNotificationContext} from "../../league/components/League";

function useGame() {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const {newNotification} = useContext(AddNotificationContext);
  const getGame = async (id) => {
    await delay(3000);
    const notify = {
      id: Math.random(),
      type: 'Error',
      message: 'uh oh could not get game' + Date.now()
    }
    newNotification(notify);
    await delay(3000);
    setGame(zeroPlayersData);
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      await delay(3000);
      setIsLoading(false);
      getGame();
    }
    delayFunc();
  }, [])

  return {
    game,
    isLoading
  };
}

export default useGame;