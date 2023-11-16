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
    axios.get('/api/store/list')
      .then(response => {setData(response.data)})
      .catch(error => console.log(error));
      console.log('너누구야 후아유?!', data);
  }, []);

  return (
    <>
    <Announce/>
    <button onClick={()=>{
      }}>
      {data.length > 0 ? data[0].reviewContent : ''}
    </button>
    <div className={styles.storeListBox}>
      <StoreListItem data={data}/>
    </div>
    </>
  )
}

export default StoreList;