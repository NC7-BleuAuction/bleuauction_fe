import React from 'react';
import Coupon from '../Coupon/Coupon'; 

function StoreIntro({storeInfo, store }) {
  console.log(store);
  // console.log(storeInfo);

  return (
    <div style={outerContainer}>
    <div style={introContainer}>
      <img src={storeInfo.image} alt={storeInfo.name} style={imageStyle} />
     <div style={storeInfoContainer}>
      <h2>{store.storeName}</h2>
      <ul style={infoList}>
        <li>{store.storeDetailAddr}</li>
        <li>{store.weekdayStartTime} ~ {store.weekdayEndTime}</li>
        <li>{storeInfo.phone}</li>
      </ul>
      </div>
    </div>
    </div>
  );
}

const outerContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '67vh', // 화면 높이를 100%로 설정 (필요한 경우 조절)
  };

const introContainer = {
    display: 'flex',
    flexDirection: 'column', // children들을 열 방향으로 배열
    alignItems: 'center', // children들을 가운데 정렬
    backgroundColor: '#f0f0f0', // 연한 회색 배경
    padding: '0px',
    borderRadius: '8px', // 소프트한 테두리를 위한 둥근 모서리 추가
    textAlign: 'center',
    width : '70%',
};

const storeInfoContainer = {
    textAlign: 'left', 
    padding: '20px',
    marginBottom: '10px', // 쿠폰 컨테이너와의 간격을 조절
    width : '100%',
  };

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

const infoList = {
  listStyleType: 'none',
  padding: '0',
  margin: '10px 0',
};


export default StoreIntro;
