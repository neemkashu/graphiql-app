import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import nookies from 'nookies';

// TODO: Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJiltna88PN7puh4c0VGbo-ptXNGUUyu0',
  authDomain: 'lyk-graphiql.firebaseapp.com',
  projectId: 'lyk-graphiql',
  storageBucket: 'lyk-graphiql.appspot.com',
  messagingSenderId: '271410540728',
  appId: '1:271410540728:web:3333f044a5733bfb6c844d',
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const database = getFirestore(app);

export const logInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (error instanceof Error) console.error(error.message);
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = res.user;
    await addDoc(collection(database, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const logout = (): void => {
  signOut(firebaseAuth);
  nookies.set(undefined, 'token', '', { path: '/' });
};
