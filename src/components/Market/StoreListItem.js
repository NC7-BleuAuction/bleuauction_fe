import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StoreListItem.module.css';
import { Link } from 'react-router-dom';
import { isOpenNow, sendAxiosRequest, startEndTimeInfo } from '../utility/common';

function StoreListItem(props) {
  let [store, setStore] = useState(props.data);
  let [open, setOpen] = useState('O');

  useEffect(() => {
    let startEndTime = startEndTimeInfo(store);
    let openStatus = isOpenNow(startEndTime[0], startEndTime[1]);
    setOpen(openStatus);
  }, []);

  return (
    <div className={styles.storeListItemBox}>
      <img src='/images/boss.png' className={styles.storeListItemBoss} />
      <div className={styles.storeListItemDetailTop}>
        <div className={styles.storeListItemHeader}>
          <strong className={styles.storeListItemDetailName}>{store.storeName}</strong>
          <span className={styles.storeListItemDetailMarket}>{store.marketName}</span>
        </div>
        <p className={styles.storeListItemDetailIntroduce}>{store.storeAddr}</p>

        <p className={styles.storeListItemBoxReview}>
          <img className={styles.storeListItemFresh} src='/images/fresh.png' />5.0 (1024)
        </p>
        <p className={styles.storeListItemBoxState}>
          <img className={styles.storeListItemStateIcon} src='/images/heart.png' />
          {open == 'O' ? '영업중' : '영업종료'}
        </p>
        <div className={styles.storeListItemDetailBoxMore}>
          <Link to="/market/detail">더보기&gt;</Link>
        </div>
      </div>

    </div>
  );
}

export default StoreListItem;