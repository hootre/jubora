import toast from 'react-hot-toast';
import Loader from 'components/Navbar';
import Link from 'next/link';

import withFirebaseAuth from 'react-with-firebase-auth';
import SignIn from './SignIn';
import Dashboard from 'components/Dashboard';
import { useEffect, useState } from 'react';
import { firebaseAppAuth, providers } from 'lib/firebase';
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});

const Home = ({ signInWithGoogle, signInWithGithub, signOut, user }) => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    if (typeof user !== 'undefined') {
      setUserId(user?.uid);
    }
  }, [user]);
  return (
    <div>
      <header className="header">
        <h2>TypeMD</h2>
        {user && (
          <div className="user-profile">
            <a
              className="log-out-link"
              href="#log-out"
              onClick={() => {
                console.log('Signed out...');
                signOut();
              }}
            >
              Log Out
            </a>
          </div>
        )}
      </header>
      <Dashboard user={user} userId={userId} />
      <SignIn user={user} signIns={{ signInWithGithub, signInWithGoogle }} />
      <Loader show />
      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>
    </div>
  );
};
export default createComponentWithAuth(Home);
