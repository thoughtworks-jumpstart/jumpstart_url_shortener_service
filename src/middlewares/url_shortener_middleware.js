let urlCounter = 1000;
const idToUrl = new Map();
const urlToId = new Map();

const atob = require("atob");
const btoa = require("btoa");

function getNextUrlID() {
  return urlCounter++;
}

function isUrlRegistered(url) {
  return urlToId.has(url);
}

function registerLongUrl(url) {
  if (isUrlRegistered(url)) {
    throw new Error(`The long URL ${url} is already registered`);
  }
  const id = getNextUrlID();
  idToUrl.set(id, url);
  urlToId.set(url, id);
}

function getShortUrl(url) {
  if (!isUrlRegistered(url)) {
    throw new Error(`The long URL ${url} is not yet registered`);
  }
  const id = urlToId.get(url);
  return btoa(id);
}

function decodeUrlHash(hash) {
  return atob(hash);
}

function isValidUrlId(id) {
  return idToUrl.has(id);
}

function findLongUrl(id) {
  return idToUrl.get(id);
}

function createShortUrl(req, res) {
  const longUrl = req.body.url;

  if (!longUrl) {
    return res.status(400).send({ error: "missing `url` in request body" });
  }

  if (isUrlRegistered(longUrl)) {
    const shortUrl = getShortUrl(longUrl);
    return res.status(200).send({ hash: shortUrl });
  }

  registerLongUrl(longUrl);
  const shortUrl = getShortUrl(longUrl);
  return res.status(201).send({ hash: shortUrl });
}

function getLongUrl(req, res) {
  const hash = req.query.hash;

  if (!hash) {
    return res
      .status(400)
      .send({ error: "missing `hash` in request query parameter" });
  }

  const urlId = parseInt(decodeUrlHash(hash));

  if (isValidUrlId(urlId)) {
    const longUrl = findLongUrl(urlId);
    return res.status(200).send({ url: longUrl });
  } else {
    return res
      .status(404)
      .send({ error: `There is no URL registered for hash value ${hash}` });
  }
}

module.exports = {
  createShortUrl,
  getLongUrl
};
