const R = require('ramda');
const moment = require('moment');

const mapMatchesToBPRecord = R.curry((newMatches, bpRecord) => {
  return R.filter((m) => {
    const start = moment(m.attributes.createdAt);
    const end = moment(start).add(m.attributes.duration, 's');
    const death = moment(start).add(m.playerData.attributes.stats.timeSurvived, 's');
    const bpTime = moment(bpRecord.createdAt);
    return bpTime > death && bpTime < end;
  }, newMatches);
});

const isRecordBetweenMatches = (record, match1, match2) => {
  const recTime = moment(record.createdAt);
  const match1Time = moment(match1.attributes.createdAt);
  const match2Time = moment(match2.attributes.createdAt);
  return recTime > match1Time && recTime < match2Time;
};

const mapRecordsToMatches = (bpRecords, matches) => {
  const mapRecords = R.map((rec) => {
    for (let i = 0; i < matches.length - 2; i++) {
      if (isRecordBetweenMatches(rec, matches[i + 1], matches[i])) {
        return {
          ...matches[i + 1],
          bpData: {
            rankBP: rec.rankBP,
            killBP: rec.killBP,
            hitBP: rec.hitBP,
          }
        };
      }
    }
    return null;
  });

  return R.converge(R.zipObj, [R.pluck('id'), mapRecords])(bpRecords);
};

module.exports = {
  mapMatchesToBPRecord,
  mapRecordsToMatches
};