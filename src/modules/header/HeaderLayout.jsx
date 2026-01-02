import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import HeaderLogo from "./HeaderLogo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import MobileMenu from "../../components/common/MobileMenu";

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

      <MobileMenu
        id="mobile-nav-menu"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <MobileNav
            user={user}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            setMenuOpen={setMenuOpen}
        />
      </MobileMenu>
    </>
  );
}
