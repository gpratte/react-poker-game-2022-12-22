import {useContext, useEffect, useState} from "react";
import {AddNotificationContext} from "../../league/components/League";
import {getGame} from "../../clients/gameClient";

function useGame() {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const {newNotification} = useContext(AddNotificationContext);

  useEffect(() => {
    console.log('useGame.useEffect')
    async function init() {
      try {
        const gameData = await getGame(game.id);
        setIsLoading(false);
        setGame(gameData);
      } catch (error) {
        newNotification(error);
      }
    }
    init();
  }, [])

  return {
    game,
    isLoading
  };
}

export default useGame;