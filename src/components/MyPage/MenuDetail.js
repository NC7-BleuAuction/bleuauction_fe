import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { sendAxiosMultipartRequest, sendAxiosRequest } from '../utility/common';
import { useLocation } from 'react-router-dom';


function MenuDetail() {


  const { menuNo } = useParams();
  const [editedName, setEditedName] = useState('');
  const [editedSize, setEditedSize] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [menu, setMenu] = useState(null);
  
  // 만약 menuNo가 undefined라면, 잘못된 요청을 보내고 있을 수 있습니다.
console.log('보내기 전 menuNo 확인:', menuNo);


  useEffect(() => {
      axios.get(`/api/menu/detail/${menuNo}`)
      .then(response => {

        console.log('응답 데이터:', response.data); 
          setMenu(response.data);
          setEditedName(response.data.menuName);
          setEditedSize(response.data.menuSize);
          setEditedPrice(response.data.menuPrice);
          setEditedContent(response.data.menuContent);
        })
        .catch(error => console.log(error));
    }, [menuNo]);
    


  const navigate = useNavigate();

  const handleUpdateMenu = () => {
    const formData = new FormData();
    formData.append('menuName', editedName);
    formData.append('menuSize', editedSize);
    formData.append('menuPrice', editedPrice);
    formData.append('menuContent', editedContent);
    formData.append('menuNo',menuNo);

    axios.post(`/api/menu/update/${menuNo}`, formData)
      .then(response => {
        console.log("Menu updated successfully: ", response.data);
        alert('메뉴가 수정 되었습니다.');
        navigate('/menuEdit');
      })
      .catch(error => console.error("Failed to update notice: ", error));
  };

  if (menu === null) {
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
                <th>메뉴</th>
                <td>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>사이즈</th>
                <td>
                  <input
                    type="text"
                    value={editedSize}
                    onChange={(e) => setEditedSize(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>가격</th>
                <td>
                  <input
                    type="text"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
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
              <button onClick={handleUpdateMenu}>수정하기</button>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default MenuDetail;