import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_MESSAGE_SENDER_ID,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_APP_ID,
  projectId: VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: VITE_FIREBASE_MESSAGE_SENDER_ID,
  messagingSenderId: VITE_FIREBASE_PROJECT_ID,
  appId: VITE_FIREBASE_STORAGE_BUCKET
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
