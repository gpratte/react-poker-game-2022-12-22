import {useContext, useEffect, useState} from "react";
import {AddNotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";

function useGame() {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const {newNotification} = useContext(AddNotificationContext);

  const refreshGame = async () => {
    console.log('refresh game')
    try {
      const gameData = await gameClient.getGame(game.id);
      gameData.numPaidPlayers = Math.random();
      setGame(gameData);
    } catch (error) {
      newNotification(error);
    }
  }

  useEffect(() => {
    console.log('useGame.useEffect entered')
    async function init() {
      try {
        const gameData = await gameClient.getGame(game.id);
        setIsLoading(false);
        gameData.numPaidPlayers = Math.random();
        setGame(gameData);
      } catch (error) {
        newNotification(error);
      }
    }
    init();
  }, [])

  return {
    game,
    refreshGame,
    isLoading
  };
}

export default useGame;