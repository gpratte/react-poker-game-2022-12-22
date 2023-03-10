import {useContext, useState} from "react";
import {GameContext} from "../components/Game";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";

function useEditPlayer(gamePlayer) {

  const {game, refreshGame} = useContext(GameContext);
  const {newNotification} = useContext(NotificationContext);

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [accordionBodyKey, setAccordionBodyKey] = useState(Math.random());

  const [buyInChecked, setBuyInChecked] = useState(!!gamePlayer.boughtIn);
  const [rebuyChecked, setRebuyChecked] = useState(!!gamePlayer.rebought);
  const [annualTocChecked, setAnnualTocChecked] = useState(!!gamePlayer.annualTocParticipant);
  const [qTocChecked, setQTocChecked] = useState(!!gamePlayer.quarterlyTocParticipant);
  const [alertChecked, setAlertChecked] = useState(!!gamePlayer.roundUpdates);
  const [place, setPlace] = useState(gamePlayer.place);
  const [chop, setChop] = useState(gamePlayer.chop);

  const resetToOriginalState = (gamePlayer) => {
    setBuyInChecked(!!gamePlayer.boughtIn);
    setRebuyChecked(!!gamePlayer.rebought);
    setAnnualTocChecked(!!gamePlayer.annualTocParticipant);
    setQTocChecked(!!gamePlayer.quarterlyTocParticipant);
    setAlertChecked(!!gamePlayer.roundUpdates);
    setPlace(gamePlayer.place);
    setChop(gamePlayer.chop);
  }

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
    accordionOpen, setAccordionOpen,
    accordionBodyKey, setAccordionBodyKey,
    buyInChecked, setBuyInChecked,
    rebuyChecked, setRebuyChecked,
    annualTocChecked, setAnnualTocChecked,
    qTocChecked, setQTocChecked,
    alertChecked, setAlertChecked,
    place, setPlace,
    chop, setChop,
    deleteGamePlayer,
    updateGamePlayer,
    resetToOriginalState
  };
}

export default useEditPlayer;