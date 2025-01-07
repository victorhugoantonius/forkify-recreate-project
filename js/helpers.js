import { TIMEOUT_SEC } from "./config.js";

const timeout = (delay) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Request took too much time to load. try again!");
    }, delay);
  });
};

export const getJSON = async (url) => {
  try {
    const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(`There's no such url of ${url}. try again`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async (url, uploadData) => {
  try {
    console.log("Sending data: ", uploadData);
    const resp = await Promise.race([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(`There's no such url of ${url}. try again`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
