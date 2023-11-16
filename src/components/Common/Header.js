import React, { useEffect, useState } from 'react';
import { axios, formToJSON } from 'axios';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';
import {
  redirectLogin,
  getAccessToken,
  getLoginUserInfo,
  logout,
  accessTokenRefresh,
  isNullUndefinedOrEmpty,
  mainUrl,
  isTokenExpired
} from '../utility/common';
import jwtDecode from 'jwt-decode';


function Header() {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const decodedAccToken = isTokenExpired(accessToken) ? null : jwtDecode(accessToken);
  const decodedRefToken = isTokenExpired(refreshToken) ? null : jwtDecode(refreshToken);
  const currentURL = window.location.href;
  const [tokenMember, setTokenMember] = useState(accessToken);

  console.log('Header.js => accessToken 디코딩값 : ', decodedAccToken);
  console.log('Header.js => refreshToken 디코딩값 : ', decodedRefToken);
  // console.log('(currentURL.replace(mainUrl)', currentURL.replace(mainUrl, ''));

  useEffect(() => {
    if (isTokenExpired(accessToken)) { // accessToken이 유효하지 않은경우
      setTokenMember(null);
    } else { // 둘다 유효하거나 accessToken만 유효한 경우
      console.log('Header.js => accessToken만 유효 OR accessToken과 refreshToken 모두 유효');
      setTokenMember(getAccessToken('d')); //엑세스토큰 디코딩 한 값 으로 tokenMember 객체 초기화
    }
  }, [])

  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.headerTop}>
          <div>
            <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
            <img src='/images/cuteLogo.jpg' alt='cute'/>
          </div>
          {/* <form className={styles.headerSearchForm}>
            <input className={styles.headerSearchBox} type='text'
              placeholder='검색어를 입력하세요.'></input>
            <button id={styles.searchBtn} type="submit"></button>
          </form> */}
          <div/>
          {isNullUndefinedOrEmpty(tokenMember) ? (
            <>
              <Link to='/mypage'>{tokenMember.memberName}님 환영합니다!</Link>
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