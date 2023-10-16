import React from 'react';
import { Link } from 'react-router-dom';

function StoreMyPage() {
  // 사용자 정보를 상태 혹은 API로부터 불러오기.
  // 예시
  const user = {
    name: '김선생',
    email: 'fish@example.com',
    accountType: 'business',
    profilePicture: '/images/storeimage.png',
  };

  return (
    <div style={outerContainerStyle}>
    <div style={styles.container}>
      <div style={styles.profileSection}>
        <img src={user.profilePicture} alt={user.name} style={styles.profilePicture} />
        <div style={styles.userInfo}>
          <h2>{user.name}</h2>
          <p>{user.accountType === 'personal' ? '개인' : '비즈니스'} 계정</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div style={styles.linkSection}>
  <div style={styles.linkContainer}>
    <Link to="/storeEdit" style={styles.link}>회원정보 수정</Link>
  </div>
  <div style={styles.linkContainer}>
    <Link to="/re-item" style={styles.link}>등록 상품 관리</Link>
  </div>
  <div style={styles.linkContainer}>
    <Link to="/order-check" style={styles.link}>주문확인</Link>
  </div>
  <div style={styles.linkContainer}>
    <Link to="/wishlist" style={styles.link}>가게등록</Link>
  </div>
</div>
    </div>
    </div>
  );
}

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

export default StoreMyPage;
