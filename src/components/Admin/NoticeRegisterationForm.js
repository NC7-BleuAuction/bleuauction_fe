import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest } from '../../lib/common';

function NoticeRegisterationForm() {
  const accessToken = sessionStorage.getItem('accessToken');
  const [notice, setNotice] = useState({
    noticeTitle: 'title',
    noticeContent: 'content',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice({ ...notice, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    // let formObj = formToJSON(formData);
    sendAxiosRequest(
      `/api/notice/new`,
      'POST',
      formData,
      (response) => {
        console.log('응답값:', response.data);
        alert('공지사항이 등록 되었습니다.');
        navigate('/admin/notice/list');
      },
      (error) => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('공지사항 등록에 실패하셨습니다!');
      },
      null,
      accessToken
    );
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>공지사항 등록</h2>
        <div>
          <label>제목 </label>
          <input
            style={styles.input}
            type="text"
            name="noticeTitle"
            value={notice.noticeTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>내용 </label>
          <input
            style={styles.input}
            type="text"
            name="noticeContent"
            value={notice.noticeContent}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          등록
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 폼 내용을 중앙 정렬합니다.
    padding: '20px', // 내부 패딩을 추가합니다.
    borderRadius: '12px', // 모서리를 둥글게 합니다.
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // 약간의 그림자 효과를 추가합니다.
    background: 'white', // 배경색을 흰색으로 설정합니다.
    width: '800px',
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '300px',
  },
  submitButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#0575E6',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
  },
};

export default NoticeRegisterationForm;
