import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useUser } from '../Auth/UserContext';
import { sendAxiosRequest } from '../utility/common';




function Header() {

  const {user, login, logout} = useUser();
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
    // let [loginUser, setLoginUser] = useState(null);
  // useEffect(() => {
  //   if (loginUser == null) {
  //     sendAxiosRequest("/api/member/loginCheck", "GET", null,
  //       response => {
  //         let repLoginUser = response.data.loginUser;
  //         if (repLoginUser != null) {
  //           setLoginUser(repLoginUser);
  //           login(repLoginUser);
  //         }
  //       }, error => console.log(error));
  //   }
  // }, [loginUser]
  // )

  // const loginState = (loginUser == null) ?
  //   <Link to='/login'>로그인</Link> :
  //   <Link to='/mypage'>{loginUser.memberEmail}님</Link>;

  const logoutCall = () => {
      sendAxiosRequest("/api/member/logout", "GET", null,
          response => {
              const message = response.data.message;
              if (message != null && message == 'Logout successful') {
                  alert('로그아웃에 성공하였습니다!');
                  // setLoginUser(null);
                  logout();
              }
          }, error => console.log(error));
  }
  const onClick = () => {
    // logout();
    logoutCall();
    localStorage.removeItem('memberEmail');
    localStorage.removeItem('memberPwd');
  }

  // const logoutState = (user === null) ?
  // <Link to='/register'>회원가입</Link> :
  // <Link to='/' onClick={onClick}>로그아웃</Link>;

  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.headerTop}>
          <Link to="/" id={styles.headerTitle}>BLEU AUCTION</Link>
          <form className={styles.headerSearchForm}>
            <input className={styles.headerSearchBox} type='text' placeholder='검색어를 입력하세요.'></input>
            <button id={styles.searchBtn} type="submit"></button>
          </form>
          {user == null ? (<Link to='/login'>로그인</Link>) : (<Link to='/mypage'>{user.memberName}님 환영합니다!</Link>)}
          {user == null ? (<Link to='/register'>회원가입</Link>) : (<Link onClick={logoutCall}>로그아웃</Link>)}
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