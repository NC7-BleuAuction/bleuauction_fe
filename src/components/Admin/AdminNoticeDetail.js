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
    )


    // axios.post(`/api/notice/update/${noticeNo}`, formData)
    //   .then(response => {
    //     console.log("Notice updated successfully");
    //     alert('공지사항이 수정 되었습니다.');
    //     navigate('/admin/notice/list');
    //   })
    //   .catch(error => console.error("Failed to update notice: ", error));
  };

  if (notice === null) {
    return <div>Loading...</div>;
  } else {
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
                <td>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>내용</th>
                <td>
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                </td>
              </tr>
              <button onClick={handleUpdateNotice}>수정하기</button>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminNoticeDetail;
