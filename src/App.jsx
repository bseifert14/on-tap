import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from 'firebase/auth';

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";           // List View
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import ConfirmLogoutModal from "./components/ConfirmLogoutModal";

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <Header
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => setShowLogoutConfirm(true)}
      />
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
          }}
        />
      )}

      {showLogoutConfirm && (
        <ConfirmLogoutModal
          onConfirm={() => {
            handleLogout();
            setShowLogoutConfirm(false);
          }}
          onCancel={() => setShowLogoutConfirm(false)}
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
