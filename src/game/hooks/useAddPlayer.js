import {useContext, useEffect, useState} from "react";
import seasonClient from "../../clients/seasonClient";
import {GameContext} from "../components/Game";
import {NotificationContext} from "../../league/components/League";
import gameClient from "../../clients/gameClient";
import playerClient from "../../clients/playerClient";

function useAddPlayer() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaguePlayers, setLeaguePlayers] = useState([])
  const [seasonPlayers, setSeasonPlayers] = useState([])
  const [activeTabKey, setActiveTabKey] = useState('league-player');

  const {game, refreshGame, setShowAddPlayer} = useContext(GameContext);
  const {newNotification} = useContext(NotificationContext);

  useEffect(() => {
    async function init() {
      try {
        const leaguePlayers = await playerClient.getPlayers(game.id);
        // No need to use a function for the setLeaguePlayers but doing it just to show
        // that the argument is the current state of leaguePlayers.
        setLeaguePlayers((currentLeaguePlayers) => {
          // console.log('using a function for the set league players, argument is ' +
          //   JSON.stringify(currentLeaguePlayers))
          return leaguePlayers
        });
      } catch (error) {
        newNotification(error);
      }
      try {
        const season = await seasonClient.getSeason(game.seasonId);
        setSeasonPlayers(season.players);
      } catch (error) {
        newNotification(error);
      }
      setIsLoading(false);
    }

    init();
    // eslint-disable-next-line
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
        await gameClient.addPlayer(game.id, {
          id: e.target.elements.playerId.value,
          buyin: e.target.elements.buyInId.checked,
          annualToc: e.target.elements.tocId.checked,
          qToc: e.target.elements.qtocId.checked
        });
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