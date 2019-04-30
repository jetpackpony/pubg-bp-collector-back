require('dotenv').config();
const R = require('ramda');
const { getMatchData, getPlayersMatches, pluckMatchData } = require('./pubgAPI');
const { getNewBPRecords, getSeenMatches } = require('./firebase');
const { mapMatchesToBPRecord } = require('./functions');

const getNewMatchesIds = async () => {
  const [ seenMatches, playersMatches ] = await Promise.all([
    getSeenMatches(),
    getPlayersMatches(process.env.PLAYER_ID)
  ]);
  const seenIds = R.pluck("matchId")(seenMatches);
  const allIds = R.pluck("id")(playersMatches);
  return R.without(seenIds, allIds);
};

const processNewBPRecords = async () => {
  const newBPRecords = await getNewBPRecords();
  if (newBPRecords.length <= 0) {
    return "No new records found, finishing";
  }
  console.log(`${newBPRecords.length} new records found, processing...`);
  const newMatchesIds = await getNewMatchesIds();
  const newMatches = [];
  for(let i = 0; i < newMatchesIds.length; i++) {
    const tmp = await getMatchData(newMatchesIds[i]);
    newMatches.push(pluckMatchData(tmp, process.env.PLAYER_ID));
  }
  const bpRecordsWithMatches = newBPRecords.map(mapMatchesToBPRecord(newMatches));
};

processNewBPRecords().then((msg) => console.log("Done!", msg));