
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const timeout = async (ms) => {
  await delay(ms);
}
