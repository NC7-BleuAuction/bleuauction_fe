import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHome.module.css';
import StoreHomeItem from './StoreHomeItem';


function StoreHome({ stores }) {

  // const [store, setStore] = useState(stores);

  return (
    <div className={styles.storeBox}>
      {stores.map((item) => (
        <StoreHomeItem key={item.index} store={item}/> ))
      .filter((item) => item.index < 7)}
{/*       
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/>
      <StoreHomeItem/> */}
    </div>
  )
}

export default StoreHome;