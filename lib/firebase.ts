import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// firebase/auth는 서버 번들에서 webpack alias로 빈 모듈 처리됨 (next.config.ts)
// 서버에서는 getAuth가 undefined이므로 조건부 실행
if (typeof getAuth === "function") {
  auth = getAuth(app);
  // 브라우저에서만 localStorage persistence 설정
  if (typeof window !== "undefined") {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
  }
}

db = getFirestore(app);
storage = getStorage(app);

export { app, auth, db, storage };
