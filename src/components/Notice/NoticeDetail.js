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
      <div className="top-controls"></div>
      <div style={{ padding: "0 12px" }}>
        <table className="board_list text-center">
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <thead>
          <tr>
          <th>제목</th>
          <td className="text-left">{notice.noticeTitle}</td>
          </tr>
          <tr>
          <th>내용</th>
          <td>{notice.noticeContent}</td>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default NoticeDetail;
