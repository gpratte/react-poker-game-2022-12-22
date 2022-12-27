import {delay, getRandomInt} from "../utils/util";
import gameData from "./game-data";
import {isEmpty} from "lodash";

const gameClient = {
  getGame: async (id = 0) => {
    // delay 1 to 3 seconds
    await delay(getRandomInt(1000, 3000));
    // One in four will error
    if (getRandomInt(0, 4) === 1) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not get game' + Date.now()
      };
    }
    return {...gameData};
  },

  addPlayer: async (player) => {
    if (isEmpty(player)) {
      throw {
        id: Math.random(),
        type: 'Error',
        message: 'uh oh could not add an empty player' + Date.now()
      };
    }

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
    console.log('added player')
    return {...player};
  }
}

export default gameClient;