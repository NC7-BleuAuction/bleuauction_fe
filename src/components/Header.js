import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Header.module.css';
import { Link }  from 'react-router-dom';




function Header() {
  return (
    <div className={styles.headerBox}>
      <div className={styles.headerTop}>
          <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
            <form className={styles.headerSearchForm}>
              <input className={styles.headerSearchBox} type='text' placeholder='검색어를 입력하세요.'></input>
              <button id={styles.searchBtn} type="submit"></button>
            </form>
          <Link to='/login'>로그인</Link>
          <Link to='/'>회원가입</Link>
          <Link to="/api/test" >test</Link>
      </div>


      <div className={styles.headerBottom}>
          <Link to='/'>추천</Link>
          <Link to='/'>시장</Link>
          <Link to='/'>시세</Link>
          <Link to='/'>공지사항</Link>
      </div>
    </div>
  )
}

export default Header;