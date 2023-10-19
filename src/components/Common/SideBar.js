import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';


function SideBar() {
  return (
    <div className={styles.sideBarBox}>
      {/* <Link to='/MenuRegisterationForm'>등록</Link> */}
      <Link to='/StoreItemAdd'>등록</Link>
      <Link to='/'>오늘의 <br/>방사능</Link>
      <Link to='/'>챗봇</Link>
    </div>
  )
}

export default SideBar;