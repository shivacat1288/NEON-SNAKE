const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.highscoreAlert = functions.firestore
    .document("highscores/{scoreId}")
    .onCreate(async (snap, context) => {

        const data = snap.data();
        const player = data.name;
        const score = data.score;

        const db = admin.firestore();

        const tokensSnapshot = await db.collection("tokens").get();

        const tokens = [];

        tokensSnapshot.forEach(doc => {
            tokens.push(doc.data().token);
        });

        if (tokens.length === 0) {
            console.log("No tokens found");
            return null;
        }

        const message = {
            data: {
                title: "NEON SNAKE",
                body: player + " reached " + score + " points!"
            },
            tokens: tokens
        };

        const response = await admin.messaging().sendEachForMulticast(message);

        console.log("Push sent:", response.successCount);

        return null;
    });