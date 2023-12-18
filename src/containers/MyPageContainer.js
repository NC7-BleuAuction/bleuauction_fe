import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../lib/common';
import styles from '../components/MyPage/MyPageContainer.module.css';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserState } from '../modules/login';

import UserEditPage from '../components/MyPage/UserEditPage';
import MenuEdit from '../components/MyPage/MenuEdit';
import StoreEditPage from '../components/MyPage/StoreEdit';
import StoreOrder from '../components/MyPage/StoreOrder';
import StoreRegisterPage from '../components/MyPage/StoreRegisterPage';
import MyOrder from '../components/MyPage/MyOrder';
import AdminNoticeList from '../components/Admin/AdminNoticeList';
import MyPageProfile from '../components/MyPageProfile';
import MyPageStateBar from '../components/MyPageStateBar';



function MyPageContainer() {

  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const member = loginUser;

  const [page, setPage] = useState('');

  const stateBar = member.memberCategory === 'M'
  ? {'회원정보수정' : <UserEditPage/>, '마이오더' : <MyOrder/>}
  : member.memberCategory === 'S'
  ? {'회원정보수정' : <UserEditPage/>, '메뉴관리' : <MenuEdit/>, '가게수정' : <StoreEditPage/>, '주문확인' : <StoreOrder/>, '가게등록' : <StoreRegisterPage/>}
  : member.memberCategory === 'A'
  ? {'공지사항관리' : <AdminNoticeList/>}
  : undefined

  console.log('user', loginUser);

  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div className={styles.outerContainerStyle}>
        <div className={styles.container}>

          <div className={styles.baseContainer}>    
            <MyPageProfile member = {member}/>
            <MyPageStateBar member = {member} stateBar = {stateBar} page = {page} setPage = {setPage}/>
          </div>

          <div className={styles.state}>
              { stateBar[page] }
          </div>

        </div>
      </div>
    );
  }
}
export default MyPageContainer;
