import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";           // List View
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
// import Landing from "./pages/Landing";     // (Optional if not used)

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header user={user} onLoginClick={() => setShowLogin(true)} />
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} /> {/* ← List View is now home */}
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile user={user} />} />
        {/* Remove or redirect Landing if not needed */}
      </Routes>
    </>
  );
}
