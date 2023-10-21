import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { isOpenNow, sendAxiosRequest } from '../utility/common';
import { useUser } from '../Auth/UserContext';

function MyPage() {
  // 사용자 정보를 상태 혹은 API로부터 불러오기.
  // 예시
  // const user = {
  //   name: 'Rose',
  //   email: 'rose@example.com',
  //   accountType: 'personal', // or 'business'
  //   profilePicture: '/images/rose.png',
  // };

  const defaultImage = '/images/rose.png';

  const [member, setMember] = useState(null);

  const { user, login, logout } = useUser();

  console.log(user)

  // useEffect(() => {
  //   sendAxiosRequest('api/member/loginCheck', 'GET', null, response => {
  //     let loginUser = response.data.loginUser;
  //     setMember(loginUser);
  //   }, error => console.log(error))
  // }
  //   , []);


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
      height: '30vh', // 화면 높이의 100%를 차지하도록 설정
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
  const personalLinks = (
    <>
      <div style={styles.linkContainer}>
        <Link to="/useredit" style={styles.link}>회원정보 수정</Link>
      </div>
      <div style={styles.linkContainer}>
        <Link to="/" style={styles.link}>마이 오더</Link>
      </div>
      <div style={styles.linkContainer}>
        <Link to="/" style={styles.link}>찜하기</Link>
      </div>
    </>
  );

  // 비즈니스 사용자용 링크
  const businessLinks = (
    <>
      <div style={styles.linkContainer}>
        <Link to="/useredit" style={styles.link}>회원정보 수정</Link>
      </div>
      <div style={styles.linkContainer}>
        <Link to="/" style={styles.link}>등록상품관리</Link>
      </div>
      <div style={styles.linkContainer}>
        <Link to="/order-confirmation" style={styles.link}>주문확인</Link>
      </div>
      <div style={styles.linkContainer}>
        <Link to="/storeRegister" style={styles.link}>가게등록</Link>
      </div>
      <div style={styles.linkContainer}>
              <Link to="/StoreEditPage" style={styles.link}>가게정보수정</Link>
            </div>
    </>
  );

  // 관리자 사용자용 링크
  const adminLinks = (
    <>
      <div style={styles.linkContainer}>
        <Link to="/admin/notice/list" style={styles.link}>공지사항 관리</Link>
      </div>

    </>
  );

  if (user === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
  return (
    <div style={outerContainerStyle}>
      <div style={styles.container}>
        <div style={styles.profileSection}>
          <img src={defaultImage} alt={user.memberName} style={styles.profilePicture} />
          <div style={styles.userInfo}>
            <h2>{user.memberName}</h2>
            <p> {user.memberCategory === 'M' ? '개인' : 
                  user.memberCategory === 'S' ? '비즈니스' :
                  user.memberCategory === 'A' ? '관리자' : '기타'}
                  계정</p>
            <p>{user.memberEmail}</p>
          </div>
        </div>

        <div style={styles.linkSection}>
          {/* member.memberCategory 값에 따라 링크 섹션을 조건부로 렌더링합니다. */}
           {/* member.memberCategory 값에 따라 링크 섹션을 조건부로 렌더링합니다. */}
          {user.memberCategory === 'M' ? personalLinks : 
          user.memberCategory === 'S' ? businessLinks :
          user.memberCategory === 'A' ? adminLinks : undefined}
        </div>
      </div>
    </div>
  );
}

}
export default MyPage;