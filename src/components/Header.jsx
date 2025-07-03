import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import LoginModal from './LoginModal';

export default function Header({ user }) {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#2c2d42',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
          WHAT'S UP <span style={{ fontStyle: 'italic' }}>Stowe</span>
        </Link>
      </div>

      {/* Nav Buttons */}
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/calendar" style={navLinkStyle}>Calendar</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
        <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
      </nav>

      {/* Search + Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* 🔍 Search Icon Placeholder */}
        <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>🔍</span>

        {user ? (
          <>
            <button style={redButtonStyle} onClick={handleProfileClick}>Profile</button>
            <button style={{ ...redButtonStyle, backgroundColor: '#444' }} onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <button style={redButtonStyle} onClick={() => setShowLogin(true)}>
            LOGIN
          </button>
        )}
      </div>

      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
    </header>
  );
}

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1rem',
};

const redButtonStyle = {
  backgroundColor: '#e3003b',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1.25rem',
  borderRadius: '999px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
