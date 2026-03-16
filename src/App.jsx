import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "./supabase";

import HeaderLayout from "./pages/header/HeaderLayout";
import LoginModal from "./components/modals/LoginModal";
import ConfirmLogoutModal from "./components/modals/ConfirmLogoutModal";
import Footer from "./pages/footer/Footer";

import './styles/global.css';
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import ProfileLayout from "./pages/profile/ProfileLayout";
import Recover from "./pages/common/Recover";
import CalendarLayout from "./pages/calendar/CalendarLayout";
import HomeLayout from "./pages/home/HomeLayout";
import { Toaster } from 'sonner';

import EventRoute from "./pages/events/EventRoute";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Google Analytics page view tracking. Might need to uncomment this to track with React Router
  // useEffect(() => {
  //   if (window.gtag) {
  //     window.gtag("event", "page_view", {
  //       page_path: location.pathname,
  //     });
  //   }
  // }, [location]);

  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

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
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div className="pageWrapper">
      <Toaster position="top-center" richColors />
      
      <HeaderLayout
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
            navigate("/profile");
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
        {/* MAIN ROUTES */}
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/calendar" element={<CalendarLayout />} />
          <Route path="/profile" element={<ProfileLayout user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recover" element={<Recover />} />

          {/* If someone lands on a share link directly, they’ll hit this route */}
          <Route path="/events/:eventId" element={<EventRoute />} />
        </Routes>

        {/* MODAL LAYER (only when we have a background location) */}
        {backgroundLocation && (
          <Routes>
            <Route path="/events/:eventId" element={<EventRoute />} />
          </Routes>
        )}
      </div>

      <Footer />
    </div>
  );
}
