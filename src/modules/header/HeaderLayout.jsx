import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import HeaderLogo from "./HeaderLogo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

export default function HeaderLayout({ user, onLogout, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <header className={styles.header}>
        <HeaderLogo />

        <Nav user={user} onLogout={onLogout} onLoginClick={onLoginClick} />

        <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      </header>

      {menuOpen && (
        <MobileNav
            user={user}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            setMenuOpen={setMenuOpen}
        />
      )}
    </>
  );
}
