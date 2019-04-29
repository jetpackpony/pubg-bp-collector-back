const admin = require('firebase-admin');
const serviceAccount = require('./firebase_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const addToCollection = (collectionName, document) => {
  return db.collection(collectionName).add(document);
};

module.exports = {
  addToCollection
};