const expect = require('chai').expect;
const { mapMatchesToBPRecord, mapRecordsToMatches } = require('../functions');
const moment = require('moment');

describe("mapMatchesToBPRecord", () => {
  xit("matches correctly", () => {
    const newMatches = require('./newMatches.1.json');
    const newBPRecords = require('./newBPRecords.1.json');
    const res = newBPRecords.map((r) => mapMatchesToBPRecord(newMatches)(r));
    moment();
    debugger;
    expect().to.be.equal(1);
  });

  it("matches all bp correctly", () => {
    const newMatches = require('./newMatches.1.json');
    const newBPRecords = require('./newBPRecords.1.json');
    const expected = require('./matchedRecords.1.json');
    const actual = mapRecordsToMatches(newBPRecords, newMatches);
    expect(actual).to.be.eql(expected);
  });
});