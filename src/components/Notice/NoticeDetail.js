import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function NoticeDetail() {
  const [notice, setNotice] = useState({});
  const { noticeNo } = useParams();

  useEffect(() => {
    axios.get(`/api/notice/detail/${noticeNo}`)
      .then(response => setNotice(response.data))
      .catch(error => console.log(error));
  }, [noticeNo]);

  return (
    <div className="container">
      <div className="lf-menu-nav"><span>공지사항</span></div>
      <div className="top-controls"></div>
      <div style={{ padding: "0 12px" }}>
        <table className="board_list text-center">
          <colgroup>
            <col width="5%" />
            <col width="50%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{notice.noticeNo}</td>
              <td className="text-left">{notice.noticeTitle}</td>
              <td>{notice.noticeContent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoticeDetail;
