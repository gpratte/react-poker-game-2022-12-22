import {Button, Table} from "react-bootstrap";
import AddPlayer from "./AddPlayer";
import {useContext} from "react";
import {GameContext} from "./Game";
import EditPlayer from "./EditPlayer";

function GamePlayers() {

  const {game, showAddPlayer, setShowAddPlayer} = useContext(GameContext);

  const gamePlayers = game.players;
  //const isChop = this.isThereChop(gamePlayers);
  const isChop = false;
  const numPaidPlayers = game.numPaidPlayers;

  // TODO should the processing of the players be moved to a context or a util file?
  const renderGamePlayers = (gamePlayers, isChop) => {
    if (!gamePlayers) {
      return;
    }

    return gamePlayers.map((gamePlayer, index) => {
      const {
        id, boughtIn, rebought, annualTocParticipant,
        quarterlyTocParticipant, chop, tocPoints, tocChopPoints,
        qtocPoints, qtocChopPoints, place} = gamePlayer;
      let originalPoints;
      let points;
      if (tocChopPoints) {
        points = tocChopPoints;
        originalPoints = tocPoints;
      } else if (qtocChopPoints) {
        points = qtocChopPoints;
        originalPoints = qtocPoints;
      } else if (tocPoints) {
        points = tocPoints;
      } else if (qtocPoints) {
        points = qtocPoints;
      }
      return (
        <tr key={id}>
          <td>{place ? (place < 11 ? place : '') : ''}</td>
          <td>
            <EditPlayer key={gamePlayer.id} gamePlayer={gamePlayer} gamePlayers={gamePlayers}/>
          </td>
          <td>{boughtIn ? String.fromCharCode(10004) : ''}</td>
          <td>{rebought ? String.fromCharCode(10004) : ''}</td>
          <td>{annualTocParticipant ? String.fromCharCode(10004) : ''}</td>
          <td>{quarterlyTocParticipant ? String.fromCharCode(10004) : ''}</td>
          {
            isChop && <td>{chop ? chop : ''}</td>
          }
          {
            originalPoints && <td>
              <del>{originalPoints}</del>
              {points}</td>
          }
          {
            !originalPoints && <td>{points ? points : ''}</td>
          }
        </tr>
      )
    })
  }

  return (
    <div>
      <p>Paid Players: {numPaidPlayers}</p>
      <Table striped bordered size="sm">
        <thead>
        <tr>
          <th><i className="fa-solid fa-clipboard-list"></i></th>
          <th>Name</th>
          <th>B<br/>u<br/>y<br/>I<br/>n</th>
          <th>R<br/>e<br/>B<br/>u<br/>y</th>
          <th>T<br/>O<br/>C</th>
          <th>Q<br/>T<br/>O<br/>C</th>
          {
            isChop && <th>Chop</th>
          }
          <th>Pts</th>

        </tr>
        </thead>
        <tbody>
        {renderGamePlayers(gamePlayers, isChop)}
        </tbody>
      </Table>

      <AddPlayer showAddPlayer={showAddPlayer} setShowAddPlayer={setShowAddPlayer} />

      <div>
        <Button variant="primary" onClick={() => setShowAddPlayer(true)}>
          Add Player
        </Button>
      </div>

    </div>
  )
}

export default GamePlayers;