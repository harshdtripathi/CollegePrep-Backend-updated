// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./collegeprep-1cb67-firebase-adminsdk-fbsvc-75274f6bc4.json"); // 🔐 downloaded from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
