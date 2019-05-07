require('dotenv').config();
const R = require('ramda');
const { getMatchData, getPlayersMatches, pluckMatchData } = require('./pubgAPI');
const { getNewBPRecords, writeMatchedData } = require('./firebase');
const { mapRecordsToMatches } = require('./functions');

const processNewBPRecords = async () => {
  const newBPRecords = await getNewBPRecords();
  if (newBPRecords.length <= 0) {
    return "No new records found, finishing";
  }
  console.log(`${newBPRecords.length} new records found, processing...`);
  const playerMatches = await getPlayersMatches(process.env.PLAYER_ID);
  const matchesIds = R.pluck("id")(playerMatches);
  console.log(`${matchesIds.length} matches to collect...`);
  const matches = [];
  for(let i = 0; i < matchesIds.length; i++) {
    const tmp = await getMatchData(matchesIds[i]);
    matches.push(pluckMatchData(tmp, process.env.PLAYER_ID));
  }
  const res = mapRecordsToMatches(newBPRecords, matches);
  const writeRes = await writeMatchedData(res);
  return `Done! Written ${writeRes.length} records`;
};

processNewBPRecords().then((msg) => console.log("Done!", msg));