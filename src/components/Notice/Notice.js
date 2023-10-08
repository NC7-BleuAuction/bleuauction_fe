import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notice.css';

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Axios를 사용해 서버에서 공지사항 목록 가져오는 거
    axios.get('/notices') // 백엔드 API 엔드포인트로 변경
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="notice-list">
      <h1>공지사항 목록</h1>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>수정일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.noticeNo}>
              <td>{notice.noticeNo}</td>
              <td>{notice.noticeTitle}</td>
              <td>{notice.noticeContent}</td>
              <td>{notice.member.memberName}</td>
              <td>{notice.regDatetime}</td>
              <td>{notice.mdfDatetime}</td>
              <td>{notice.noticeStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notice;
