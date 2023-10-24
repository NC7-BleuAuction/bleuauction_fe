import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';
import 'bootstrap/dist/css/bootstrap.min.css';


function AdminNoticeListItem() {
  const accessToken = sessionStorage.getItem('accessToken');
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // API 엔드포인트를 백엔드에 맞게 수정해야 합니다.
    axios
      .get('/api/notice') // 백엔드 API 엔드포인트 설정
      .then((response) => setNotices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleDeleteNotice = (noticeNo) => {
    sendAxiosRequest(
      `/api/notice/delete/${noticeNo}`,
      'POST',
      null,
      (response) => {
        console.log('응답 데이터:', response.data);
        alert('공지사항이 삭제되었습니다.');
        navigate('/admin/notice/list'); // 성공적으로 삭제된 후에 목록 페이지로 다시 이동
      },
      (error) => {
        // 에러 콜백
        console.error('공지사항 삭제 중 에러 발생:', error);
        alert('공지사항 삭제에 실패하였습니다.');
      },
      null, // 이 요청에는 별도의 컨텐트 타입 헤더 설정이 필요하지 않습니다.
      accessToken // JWT 토큰
    );
  };

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ width: '10%' }}>번호</th>
              <th scope="col" style={{ width: '70%' }}>제목</th>
              <th scope="col" style={{ width: '20%' }}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.noticeNo}>
                <td>{notice.noticeNo}</td>
                <td>
                  <Link to={`/admin/notice/detail/${notice && notice.noticeNo}`} style={{ color: '#000' }}>
                    {notice && notice.noticeTitle}
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteNotice(notice.noticeNo)}
                    className="btn btn-danger"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>
                <Link to="/admin/notice/register" className="btn btn-primary">
                  등록하기
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminNoticeListItem;
