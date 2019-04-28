const fetch = require('node-fetch');
const API_ENDPOINT = "https://api.pubg.com/shards/steam";
const MATCHES_ENDPOINT = `${API_ENDPOINT}/matches`;
const PLAYERS_ENDPOINT = `${API_ENDPOINT}/players`;

const getMatchData = (matchId) => {
  return fetch(`${MATCHES_ENDPOINT}/${matchId}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json"
    }
  })
    .then((data) => data.json())
    .catch((err) => console.log("ERROR: " + err));
};

const getPlayerData = (playerID) => {
  return fetch(`${PLAYERS_ENDPOINT}/${playerID}`, {
    method: "get",
    headers: {
      "Accept": "application/vnd.api+json",
      "Authorization": `Bearer ${process.env.PUBG_API_KEY}`
    }
  })
    .then((data) => data.json())
    .catch((err) => console.log("ERROR: " + err));
}

module.exports = {
  getMatchData,
  getPlayerData
};