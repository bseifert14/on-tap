import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import HeaderLogo from "./HeaderLogo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import MobileMenu from "../../components/common/MobileMenu";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export default function HeaderLayout({ user, onLogout, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery();

  return (
    <>
      <header className={styles.header}>
        <HeaderLogo />

        <Nav user={user} onLogout={onLogout} onLoginClick={onLoginClick} />

        {isMobile && (
          <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
            <span/>
            <span/>
            <span/>
          </button>
        )}
        
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
