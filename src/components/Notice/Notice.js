import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notice.css';

function Notice() {
  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState({
    noticeTitle: '',
    noticeContent: '',
  });
  const [selectedNotice, setSelectedNotice] = useState(null); // 선택한 공지사항을 저장하는 상태

  const fetchNotices = async () => {
    try {
      const response = await axios.get('/api/notices'); // 백엔드 경로로 변경
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeForm({
      ...noticeForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/notice/new', noticeForm); // 백엔드 경로로 변경
      setNoticeForm({
        noticeTitle: '',
        noticeContent: '',
      });
      fetchNotices();
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const deleteNotice = async (noticeNo) => {
    try {
      await axios.post(`/api/notices/delete/${noticeNo}`); // 백엔드 경로로 변경
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const updateNotice = async () => {
    if (!selectedNotice) return; // 선택한 공지사항이 없을 경우 아무 작업도 하지 않음

    const updatedNotice = {
      noticeNo: selectedNotice.noticeNo,
      noticeTitle: noticeForm.noticeTitle,
      noticeContent: noticeForm.noticeContent,
    };

    try {
      await axios.post(`/api/notice/update/${selectedNotice.noticeNo}`, updatedNotice); // 백엔드 경로로 변경
      setNoticeForm({
        noticeTitle: '',
        noticeContent: '',
      });
      setSelectedNotice(null); // 선택한 공지사항 초기화
      fetchNotices();
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  return (
    <div className="notice-container">
      <h1>Notices</h1>
      <div className="create-notice-form">
        <h2>Create/Update Notice</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="noticeTitle"
            placeholder="Title"
            value={noticeForm.noticeTitle}
            onChange={handleChange}
          />
          <textarea
            name="noticeContent"
            placeholder="Content"
            value={noticeForm.noticeContent}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Create/Update</button>
        </form>
      </div>
      <div>
        <h2>Notice List</h2>
        <ul className="notice-list">
          {notices.map((notice) => (
            <li className="notice-item" key={notice.noticeNo}>
              <div>
                <strong>{notice.noticeTitle}</strong>
              </div>
              <p>{notice.noticeContent}</p>
              <button onClick={() => deleteNotice(notice.noticeNo)}>Delete</button>
              <button onClick={() => setSelectedNotice(notice)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notice;
