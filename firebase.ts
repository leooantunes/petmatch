import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Initialize Firebase (should be done at app startup)
try {
  console.log("[Firebase] Initializing Firebase SDK");
  // Firebase auto-initializes, but we can verify it's ready
  auth().currentUser; // This triggers initialization
  console.log("[Firebase] Firebase SDK initialized successfully");
} catch (error) {
  console.error("[Firebase] Error initializing Firebase:", error);
}

export const db = () => firestore();

export { auth, storage };
