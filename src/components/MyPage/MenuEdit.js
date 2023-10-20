import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';
import axios, { formToJSON } from 'axios';


function MenuEdit() {

    const navigate = useNavigate();
    const [menuData, setMenuData] = useState([]); // 메뉴 데이터를 저장할 상태


    const location = useLocation(); // 추가된 부분
    const store = location.state; // 추가된 부분
    console.log(store);

    useEffect(() => {
        if (store && store.storeNo) {
          // 상점 번호가 있는 경우에만 요청을 실행합니다.
          sendAxiosRequest(`/api/menu/${store.storeNo}`, 'GET', null, response => {
            if (response.data && response.data.length > 0) {
              console.log(response.data);
              setMenuData(response.data); // 받아온 데이터로 상태를 업데이트합니다.
            }
          }, error => {
            console.error("An error occurred while fetching the menus:", error);
          });
        }
      }, [store])

  // 메뉴 아이템을 위한 인라인 스타일. 필요에 따라 수정할 수 있습니다.
  const menuItemStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    textAlign: 'center',
    width: '300px',
  };

  
  const menuListStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      margin: 'auto',
      paddingTop: '10px', 
      // width: '100%',
    };
     // 메뉴 리스트를 렌더링하는 함수
  const renderMenuList = () => {
    if (menuData.length === 0) {
      return <p>등록된 메뉴가 없습니다.</p>;
    }

    
    // 메뉴 데이터를 이용하여 메뉴 아이템 컴포넌트 리스트를 생성합니다.
    return menuData.map(menu => (                  // index는 현재 처리 중인 요소의 인덱스(위치)
      <div key={menu.menuNo} style={menuItemStyle}>
        <h2>{menu.menuName}</h2>
        <p>가격: {menu.menuPrice}원</p>
        <p>사이즈: {menu.menuSize}</p>
        <p>설명: {menu.menuContent}</p>
        {/* 메뉴 항목에 추가적인 정보나 기능이 필요한 경우 이 부분을 수정하세요. */}
      </div>
    ));
  };

  // 최종적으로 UI에 표시될 컴포넌트를 반환합니다.
  return (
    <div style={menuListStyle}>
      <h1>메뉴 리스트</h1>
      {/* 메뉴 리스트 렌더링 */}
      {renderMenuList()}
    </div>
  );
}

export default MenuEdit;

