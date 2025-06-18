const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.getQuestion = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in to get questions."
    );
  }

  const questionId = data.qid;
  if (!questionId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "No question ID provided."
    );
  }

  const doc = await db.collection("questions").doc(questionId).get();

  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "Question not found.");
  }

  const { text, options, category } = doc.data();
  return { text, options, category };
});
