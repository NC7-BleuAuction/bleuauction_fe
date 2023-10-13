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
  return (
    <>
    <Announce/>
    <div className={styles.storeListBox}>
      {/* <Coupon/> */}
      <StoreListItem/>
      <StoreListItem/>
      <StoreListItem/>
      <StoreListItem/>
      <StoreListItem/>
    </div>
    </>
  )
}

export default StoreList;