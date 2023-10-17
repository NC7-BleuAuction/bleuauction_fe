import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHomeItem.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from "react-router-dom";



function StoreHomeItem({store}) {
  function isCurrentTimeInRange(startTime, endTime) {
    // 현재 날짜와 시간을 생성
    const currentDate = new Date();
    // 시작 시간과 종료 시간을 파싱 (예: "08:00" 형식)
    const parsedStartTime = new Date(`1970-01-01T${startTime}`);
    const parsedEndTime = new Date(`1970-01-01T${endTime}`);
    
    // 현재 시간이 시작 시간과 종료 시간 사이에 있는지 확인
    return currentDate >= parsedStartTime && currentDate <= parsedEndTime;
  }

  const startTime = new Date(store.weekdayStartTime);
  const endTime = new Date(store.weekdayEndTime);
  const isWorking = isCurrentTimeInRange(startTime, endTime) ? '영업중' : '영업 종료';


  return (
    <>
    <Link to="/market/detail" className={styles.storeHomeItemDetailBoxMore}>
      <Card style={{ width: '18rem' }}>
        <img className={styles.storeHomeItemBoss} variant="top" src="/images/boss.png" />
        <div className={styles.storeHomeItemHeader}>
          <p className={styles.storeHomeItemTitle}>{store.storeName}</p>
          <p className={styles.storeHomeItemBoxReview}>
            <img className={styles.storeHomeItemFresh}src="/images/fresh.png"/>5.0
          </p>
        </div>
        <div>
        <p className={styles.storeHomeItemBoxReview}>
        <img className={styles.storeHomeItemStateIcon} src="/images/heart.png"/>{isWorking}</p>
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