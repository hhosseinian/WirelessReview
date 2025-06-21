// Make sure you have Firebase initialized with your config
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ... other config
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const auth = getAuth(app);

// Sign in anonymously (or use your auth flow)
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Auth error:", error);
  });

// Call the Cloud Function
async function fetchQuestion(questionId) {
  const getQuestion = httpsCallable(functions, "getQuestion");
  try {
    const result = await getQuestion({ qid: questionId });
    console.log("Question data:", result.data);
    // Use question text, options etc.
  } catch (error) {
    console.error("Error calling function:", error);
  }
}

// Example usage:
fetchQuestion("question1");
