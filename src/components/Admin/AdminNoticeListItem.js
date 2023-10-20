import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AdminNoticeListItem() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // API 엔드포인트를 백엔드에 맞게 수정해야 합니다.
    axios.get('/api/notice') // 백엔드 API 엔드포인트 설정
      .then(response => setNotices(response.data))
      .catch(error => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleDeleteNotice = (noticeNo) => {
    axios.post(`/api/notice/delete/${noticeNo}`)
      .then(response => {
        console.log("Notice deleted successfully");
        alert('공지사항이 삭제 되었습니다.');
        navigate('/admin/notice/list');
      })
      .catch(error => console.error("Failed to delete notice: ", error));
  };



  return (
    <div className="container">
      <Link to="/admin/notice/register" style={{ color: '#909090' }}>
      <button className="text-ellipsis"
        style={{
          fontSize: '18px',  // 원하는 폰트 크기로 설정합니다.
          padding: '24px 48px',  // 원하는 패딩을 설정합니다.
        }}>등록하기</button>
      </Link>
      <div className="top-controls"></div>
      <div>
        <table className="board_list text-center">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.noticeNo}>
                <td>{notice.noticeNo}</td>
                <td className="text-left">
                <Link className="text-ellipsis" to={`/admin/notice/detail/${notice && notice.noticeNo}`} style={{ color: '#909090' }}>
                {notice && notice.noticeTitle}
                </Link>
                </td>
                <td>
                  <button onClick={() => handleDeleteNotice(notice.noticeNo)}
                  style={{
                    fontSize: '18px',  // 원하는 폰트 크기로 설정합니다.
                    padding: '12px 24px',  // 원하는 패딩을 설정합니다.
                  }}
                  >삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminNoticeListItem;
