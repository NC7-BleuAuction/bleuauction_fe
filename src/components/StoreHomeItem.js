import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './StoreHomeItem.module.css';
import { Link, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from "react-router-dom";



function StoreHomeItem({store}) {

  function isCurrentTimeInRange(startTime, endTime) {
    // 현재 날짜와 시간을 생성
    const currentDate = new Date();
    // 시작 시간과 종료 시간을 파싱 (예: "08:00" 형식)

    // 현재 시간이 시작 시간과 종료 시간 사이에 있는지 확인
    return currentDate >= startTime && currentDate <= endTime;
  }

  const startTime = new Date();
  const [startHours, startMinutes, startSecond] = store.weekdayStartTime.split(':');
  startTime.setHours(parseInt(startHours, 10));
  startTime.setMinutes(parseInt(startMinutes, 10));
  // startTime.setSecond(parseInt(startSecond, 10));

  const endTime = new Date();
  const [endHours, endMinutes, endSecond] = store.weekdayEndTime.split(':');
  endTime.setHours(parseInt(endHours, 10));
  endTime.setMinutes(parseInt(endMinutes, 10));
  // endTime.setSecond(parseInt(endSecond, 10));


  const isWorking = isCurrentTimeInRange(startTime, endTime) ? '영업중' : '영업 종료';
  const isWorkingIcon = isCurrentTimeInRange(startTime, endTime) ? '/images/heart.png' : '/images/closed.jpg';

  // console.log(store);



  return (
    <>
    <Link to={'/market/detail'}
      state= {store}
      className={styles.storeHomeItemDetailBoxMore}>
      <Card style={{ width: '18rem' }}>
        {/* <p>가게 이름: {store.storeName}</p> */}
            {store.storeAttaches && store.storeAttaches[0] ? (
              <img
                src={`https:kr.object.ncloudstorage.com/bleuauction-bucket/store/${store.storeAttaches[0].saveFilename}`}
                alt={store.storeAttaches[0].originFilename }
                className={styles.storeHomeItemBoss}
              />
            ) : (
              <img src="/images/boss.png" alt="store" className={styles.storeHomeItemBoss}/>
            )}
            {/* 가게 정보의 나머지 부분도 표시 */}
        <div className={styles.storeHomeItemHeader}>
          <p className={styles.storeHomeItemTitle}>{store.storeName}</p>
          {/* <p className={styles.storeHomeItemTitle}>{store.marketName}</p> */}

          {/* <p className={styles.storeHomeItemBoxReview}>
            <img className={styles.storeHomeItemFresh}src="/images/fresh.png"/>5.0
          </p> */}
        </div>
        <div>
        <p className={styles.storeHomeItemBoxReview}>
        <img className={styles.storeHomeItemStateIcon} src={ isWorkingIcon }/>{isWorking}</p>
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