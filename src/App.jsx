import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./supabase";

import HeaderLayout from "./modules/header/HeaderLayout";
import LoginModal from "./components/LoginModal";
import ConfirmLogoutModal from "./components/ConfirmLogoutModal";
import Footer from "./components/Footer";

import './styles/global.css';
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProfileLayout from "./pages/profile/ProfileLayout";
import Recover from "./pages/Recover";
import CalendarLayout from "./modules/calendar/CalendarLayout";
import HomeLayout from "./modules/home/HomeLayout";
import useLoadGoogleMaps from "./utils/hooks/useLoadGoogleMaps";

const CUSTOM_HEADER_LOCATIONS = ['/about', '/contact', '/profile'];
const { VITE_GOOGLE_PLACES_API_KEY } = import.meta.env;

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useLoadGoogleMaps(VITE_GOOGLE_PLACES_API_KEY);
  
  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div className="pageWrapper">
      <HeaderLayout
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={() => setShowLogoutConfirm(true)}
      />
      {CUSTOM_HEADER_LOCATIONS.includes(location.pathname) && (
        <div className="headerFade" />
      )}

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

      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/calendar" element={<CalendarLayout />} />
          <Route path="/profile" element={<ProfileLayout user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recover" element={<Recover />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
