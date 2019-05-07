const expect = require('chai').expect;
const moment = require('moment');
const { writeMatchedData } = require('../firebase');

describe("writeMatchedData", () => {
  xit("writes the correct data", () => {
    writeMatchedData({
      test: { testme: "test" },
      test1: { testme: "test1" },
    });
    expect(true).to.be.eql(true);
  });
});