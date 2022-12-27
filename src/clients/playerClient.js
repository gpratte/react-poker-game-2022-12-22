import {delay, getRandomInt} from "../utils/util";
import leaguePlayersData from "./league-players-data";

const playerClient = {
  getPlayers: async (id = 0) => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not get players' + Date.now()
      };
    }
    return leaguePlayersData;
  }
}

export default playerClient;
