import {delay, getRandomInt} from "../utils/util";
import gameData from "./game-data";

const gameClient = {
  getGame: async (id = 0) => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in 10 will error
    if (getRandomInt(0, 10) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not get game' + Date.now()
      };
    }
    return {...gameData};
  },

  addPlayer: async (player) => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not add player' + Date.now()
      };
    }
    return {...player};
  },

  updatePlayer: async (player) => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not add player' + Date.now()
      };
    }
    return {...player};
  },

  deletePlayer: async (gameId, gamePlayerId) => {
    // delay 1 to 2 seconds
    await delay(getRandomInt(1000, 2000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not delete player' + Date.now()
      };
    }
  }
}

export default gameClient;