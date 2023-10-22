import React, { useEffect, useState } from 'react';
import { axios, formToJSON } from 'axios';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';
import { sendAxiosRequest, getAccessToken, getLoginUserInfo, logout, accessTokenRefresh, isNullUndefinedOrEmpty } from '../utility/common';
import jwtDecode from 'jwt-decode';




function Header() {
  const accessToken = isNullUndefinedOrEmpty(sessionStorage.getItem('accessToken'));
  const refreshToken = isNullUndefinedOrEmpty(localStorage.getItem('refreshToken'));

  console.log('Header.js => accessToken: ', accessToken);
  console.log('Header.js => refreshToken: ', refreshToken);

  let loginInit
  if (!accessToken && refreshToken) { // accessToken은 유효하지 않으면서 refreshToken이 유효한 경우
    console.log('accessTokenRefresh(): ', accessTokenRefresh()); // accessToken 재발급 
  } else if (!accessToken && !refreshToken) { // 둘다 유효하지 않은 경우

  } else { // 둘다 유효하거나 accessToken만 유효한 경우
    loginInit = isNullUndefinedOrEmpty(getAccessToken('d')) ? getLoginUserInfo(getAccessToken('d')) : null;
  }
  console.log('Header.js => loginInit: ', loginInit);

  const [loginUser, setLoginUser] = useState(isNullUndefinedOrEmpty(loginInit));


  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.headerTop}>
          <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
          <form className={styles.headerSearchForm}>
            <input className={styles.headerSearchBox} type='text' placeholder='검색어를 입력하세요.'></input>
            <button id={styles.searchBtn} type="submit"></button>
          </form>
          {loginUser == null ? (<Link to='/login'>로그인</Link>) : (<Link to='/mypage'>{loginUser.username}님 환영합니다!</Link>)}
          {loginUser == null ? (<Link to='/register'>회원가입</Link>) : (<Link onClick={logout}>로그아웃</Link>)}
          {/* <Link to="/api/test" >test</Link> */}
          {/* <Link to='/market/detail'>가게1</Link> */}
          <Link to='/my-orders'>주문상세</Link>

        </div>


        <div className={styles.headerBottom}>
          <Link to='/'>추천</Link>
          <Link to='/store/list'>시장</Link>
          <Link to='/StoreItemDailyPrice'>시세</Link>
          <Link to='/notice/list'>공지사항</Link>
        </div>
        <hr></hr>
      </div>
      <div className={styles.hidden_block}></div>
    </>
  )
}

export default Header;