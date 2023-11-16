import React, { useEffect, useState } from 'react';
import { sendAxiosRequest } from '../utility/common';
import { useParams } from 'react-router-dom'; // 만약 react-router-dom을 사용한다면 이 부분을 추가합니다.





function MenuItem({ name, sizes, imageUrl }) {

  const { storeNo } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  // const [store, setStore] = useState(null);
  const accessToken = sessionStorage.getItem('accessToken');



  // 컴포넌트가 마운트될 때 메뉴 데이터를 불러옵니다.
  useEffect(() => {
    sendAxiosRequest(`/api/menu/${storeNo}`, 'GET', null, response => {
      console.log('응답 data:', response.data);
      setMenuItems(response.data);
    }, error => {
      console.error("메뉴 가져오기 실패:", error);
    }, null, accessToken);
  }, []);
  // 로딩 중이거나 메뉴 항목이 없는 경우 처리
  if (!menuItems.length) {
    return <div>Loading menu items, or there are none available.</div>;
  }

  return (
    <div style={menuItemStyle}>
      <div style={contentStyle}>
        {/* {imageUrl && (
          <img src={imageUrl} alt={name} style={imageStyle} />
        )} */}
        <div style={textStyle}>
          <span style={nameStyle}>{name}</span>
          <div style={sizesStyle}>
            {menuItems.map((menu, index) => (
              <div key={menu.name} style={sizeStyle}>
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
                <span>{menu.name}</span>
                <span>{menu.price}원</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const menuItemStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  background: 'white', 
  margin: '10px', 
  borderRadius: '8px', 
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', 
  width: '70%',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
};

const imageStyle = {
  width: '160px',
  height: '100px',
  objectFit: 'cover',
  marginRight: '30px', 
};

const textStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const nameStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const sizesStyle = {
  marginTop: '5px',
};

const sizeStyle = {
  margin: '2px 0',
};

export default MenuItem;
