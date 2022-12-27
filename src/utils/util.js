export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The maximum is exclusive and the minimum is inclusive
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const getRandomBoolean = () => {
  return getRandomInt(0, 2) === 1;
}