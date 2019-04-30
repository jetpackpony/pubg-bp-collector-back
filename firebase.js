const admin = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');
const moment = require('moment');

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

const getSeenMatches = () => {
  return db.collection("seenMatches").get()
    .then((snapshot) => {
      const res = [];
      snapshot.forEach(doc => res.push(doc.data()));
      return res;
    });
};

module.exports = {
  addToCollection,
  getNewBPRecords,
  getSeenMatches
};