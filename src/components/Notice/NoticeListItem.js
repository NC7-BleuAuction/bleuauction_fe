import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NoticeListItem() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get('/api/notice') // Update with the appropriate backend API endpoint
      .then(response => setNotices(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover board_list text-center">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '70%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead className="thead-dark">
            <tr>
              <th className="text-primary">번호</th>
              <th className="text-primary">제목</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.noticeNo}>
                <td>{notice.noticeNo}</td>
                <td className="text-left">
                  <Link to={`/notice/detail/${notice && notice.noticeNo}`} style={{ color: '#000' }}>
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