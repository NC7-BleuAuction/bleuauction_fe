import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../lib/common';
import { useUser } from '../components/Auth/UserContext';
import styles from '../components/MyPage/MyPageContainer.module.css';
import { useState } from 'react';

import UserEditPage from '../components/MyPage/UserEditPage';
import MenuEdit from '../components/MyPage/MenuEdit';
import StoreEditPage from '../components/MyPage/StoreEdit';
import StoreOrder from '../components/MyPage/StoreOrder';
import StoreRegisterPage from '../components/MyPage/StoreRegisterPage';
import MyOrder from '../components/MyPage/MyOrder';
import AdminNoticeList from '../components/Admin/AdminNoticeList';



function MyPageContainer() {

  const { user, login } = useUser();
  const defaultImage = '/images/rose.png';
  const accessToken = sessionStorage.getItem('accessToken');
  const member = isTokenExpired(accessToken) ? null : jwtDecode(accessToken);

  const [page, setPage] = useState('');

  const stateBar = member.memberCategory === 'M'
  ? {'회원정보수정' : <UserEditPage/>, '마이오더' : <MyOrder/>}
  : member.memberCategory === 'S'
  ? {'회원정보수정' : <UserEditPage/>, '메뉴관리' : <MenuEdit/>, '가게수정' : <StoreEditPage/>, '주문확인' : <StoreOrder/>, '가게등록' : <StoreRegisterPage/>}
  : member.memberCategory === 'A'
  ? {'공지사항관리' : <AdminNoticeList/>}
  : undefined

  console.log('user', useUser());

  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div className={styles.outerContainerStyle}>
        <div className={styles.container}>

          <div className={styles.baseContainer}>

            <div className={styles.profileSection}>
              <img
                src={defaultImage}
                alt={member.memberName}
                className={styles.profilePicture}
              />
              <div className={styles.userInfo}>
                <h2>{member.memberName}</h2>
                <p>
                  {' '}
                  {member.memberCategory === 'M'
                    ? '개인'
                    : member.memberCategory === 'S'
                    ? '비즈니스'
                    : member.memberCategory === 'A'
                    ? '관리자'
                    : '기타'}
                  계정
                </p>
                <p>{member.memberEmail}</p>
              </div>
            </div>

            <div className={styles.stateBar}>
              {Object.keys(stateBar).map((state) => (
                <div key = {state}
                className={page === state ? styles.selected : styles.not_selected}
                onClick={() => {
                  setPage(state);
                }}>
                  <p className={styles.link}>{state}</p>
                </div>
              ))}
            </div>

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
