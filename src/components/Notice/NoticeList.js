import React, {useEffect, useState} from 'react';
import axios from 'axios';
//import Announce from '/components/MainPage/Announce';
import NoticeListItem from './NoticeListItem';
import { Routes, Route } from 'react-router-dom';
import styles from './NoticeList.css'


function NoticeList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/notice')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
      // console.log(data);
  }, []);

  return (
    <>
    <div className={styles.storeListBox}>
      <NoticeListItem data={data}/>
    </div>
    </>
  )
}

export default NoticeList;