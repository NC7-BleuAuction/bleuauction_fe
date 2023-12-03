import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../lib/common';
import { useUser } from '../Auth/UserContext';
import styles from './MyPageContainer.module.css';
import { useState } from 'react';

import UserEditPage from './UserEditPage';
import MenuEdit from './MenuEdit';
import StoreEditPage from './StoreEdit';
import StoreOrder from './StoreOrder';
import StoreRegisterPage from './StoreRegisterPage';
import MyOrder from './MyOrder';
import AdminNoticeList from '../Admin/AdminNoticeList';



function MyPage() {
  // 사용자 정보를 상태 혹은 API로부터 불러오기.
  // 예시
  // const user = {
  //   name: 'Rose',
  //   email: 'rose@example.com',
  //   accountType: 'personal', // or 'business'
  //   profilePicture: '/images/rose.png',
  // };

  const { user, login } = useUser();
  const defaultImage = '/images/rose.png';
  const accessToken = sessionStorage.getItem('accessToken');
  const member = isTokenExpired(accessToken) ? null : jwtDecode(accessToken);

  console.log('user', useUser());


  const personalLinks = (
    <>
      <div className={styles.linkContainer}>
        <Link to="/useredit" className={styles.link}>
          회원정보 수정
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/my-orders" className={styles.link}>
          마이 오더
        </Link>
      </div>
    </>
  );

  // 비즈니스 사용자용 링크
  const businessLinks = (
    <>
      <div className={styles.linkContainer}>
        <Link to="/useredit" className={styles.link}>
          회원정보 수정
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/menuEdit" className={styles.link}>
          메뉴 관리
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/mypage/store/edit" className={styles.link}>
          가게수정
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/order-confirmation" className={styles.link}>
          주문확인
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/storeRegister" className={styles.link}>
          가게등록
        </Link>
      </div>
    </>
  );

  // 관리자 사용자용 링크
  const adminLinks = (
    <>
      <div className={styles.linkContainer}>
        <Link to="/admin/notice/list" className={styles.link}>
          공지사항 관리
        </Link>
      </div>
    </>
  );

  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div className={styles.outerContainerStyle}>
        <div className={styles.container}>
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

          <div className={styles.linkSection}>
            {/* member.memberCategory 값에 따라 링크 섹션을 조건부로 렌더링합니다. */}
            {member.memberCategory === 'M'
              ? personalLinks
              : member.memberCategory === 'S'
              ? businessLinks
              : member.memberCategory === 'A'
              ? adminLinks
              : undefined}
          </div>
        </div>
      </div>
    );
  }
}
export default MyPage;
