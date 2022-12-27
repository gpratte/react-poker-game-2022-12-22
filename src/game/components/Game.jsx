import React, {useState} from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";
import {Accordion, Spinner} from "react-bootstrap";
import '../style/game.css'
import GamePlayers from "./GamePlayers";

function Game() {

  const {
    game,
    isLoading
  } = useGame();

  const [open, setOpen] = useState(true)

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
    <div>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Button onClick={() => setOpen(!open)}>
            Details {open && <i className="fa-solid fa-chevron-up"></i>}{!open && <i className="fa-solid fa-chevron-down"></i>}
          </Accordion.Button>
          <Accordion.Body>
            <Details game={game}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <GamePlayers game={game}/>
    </div>
  )
}

export default Game;
