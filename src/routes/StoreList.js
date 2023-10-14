import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import Coupon from '../components/MainPage/Announce';
import Category from '../components/MainPage/Category';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { Routes, Route } from 'react-router-dom';
import styles from './StoreList.module.css'



function StoreList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/review/list/sendAxios')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
      // console.log(data);
  }, []);

  return (
    <>
    <Announce/>
    <button onClick={()=>{
      console.log(data);
      }}>
      {data.length > 0 ? data[0].reviewContent : ''}
    </button>
    <div className={styles.storeListBox}>
      {/* <Coupon/> */}
      <StoreListItem data={data}/>
    </div>
    </>
  )
}

export default StoreList;