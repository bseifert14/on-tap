import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password).catch(err => alert(err.message));
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => onLogin())
      .catch(err => alert(err.message));
  };

  // no sign-up button now
  return (
    <div>
      <h2>Client Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={signIn}>Log In</button>
    </div>
  );
}
