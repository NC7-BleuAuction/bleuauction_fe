import React from 'react';

function ReviewList({ reviews }) {

    
  return (
    <div style={listContainer}>
      {reviews.map(review => (
        <div key={review.id} style={reviewContainer}>
          <div style={profileContainer}>
            <img src={review.user.profilePicture} alt={review.user.name} style={profilePicture} />
            <span>{review.user.name}</span>
          </div>
          <p>{review.text}</p>
          {review.image && <img src={review.image} alt="review" style={reviewImage} />}
        </div>
      ))}
    </div>
  );
}

// 스타일 객체
const listContainer = {
  padding: '0px',
  width: '70%', // 원하는 너비로 설정
  margin: '0 auto', // 중앙 배치를 위한 스타일
};

const reviewContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
  margin: '10px 0',
};

const profileContainer = {
  display: 'flex',
  alignItems: 'center',
};

const profilePicture = {
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  marginRight: '10px',
};

const reviewImage = {
  maxWidth: '100%', // 이미지가 컨테이너의 너비를 초과하지 않도록 설정
  height: 'auto',
};

export default ReviewList;
