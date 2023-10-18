import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Announce from '../MainPage/Announce';
import Coupon from '../MainPage/Announce';
import Category from '../MainPage/Category';
import StoreListItem from './StoreListItem';
import StoreHome from '../StoreHome';
import { Routes, Route } from 'react-router-dom';
import styles from './StoreList.module.css'
import { sendAxiosRequest, sendAxiosMultipartRequest, dateFormatParse, handleInputChange, scrollMoveTop } from '../utility/common';

function StoreList() {
  const pageRowCnt = 3;
  let [startPageNo, setStartPageNo] = useState(0);
  let [storeList, setStoreList] = useState([]);
  let [newAddLength, setNewAddLength] = useState(pageRowCnt);

  useEffect(() => {
    const handleScroll = () => {
      console.log(newAddLength);
      if (newAddLength < pageRowCnt) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {

        console.log("스크롤 이벤트 핸들러 작동");
        sendAxiosRequest(`/api/store/list?startPage=${startPageNo}`, 'GET', null, response => {
          console.log(response.data);
          let addReviewList = response.data;
          setNewAddLength(addReviewList.length);
          let newReviewList = [...storeList, ...addReviewList];

          setStartPageNo(Math.floor(newReviewList.length / pageRowCnt));
          setStoreList(newReviewList);
        }, error => console.log(error))
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [startPageNo, storeList]);

  useEffect(() => {
    sendAxiosRequest("/api/store/list", "GET", null,
      response => {
        console.log(response.data);
        setStoreList(response.data);
        setNewAddLength(response.data.length);
        setStartPageNo(Math.floor(newAddLength / pageRowCnt));
      }, error => console.log(error));
  }, []);



  return (
    <>
      <Announce />
      <div className={styles.storeListBox}>
        {storeList.map((store, index) => (
          <StoreListItem key={index} data={store} />
        ))}
      </div>
    </>
  )
}

export default StoreList;