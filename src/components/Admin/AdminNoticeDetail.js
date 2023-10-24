import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';

const accessToken = sessionStorage.getItem('accessToken');

function AdminNoticeDetail() {
  const { noticeNo } = useParams();
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [notice, setNotice] = useState(null);

  console.log('보내기 전 noticeNo 확인:', noticeNo);


  useEffect(() => {
    axios.get(`/api/notice/detail/${noticeNo}`)
      .then(response => {
        setNotice(response.data);
        setEditedTitle(response.data.noticeTitle);
        setEditedContent(response.data.noticeContent);
      })
      .catch(error => console.log(error));
  }, [noticeNo]);


  const navigate = useNavigate();

  const handleUpdateNotice = () => {
    const formData = new FormData();
    formData.append('noticeTitle', editedTitle);
    formData.append('noticeContent', editedContent);
    formData.append('noticeNo', noticeNo);


    sendAxiosRequest(`/api/notice/update/${noticeNo}`, 'POST', formData, response => {
      console.log('응답값:', response.data);
      alert('공지사항이 수정 되었습니다.');
      navigate('/admin/notice/list');
    },
      error => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('공지사항 수정 실패하셨습니다!');
      },
      null,
      accessToken
    );
  };

  if (notice === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="col-md-6">
            <form onSubmit={handleUpdateNotice} className="p-4 bg-light rounded shadow-sm">
              <h2>공지사항 수정</h2>
              <div className="mb-3">
                <label htmlFor="editedTitle" className="form-label">제목</label>
                <input
                  type="text"
                  id="editedTitle"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedContent" className="form-label">내용</label>
                <textarea
                  id="editedContent"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="form-control"
                  rows="10"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                수정하기
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminNoticeDetail;
