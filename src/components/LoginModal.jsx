import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginModal({ close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => close())
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 999
    }}>
      <div style={{
        background: 'white', padding: '2rem', borderRadius: 8, width: 300,
        boxShadow: '0 0 20px rgba(0,0,0,0.2)'
      }}>
        <h3>Login</h3>
        <input
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
          value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
        />
        <input
          type="password"
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
          value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
        />
        <button onClick={signIn}>Log In</button>
        <button onClick={close} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
}
