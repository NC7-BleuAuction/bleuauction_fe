import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footerBox}>
      <img src='/images/LogoPage.png' alt="Logo" className={styles.logoImage} />
      <div className={styles.copyright}>
        Copyright &copy; {new Date().getFullYear()} bleuauction.corp
      </div>
    </div>
  );
}

export default Footer;
