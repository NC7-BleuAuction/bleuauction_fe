import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';




function Header() {

  const { user, logout } = useUser();
  // let [loginUser, setLoginUser] = useState(null);

  // useEffect (()=>{
  //   sendAxiosRequest("/api/member/loginCheck", "GET", null,
  //   response => {
  //     let repLoginUser = response.data.loginUser;
  //     if (repLoginUser !== null) {
  //       setLoginUser(repLoginUser);
  //     }
  //   }, error => console.log(error));}, []
  // )


  const loginState = (user === null) ?
    <Link to='/login'>로그인</Link> :
    <Link to='/mypage'>{user?.memberEmail}님</Link>;
  // null;

  const onClick = () => {
    logout();
    localStorage.removeItem('memberEmail');
    localStorage.removeItem('memberPwd');
  }

  const logoutState = (user === null) ?
    <Link to='/register'>회원가입</Link> :
    <Link to='/' onClick={onClick}>로그아웃</Link>;

  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.headerTop}>
          <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
          <form className={styles.headerSearchForm}>
            <input className={styles.headerSearchBox} type='text' placeholder='검색어를 입력하세요.'></input>
            <button id={styles.searchBtn} type="submit"></button>
          </form>
          {/* <Link to='/login'>로그인</Link> */}
          {loginState}
          {logoutState}
          {/* <Link to='/register'>회원가입</Link> */}
          <Link to="/api/test" >test</Link>
          <Link to='/market/detail'>가게1</Link>
          <Link to='/my-orders'>주문상세</Link>

        </div>


        <div className={styles.headerBottom}>
          <Link to='/'>추천</Link>
          <Link to='/store/list'>시장</Link>
          <Link to='/StoreItemDailyPrice'>시세</Link>
          <Link to='/'>공지사항</Link>
        </div>
        <hr></hr>
      </div>
      <div className={styles.hidden_block}></div>
    </>
  )
}

export default Header;