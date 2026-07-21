import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import HeaderLogo from "./HeaderLogo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import Drawer from "../../components/common/Drawer";

export default function HeaderLayout({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery();

  return (
    <>
      <header className={styles.header}>
        <HeaderLogo />

        <Nav user={user} onLogout={onLogout} />

        {isMobile && (
          <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
            <span/>
            <span/>
            <span/>
          </button>
        )}
        
      </header>

      <Drawer
        id="mobile-nav-menu"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
      >
        <MobileNav
            user={user}
            onLogout={onLogout}
            setMenuOpen={setMenuOpen}
        />
      </Drawer>
    </>
  );
}
