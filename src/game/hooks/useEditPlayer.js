import {useContext, useEffect, useRef} from "react";
import {GameContext} from "../components/Game";
import {AddNotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";

function useEditPlayer() {

  const {game, refreshGame} = useContext(GameContext);
  const {newNotification} = useContext(AddNotificationContext);

  const deleteGamePlayer = async (gamePlayerId) => {
    try {
      await gameClient.addDeletePlayer(game.id, gamePlayerId);
    } catch (error) {
      newNotification(error);
    }
    refreshGame();
  }

  const updateGamePlayer = async (player) => {
    try {
      await gameClient.updatePlayer(game.id, player);
    } catch (error) {
      newNotification(error);
    }
    refreshGame();
  }

  return {
    deleteGamePlayer,
    updateGamePlayer
  };
}

export default useEditPlayer;