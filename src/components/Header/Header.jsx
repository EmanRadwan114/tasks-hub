import React from "react";
import logoImg from "../../assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={`flex-center center header ${styles.header}`}>
      <div>
        <div className={`flex-center ${styles.logo_container}`}>
          <img
            src={logoImg}
            alt="task list illustration with purple color for the frame and pink color for the list items"
            className={styles.logo}
          />
          <h1>Tasks Hub</h1>
        </div>
        <p className={styles.tagline}>
          Stay on track, boost productivity, and achieve <br /> your goals
          faster.
        </p>
      </div>
    </header>
  );
}

export default Header;
