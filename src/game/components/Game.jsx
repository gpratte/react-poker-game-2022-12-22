import React, {createContext, useState} from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";
import {Accordion, Spinner} from "react-bootstrap";
import '../style/game.css'
import GamePlayers from "./GamePlayers";

export const GameContext = createContext();

function Game() {

  const {
    game,
    isLoading
  } = useGame();

  const [detailsAccordionOpen, setDetailsAccordionOpen] = useState(true)

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <GameContext.Provider value={{game}}>
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
