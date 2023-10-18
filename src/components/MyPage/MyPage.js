import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosMultipartRequest, sendAxiosRequest } from '../utility/common';



function MyPage() {
  // 사용자 정보를 상태 혹은 API로부터 불러오기.
  // 예시
  const user = {
    name: 'Rose',
    email: 'rose@example.com',
    accountType: 'personal', // or 'business'
    profilePicture: '/images/rose.png',
  };

  const defaultImage = '/images/rose.png';

  const [member, setMember] = useState(null);

  useEffect(() => {
    sendAxiosRequest('api/member/loginCheck', 'GET', null, response => {
      let loginUser = response.data.loginUser;
      setMember(loginUser);
    }, error => console.log(error))
  }

    , []);

  const outerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '0',
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // 가운데 정렬 추가
      padding: '20px',
      width: '70%',
      height: '70vh', // 화면 높이의 100%를 차지하도록 설정
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      width: '100%', //
    },
    profilePicture: {
      width: '110px',
      height: '110px',
      borderRadius: '80px',
      marginRight: '20px', // 사진과 텍스트 사이의 간격을 조정

    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start', // 왼쪽 정렬
    },
    linkSection: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    linkContainer: {
      margin: '20px 0',
      padding: '20px',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'bold',
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      margin: '5px 0',
      backgroundColor: '#4CAF50',
      color: 'white',
      textDecoration: 'none',
      textAlign: 'center',
      borderRadius: '8px',
    },
  };
  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div style={outerContainerStyle}>
        <div style={styles.container}>
          <div style={styles.profileSection}>
            <img src={defaultImage} alt={user.name} style={styles.profilePicture} />
            <div style={styles.userInfo}>
              <h2 >{member.memberName}</h2>
              <p>{member.memberCategory === 'M' ? '개인' : '비즈니스'} 계정</p>
              <p>{member.memberEmail}</p>
            </div>
          </div>



          <div style={styles.linkSection}>
            <div style={styles.linkContainer}>
              <Link to="/useredit" style={styles.link}>회원정보 수정</Link>
            </div>
            <div style={styles.linkContainer}>
              <Link to="/coupons" style={styles.link}>쿠폰함</Link>
            </div>
            <div style={styles.linkContainer}>
              <Link to="/my-orders" style={styles.link}>마이 오더</Link>
            </div>
            <div style={styles.linkContainer}>
              <Link to="/wishlist" style={styles.link}>찜하기</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default MyPage;
