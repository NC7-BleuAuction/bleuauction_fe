import React from 'react';
import styles from './StoreHome.module.css';
import StoreHomeItem from './StoreHomeItem';

function StoreHome({ stores }) {
  return (
      <div className={styles.storeBox}>
        {stores.map((store, index) => (
            <div key={index} className={styles.frame}>
              <StoreHomeItem store={store} />
            </div>
        ))}
      </div>
  );
}

export default StoreHome;
