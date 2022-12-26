import React from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";
import {Spinner} from "react-bootstrap";

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
      <Details game={game}/>
    </div>
  )
}

export default Game;
