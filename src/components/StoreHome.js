import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHome.module.css';
import StoreHomeItem from './StoreHomeItem';


function StoreHome({stores}) {

  // const [storelist, setStorelist] = useState(stores);

  // useEffect(()=>{
  //   setStorelist(stores);
  //   }, []);

  // const storelist = stores;

  return (
    <div className={styles.storeBox}>
      {/* <button onClick={()=>{console.log(stores)}}>
        {stores[0]?.marketName}
        </button> */}

      {
      stores
      .filter((item) => item.storeNo < 7)
      .map((item) => (      
        <StoreHomeItem key={item.storeNo} store={item}/> ))
      }

    </div>
  )
}

export default StoreHome;