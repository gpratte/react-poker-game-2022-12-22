import {useContext, useEffect, useState} from "react";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";

function useGame() {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const {newNotification} = useContext(NotificationContext);

  useEffect(() => {
    console.log('useGame.useEffect entered')

    async function init() {
      try {
        setIsLoading(true);
        const gameData = await gameClient.getGame(game.id);
        // Change the number of paid players value just to see that things changed
        gameData.numPaidPlayers = Math.random();
        setGame(gameData);
      } catch (error) {
        newNotification(error);
      } finally {
        setIsLoading(false);
      }
    }

    init();
    // eslint-disable-next-line
  }, [])

  const refreshGame = async () => {
    console.log('refresh game')
    try {
      setIsLoading(true);
      const gameData = await gameClient.getGame(game.id);
      gameData.numPaidPlayers = Math.random();
      setGame(gameData);
    } catch (error) {
      newNotification(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    game,
    refreshGame,
    isLoading
  };
}

export default useGame;