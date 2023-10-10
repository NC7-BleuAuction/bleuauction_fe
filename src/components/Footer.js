import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Footer.module.css';


function Footer() {
  return (
    <div className={styles.footerBox}>
      <img src='../LogoPage.png' />
    </div>
  )
}

export default Footer;