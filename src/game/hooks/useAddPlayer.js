import {useContext, useEffect, useState} from "react";
import playerClient from "../../clients/playerClient";
import seasonClient from "../../clients/seasonClient";
import {GameContext} from "../components/Game";
import {AddNotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";

function useAddPlayer() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaguePlayers, setLeaguePlayers] = useState([])
  const [seasonPlayers, setSeasonPlayers] = useState([])
  const [activeTabKey, setActiveTabKey] = useState('league-player');

  const {game, refreshGame, setShowAddPlayer} = useContext(GameContext);
  const {newNotification} = useContext(AddNotificationContext);

  useEffect(() => {
    console.log('useAddPlayer.useEffect entered')
    setIsLoading(false);
    async function init() {
      try {
        setLeaguePlayers(await playerClient.getPlayers(game.id));
      } catch (error) {
        newNotification(error);
      }
      try {
        const season = await seasonClient.getSeason(game.seasonId);
        setSeasonPlayers(season.players);
      } catch (error) {
        newNotification(error);
      }
    }
    init();
  }, [])

  const addGamePlayer = async (e) => {
    e.preventDefault();
    if (activeTabKey === 'league-player') {
      if (e.target.elements.playerId.value === '0') {
        alert("Select a player");
        return;
      }
      setShowAddPlayer(false);
      try {
        await gameClient.addPlayer(e.target.elements.playerId.value,
          e.target.elements.buyInId.checked,
          e.target.elements.tocId.checked,
          e.target.elements.qtocId.checked);
      } catch (error) {
        newNotification(error);
      }
    } else {
      if (!e.target.elements.firstNameId.value && !e.target.elements.lastNameId.value) {
        alert("Enter a name");
        return;
      }
      setShowAddPlayer(false);
      try {
        await gameClient.addPlayer(e.target.elements.firstNameId.value,
          e.target.elements.lastNameId.value,
          e.target.elements.emailId.value,
          e.target.elements.buyInId.checked,
          e.target.elements.tocId.checked,
          e.target.elements.qtocId.checked);
      } catch (error) {
        newNotification(error);
      }
    }
    refreshGame();
  }


  return {
    addGamePlayer,
    leaguePlayers,
    seasonPlayers,
    activeTabKey,
    setActiveTabKey,
    isLoading
  };
}

export default useAddPlayer;