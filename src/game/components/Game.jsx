import React from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";
import {Accordion, Spinner} from "react-bootstrap";
import '../style/game.css'

function Game() {

  const {
    game,
    isLoading
  } = useGame();

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
          <Accordion.Header>
            Details
          </Accordion.Header>
          <Accordion.Body>
            <Details game={game}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Game;
