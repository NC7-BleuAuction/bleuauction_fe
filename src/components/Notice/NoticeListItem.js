import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NoticeListItem() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // API 엔드포인트를 백엔드에 맞게 수정해야 합니다.
    axios.get('/api/notice') // 백엔드 API 엔드포인트 설정
      .then(response => setNotices(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="top-controls"></div>
      <div>
        <table className="board_list text-center">
          <colgroup>
            <col width="5%" />
            <col width="95%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.noticeNo}>
                <td>{notice.noticeNo}</td>
                <td className="text-left">
                <Link className="text-ellipsis" to={`/notice/detail/${notice && notice.noticeNo}`} style={{ color: '#909090' }}>
                {notice && notice.noticeTitle}
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoticeListItem;
