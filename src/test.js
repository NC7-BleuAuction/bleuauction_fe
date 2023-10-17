import { sendAxiosRequestReview } from './Review'
import React, { useState } from 'react';

function ReviewForm({ addReview }) {
  const [review, setReview] = useState(''); // 리뷰 텍스트 상태
  const [file, setFile] = useState(null); // 선택된 파일 상태


  // 리뷰 텍스트가 변경될 때 호출되는 핸들러
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // 파일 선택이 변경될 때 호출되는 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 제출 버튼을 클릭했을 때 호출되는 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    console.log('Submitted Review:', review);
    console.log('Submitted File:', file);
    // 여기에 서버로 리뷰 및 파일 데이터 전송 로직을 추가?

    addReview({ text: review, user: { name: 'Username', profilePicture: '/image/rose.png' } });
    setReview('');
  };

  return (
    <form id="reviewWriteForm">
      <div style={formContainer}>
        <div style={profileContainer}>
          <img src="/images/rose.png" alt="profile" style={profilePicture} />
          <span>회원이름</span>
        </div>
        <textarea value={review} onChange={handleReviewChange} placeholder="리뷰를 입력하세요" style={textareaStyle} />
        <div style={buttonContainerStyle}>
          <input type="file" onChange={handleFileChange} style={fileInputStyle} />
          <button onClick={handleSubmit} style={submitButtonStyle}>리뷰등록</button>
        </div>
      </div>
    </form>
  );
}

const formContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f0f0f0',
  width: '70%',
  margin: '0 auto', // 중앙 배치

};

const profileContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '80%',
  marginBottom: '10px',
};


const profilePicture = {
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  marginRight: '10px',
};




export default ReviewForm;
