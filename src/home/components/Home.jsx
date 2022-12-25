import React from "react";
import '../style/home.css';
import {Link, Route} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Game from "../../game/components/Game";

const Home = (props) => {

  return (
    <div>
      <br/>
      <h1>Welcome to Texas TOC</h1>
      <p>
        <Link to="/current-game">
          <Button variant="outline-secondary"> Game </Button>
        </Link>
      </p>

      <Route exact path='/current-game'>
        <Game/>
      </Route>

    </div>

  )
}

export default Home;
