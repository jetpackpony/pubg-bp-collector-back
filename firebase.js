const admin = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');
const moment = require('moment');
const R = require('ramda');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const addToCollection = (collectionName, document) => {
  return db.collection(collectionName).add(document);
};

const getNewBPRecords = () => {
  return db.collection("bpRecord")
    .where("attachedToMatch", "==", false)
    .get()
    .then((snapshot) => {
      const res = [];
      snapshot.forEach((doc) => {
        const docJSON = doc.data();
        docJSON["id"] = doc.id;
        docJSON.createdAt = moment(docJSON.createdAt.toDate());
        res.push(docJSON);
      });
      return res;
    });
};

const writeMatchedData = (matches) => {
  const batch = db.batch();

  const bpRecords = db.collection("bpRecord");
  const matchedMatches = db.collection("matchedMatches");

  R.forEachObjIndexed((value, key) => {
    batch.set(matchedMatches.doc(key), value);
    batch.update(bpRecords.doc(key), { attachedToMatch: true });
  }, matches);

  return batch.commit().then((res) => res);
};

module.exports = {
  addToCollection,
  getNewBPRecords,
  writeMatchedData
};