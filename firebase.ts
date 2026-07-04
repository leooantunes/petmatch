import { getFirestore } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export const db = getFirestore();

export { storage };
