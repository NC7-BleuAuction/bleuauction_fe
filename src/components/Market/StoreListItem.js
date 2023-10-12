import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreListItem.module.css';
import { Link }  from 'react-router-dom';


function StoreListItem() {
  return (
    <div className={styles.storeListItemBox}>
      <img src='/boss.png' className={styles.storeListItemBoss}/>
      <div className={styles.storeListItemDetailTop}>
        <div className={styles.storeListItemHeader}>
          <strong className={styles.storeListItemDetailName}>해피수산</strong>
          <span className={styles.storeListItemDetailMarket}>노량진</span>
        </div>
        <p className={styles.storeListItemDetailIntroduce}>신선신선</p>

        <p className={styles.storeListItemBoxReview}>
          <img className={styles.storeListItemFresh} src='/fresh.png'/>5.0 (1024)
        </p>
        <p className={styles.storeListItemBoxState}>
          <img className={styles.storeListItemStateIcon} src='/heart.png'/>영업중
        </p>
        <div className={styles.storeListItemDetailBoxMore}>
          <Link to="/market/detail">더보기&gt;</Link>
        </div>
      </div>

    </div>
  );
}

export default StoreListItem;