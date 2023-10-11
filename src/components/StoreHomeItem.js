import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHomeItem.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';



function StoreHomeItem() {
  return (
    <>
    <Link to="/api/test" className={styles.storeHomeItemDetailBoxMore}>
      <Card style={{ width: '18rem' }}>
        <img className={styles.storeHomeItemBoss} variant="top" src="/boss.png" />
        <div className={styles.storeHomeItemHeader}>
          <p className={styles.storeHomeItemTitle}>해피수산</p>
          <p className={styles.storeHomeItemBoxReview}>
            <img className={styles.storeHomeItemFresh}src="/fresh.png"/>5.0
          </p>
        </div>
        <div>
        <p className={styles.storeHomeItemBoxReview}>
        <img className={styles.storeHomeItemStateIcon} src="/heart.png"/>영업중</p>
        </div>
        {/* <Button className={styles.storeHomeItemDetailBoxMore}>
          <Link to="/" variant="primary">더보기</Link>
        </Button> */}
      </Card>
    </Link>
    </>
  )
}

export default StoreHomeItem;