import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';
import axios, { formToJSON } from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // 만약 react-router-dom을 사용한다면 이 부분을 추가합니다.
import  './MenuEdit.css'
import jwt_decode from 'jwt-decode'; // jwt-decode 라이브러리를 import 합니다.



function MenuEdit() {
  let [menuData, setMenuData] = useState([]); // 메뉴 데이터를 저장할 상태
  const { menuNo } = useParams(); // 현재 URL의 매개변수를 가져옵니다.
  const navigate = useNavigate();
  const location = useLocation(); // 추가된 부분
  const store = location.state; // 추가된 부분
  console.log(store);
  const accessToken = sessionStorage.getItem('accessToken');



  // useEffect(() => {
  //   // 상점 번호가 설정되어 있는 경우에만 메뉴 데이터를 요청합니다.
  //   const fetchMenus = async () => {
  //     try {
  //       const response = await axios.get('/api/menu/store'); // 세션을 기반으로 한 요청
  //       if (response.data) {
  //         console.log(response.data);
  //         setMenuData(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user's menus:", error);
  //     }
  //   };
  
  //   fetchMenus();
  // }, []); 
  
    // 토큰 디코딩

        // const tokenMember = jwt_decode(accessToken);
        // console.log("디코드된 토큰 정보 출력",tokenMember); // 디코드된 토큰 정보 출력

  

  useEffect(() => {
    sendAxiosRequest(`/api/menu/store`, 'GET', null, response => {
      console.log('응답 data:', response.data);
      setMenuData(response.data);
    }, error => {
      console.error("메뉴 가져오기 실패:", error);
    }, null, accessToken);
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.


  const handleDeleteMenu = (menuNo) => {
    sendAxiosRequest(`/api/menu/delete/${menuNo}`, 'POST', null, response => {
      console.log('Data fetched successfully:', response.data);
      alert('메뉴가 삭제 되었습니다.');
      setMenuData(menuData.filter(menu => menu.menuNo !== menuNo));
    }, error => {
      console.error("Error deleting user's menus:", error);
      alert('메뉴 삭제에 실패하였습니다.');
    }, null, accessToken);

  };


const renderMenus = menuData.map((menu, index)  => (
  <div key={menu.menuNo} className="menu-item">
    <h2 className="menu-title">{menu.menuName}</h2>

    {/* 이미지가 있는지 확인하고 이미지를 렌더링하거나 기본 이미지를 보여줍니다. */}
    {menu.menuAttaches && menu.menuAttaches.length > 0 ? (
      <img
        src={`https://kr.object.ncloudstorage.com/bleuauction-bucket/menu/${menu.menuAttaches[0].saveFilename}`}
        alt={menu.menuAttaches[0].originFilename}
        style={{ width: '100px', height: '100px' }} // 이 부분이 이미지 크기를 고정합니다.
      />
    ) : (
      <img src="/images/fresh.png" alt="menu" style={{ width: '100px', height: '100px' }}/>
    )}
    
    <p className="menu-detail">사이즈: {menu.menuSize}</p>
    <p className="menu-detail">가격: {menu.menuPrice}</p>
    <p className="menu-detail">내용: {menu.menuContent}</p>
    <div  className="menu-actions">
      <button  className="delete-button" onClick={() => handleDeleteMenu(menu.menuNo)}>삭제</button>
      {/* <Link 
        to={{
          pathname: "/MenuDetail", // 수정할 메뉴의 상세 정보 페이지 경로
          state: { detailMenu: menu } // 현재 메뉴의 데이터
        }}
      >      
      <button className="edit-button">수정하기</button>
    </Link> */}

<Link className="text-ellipsis" to={`/menuDetail/${menu && menu.menuNo}`} style={{ color: '#909090' }}>
                {menu && menu.menuName}
                </Link>

      {/* 추가적인 액션 버튼들이 위치할 수 있습니다. */}
    </div>
  </div>
));

return (
  <div style={containerStyle}>
    <Link to="/MenuRegisterationForm" style={registerButtonLink}>
      <button>메뉴 등록하기</button>
    </Link>
    <div style={menuList}>{renderMenus}</div>
  </div>
);
}

// 스타일 섹션
const containerStyle = {
padding: '20px',
maxWidth: '800px', // 조금 더 좁은 컨테이너
margin: '0 auto',
};

const menuList = {
marginTop: '20px',
};

const menuItemStyle = {
borderBottom: '1px solid #ddd', // 각 메뉴 아이템 아래에 구분선 추가
padding: '10px 0',
};

const menuItemTitle = {
margin: '0 0 10px 0',
fontSize: '1.5em',
};

const menuActions = {
marginTop: '10px',
};

const deleteButton = {
background: '#4169e1', 
color: '#fff',
border: 'none',
padding: '5px 10px',
borderRadius: '5px',
cursor: 'pointer',
};

const registerButtonLink = {
display: 'block',
textAlign: 'right',
marginBottom: '20px',
};

const registerButton = {
background: '#4169e1', 
color: 'white',
padding: '10px 20px',
textDecoration: 'none',
borderRadius: '5px',
cursor: 'pointer',
};

export default MenuEdit;
