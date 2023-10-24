import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sendAxiosRequest } from '../utility/common';

const accessToken = sessionStorage.getItem('accessToken');

function NoticeRegisterationForm() {
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
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
            <h2>공지사항 등록</h2>
            <div className="mb-3">
              <label htmlFor="noticeTitle" className="form-label">제목</label>
              <input
                type="text"
                id="noticeTitle"
                name="noticeTitle"
                value={notice.noticeTitle}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="noticeContent" className="form-label">내용</label>
              <textarea
                id="noticeContent"
                name="noticeContent"
                value={notice.noticeContent}
                onChange={handleChange}
                className="form-control"
                rows="10"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              등록
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoticeRegisterationForm;
