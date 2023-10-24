import React, {useEffect, useState} from 'react';
import axios from 'axios';
//import Announce from '/components/MainPage/Announce';
import AdminNoticeListItem from './AdminNoticeListItem';
import { Routes, Route } from 'react-router-dom';
import styles from '../Notice/NoticeList.css'


function AdminNoticeList() {

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
      <AdminNoticeListItem data={data}/>
    </div>
    </>
  )
}

export default AdminNoticeList;