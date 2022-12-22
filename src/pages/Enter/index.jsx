import React, { useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import { firebaseAppAuth, providers } from 'lib/firebase';
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
});
import { db } from 'lib/firebase';

const Enter = ({ createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user }) => {
  // const [userId, setUserId] = useState('');
  // useEffect(() => {
  //   if (typeof user !== 'undefined') {
  //     setUserId(user?.uid);
  //   }
  // }, [user]);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState(''); // 코드 추가
  const [loginPassword, setLoginPassword] = useState(''); // 코드 추가

  //회원가입
  const register = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(userCredential => {
          console.log(userCredential.user);
          // 유저 등록
          db.collection('Users')
            .doc(userCredential.user.uid)
            .set({
              name: registerEmail,
              phone: '01080071895',
              email: registerEmail,
              uid: userCredential.user.uid,
              registrationDate: userCredential.user.metadata.creationTime,
            })
            .then(() => {
              console.log('Document successfully written!');
            })
            .catch(error => {
              console.error('Error writing document: ', error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  //로그인
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(loginEmail, loginPassword);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  //로그아웃
  const logout = async () => {
    await signOut(firebaseAppAuth);
  };

  return (
    <div style={{ textAlign: 'center', margin: 10 }}>
      <div>
        {/* 회원가입 */}
        <input
          placeholder="Email"
          onChange={e => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          placeholder="EmailPassword"
          onChange={e => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={register}>CreateUser</button>
      </div>
      <div>
        {/* 로그인 */}
        <h3>Login</h3>
        <input
          placeholder="Email"
          onChange={e => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password"
          onChange={e => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <div>User Logged In:</div>
        <div>{user?.email}</div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};
export default createComponentWithAuth(Enter);
