import React from 'react';
import styles from './StoreHome.module.css';
import StoreHomeItem from './StoreHomeItem';

function StoreHome({ stores }) {
  return (
    <div className={styles.storeBox}>
      {stores
        .filter((item) => item.storeNo < 7)
        .map((item, index) => (
          <div key={index} className={styles.frame}>
            <StoreHomeItem store={item} />
          </div>
        ))}
    </div>
  );
}

export default StoreHome;
