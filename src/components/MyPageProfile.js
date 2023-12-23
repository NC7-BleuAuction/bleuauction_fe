import React from 'react';
import styles from './MyPage/MyPageContainer.module.css';

function MyPageProfile({ member }) {
  const defaultImage = '/images/rose.png';

  return (
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
  );
}

export default MyPageProfile;
