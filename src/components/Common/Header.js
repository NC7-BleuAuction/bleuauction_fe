import React, { useEffect, useState } from 'react';
import { axios, formToJSON } from 'axios';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';
import { refreshTokenInvalid, getAccessToken, getLoginUserInfo, logout, accessTokenRefresh, isNullUndefinedOrEmpty, mainUrl } from '../utility/common';
import jwtDecode from 'jwt-decode';


function Header() {
  const accessToken = isNullUndefinedOrEmpty(sessionStorage.getItem('accessToken'));
  const refreshToken = isNullUndefinedOrEmpty(localStorage.getItem('refreshToken'));
  const currentURL = window.location.href;
  console.log('mainUrl: ' + mainUrl);
  console.log('Header.js => accessToken: ', accessToken);
  console.log('Header.js => refreshToken: ', refreshToken);
  console.log('(currentURL.replace(mainUrl)', currentURL.replace(mainUrl, ''));


  let loginInit
  if (!accessToken && refreshToken) { // accessToken은 유효하지 않으면서 refreshToken이 유효한 경우
    console.log('Header.js => accessToken (X) && refreshToken (O)');
    if (currentURL.replace(mainUrl, '') !== '/') {
      console.log('accessTokenRefresh(): ', accessTokenRefresh()); // accessToken 재발급 
    }
  } else if (!accessToken && !refreshToken) { // 둘다 유효하지 않은 경우
    console.log('Header.js => accessToken (X) && refreshToken (X)');
    if (currentURL.replace(mainUrl, '') !== '/') {
      refreshTokenInvalid();
    }
  } else { // 둘다 유효하거나 accessToken만 유효한 경우
    console.log('Header.js => accessToken만 유효 OR accessToken과 refreshToken 모두 유효');
    loginInit = isNullUndefinedOrEmpty(getAccessToken('d')) ? getLoginUserInfo(getAccessToken('d')) : null;
  }


  const isUserLoggedIn = isNullUndefinedOrEmpty(loginInit);

  console.log('Header.js => isUserLoggedIn: ', isUserLoggedIn);

  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.headerTop}>
          <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
          <form className={styles.headerSearchForm}>
            <input className={styles.headerSearchBox} type='text' placeholder='검색어를 입력하세요.'></input>
            <button id={styles.searchBtn} type="submit"></button>
          </form>
          {isUserLoggedIn ? (
            <>
              <Link to='/mypage'>{loginInit.username}님 환영합니다!</Link>
              <Link onClick={logout}>로그아웃</Link>
            </>
          ) : (
            <>
              <Link to='/login'>로그인</Link>
              <Link to='/register'>회원가입</Link>
            </>
          )}
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