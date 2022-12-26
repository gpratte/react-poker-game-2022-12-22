import React from "react";
import Details from "./Details";
import useGame from "../hooks/useGame";

function Game(props) {

  const {
    game,
    isLoading
  } = useGame(props.newNotification);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Details game={game}/>
    </div>
  )
}

export default Game;
