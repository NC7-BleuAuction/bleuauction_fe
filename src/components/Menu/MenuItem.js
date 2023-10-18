import React, { useEffect, useState } from 'react';
import { sendAxiosRequest } from '../utility/common';




function MenuItem({ name, sizes, imageUrl }) {


  const [menuItems, setMenuItems] = useState([]);
  const [store, setStore] = useState(null);


  // 컴포넌트가 마운트될 때 메뉴 데이터를 불러옵니다.
  useEffect(() => {
    sendAxiosRequest('api/member/loginCheck', 'GET', null, response => {
      let loginUser = response.data.loginUser;
      setStore(loginUser);
    }, error => console.log(error))
  }

    , []);
  // 로딩 중이거나 메뉴 항목이 없는 경우 처리
  if (!menuItems.length) {
    return <div>Loading menu items, or there are none available.</div>;
  }

  return (
    <div style={menuItemStyle}>
      <div style={contentStyle}>
        {imageUrl && (
          <img src={imageUrl} alt={name} style={imageStyle} />
        )}
        <div style={textStyle}>
          <span style={nameStyle}>{name}</span>
          <div style={sizesStyle}>
            {sizes.map(size => (
              <div key={size.name} style={sizeStyle}>
                <span>{size.name}</span>
                <span>{size.price}원</span>
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
