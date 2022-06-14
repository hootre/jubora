import React from 'react'
import { useRouter } from 'next/router'
const SignIn = ({ user, signIns: { signInWithGoogle, signInWithGithub } }) => {
  const router = useRouter()
  if (user) {
    // router.push(`/${user.uid}`)
    return null
  } else {
    return (
      <div className="sign-in-page">
        <div className="sign-in-buttons">
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInWithGithub}>Sign in with GitHub</button>
        </div>
      </div>
    )
  }
}

export default SignIn
