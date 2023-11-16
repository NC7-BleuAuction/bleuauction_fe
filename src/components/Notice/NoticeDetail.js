import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function NoticeDetail() {
  const [notice, setNotice] = useState({});
  const { noticeNo } = useParams();

  useEffect(() => {
    axios.get(`/api/notice/detail/${noticeNo}`)
      .then(response => setNotice(response.data))
      .catch(error => console.log(error));
  }, [noticeNo]);

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '80%' }} />
          </colgroup>
          <thead className="thead-dark">
            <tr>
              <th style={{ verticalAlign: 'middle', backgroundColor: 'lightblue', fontSize: '20px' }}>제목</th>
              <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>{notice.noticeTitle}</td>
            </tr>
            <tr>
              <th style={{ verticalAlign: 'middle', backgroundColor: 'lightblue', fontSize: '20px' }}>내용</th>
              <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                <textarea
                  className="form-control"
                  rows="10"
                  value={notice.noticeContent}
                  readOnly
                  style={{ fontSize: '25px', height: '200px' }}
                ></textarea>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default NoticeDetail;
