import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sendAxiosRequest } from '../utility/common';





function MenuItem({ name, sizes, imageUrl }) {


  const [menus, setMenus] = useState([]);
  const [storeNo, setStoreNo] = useState(null);


  // 컴포넌트가 마운트될 때 메뉴 데이터를 불러옵니다.
  useEffect(() => {
    // 사용자의 가게 정보를 가져오는 함수
    const fetchMyStoreInfo = async () => {
      try {
        // 엔드포인트에 요청을 보내 현재 로그인한 사용자의 가게 정보 가져오기
        const response = await axios.get('/api/store/myStoreInfo');
        if (response.data && response.data.storeNo) {
          setStoreNo(response.data.storeNo); // 성공적으로 가게 번호를 가져왔다면 상태를 업데이트합니다.
        }
      } catch (error) {
        console.error("가게 정보를 가져오는 데 실패했습니다.", error);
      }
    };
  
    fetchMyStoreInfo();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  

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
