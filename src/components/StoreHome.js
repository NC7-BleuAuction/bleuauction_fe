import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHome.module.css';
import StoreHomeItem from './StoreHomeItem';


function StoreHome() {
  return (
    <div className={styles.storeBox}>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
    </div>
  )
}

export default StoreHome;