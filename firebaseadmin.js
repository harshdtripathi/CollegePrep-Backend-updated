// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_PRIVATE_KEY); // 🔐 downloaded from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
