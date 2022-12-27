import {delay, getRandomInt} from "../utils/util";
import seasonData from "./season-data";

export const getSeason = async (id = 0) => {
  // delay 1 to 3 seconds
  await delay(getRandomInt(1000, 3000));
  // One in four will error
  if (getRandomInt(0, 4) === 1) {
    throw {
      id: Math.random(),
      type: 'Error',
      message: 'uh oh could not get season' + Date.now()
    };
  }
  return seasonData;
}
