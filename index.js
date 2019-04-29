require('dotenv').config();
const { getMatchData, getPlayerData } = require('./pubgAPI');
const firebase = require('./firebase');

//firebase.addToCollection("newTests", { testme: "test" });

//getMatchData("ff3728b8-c18a-4d33-ab70-247caabaff4b").then((json) => console.log(json));
//getPlayerData(process.env.PLAYER_ID).then((json) => console.log(json));

/*
const test = async () => {
  const player = await getPlayerData(process.env.PLAYER_ID);
  return player.data.relationships.matches.data;
};

test().then((json) => console.log("Got JSON!", json));
*/