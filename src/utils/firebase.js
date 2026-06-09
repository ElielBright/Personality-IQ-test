import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let authReady = null;

async function ensureAuth() {
  if (auth.currentUser) return auth.currentUser;
  if (authReady) return authReady;
  const cred = await signInAnonymously(auth);
  authReady = cred.user;
  return cred.user;
}

async function getQuizStats(userId) {
  const ref = doc(db, 'user_profiles', userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data().quiz_stats || null;
}

async function saveQuizSession(userId, session) {
  const ref = doc(db, 'user_profiles', userId);
  const snap = await getDoc(ref);

  const existing = snap.exists() ? snap.data() : {};
  const prevStats = existing.quiz_stats || {
    overall: { totalCorrect: 0, totalAttempted: 0, currentStreak: 0, bestStreak: 0, sessionsCount: 0 },
    categories: {}
  };

  const overall = prevStats.overall;
  overall.totalCorrect += session.correct;
  overall.totalAttempted += session.total;
  overall.currentStreak = session.streakEnded ? 0 : (prevStats.overall.currentStreak + (session.streakEnded ? 0 : session.correct));
  if (session.streakCurrent > overall.bestStreak) overall.bestStreak = session.streakCurrent;
  overall.sessionsCount += 1;

  const catName = session.category;
  if (!prevStats.categories[catName]) {
    prevStats.categories[catName] = { totalCorrect: 0, totalAttempted: 0, bestStreak: 0 };
  }
  const cat = prevStats.categories[catName];
  cat.totalCorrect += session.correct;
  cat.totalAttempted += session.total;
  if (session.streakCurrent > cat.bestStreak) cat.bestStreak = session.streakCurrent;

  await setDoc(ref, { ...existing, quiz_stats: { overall, categories: prevStats.categories } }, { merge: true });
}

export { db, auth, ensureAuth, getQuizStats, saveQuizSession };
