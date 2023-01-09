import React, {createContext, useState} from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";
import '../../common/style/common.css'
import {Accordion} from "react-bootstrap";
import GamePlayers from "./GamePlayers";

export const GameContext = createContext();

function Game() {

  const {
    game,
    refreshGame
  } = useGame();

  const [detailsAccordionOpen, setDetailsAccordionOpen] = useState(true)
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  return (
    <GameContext.Provider value={{game, refreshGame, showAddPlayer, setShowAddPlayer}}>
      <div>
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Button onClick={() => setDetailsAccordionOpen(!detailsAccordionOpen)}>
              Details {detailsAccordionOpen && <i className="fa-solid fa-chevron-up"></i>}{!detailsAccordionOpen &&
              <i className="fa-solid fa-chevron-down"></i>}
            </Accordion.Button>
            <Accordion.Body>
              <Details game={game}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <GamePlayers />
      </div>
    </GameContext.Provider>
  )
}

export default Game;
