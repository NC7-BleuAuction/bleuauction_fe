// import React from 'react';
// import Coupon from '../Coupon/Coupon'; 

// function StoreIntro({storeInfo, store, coupons }) {
//   console.log(store);
//   // console.log(storeInfo);

//   return (
//     <div style={outerContainer}>
//     <div style={introContainer}>
//       <img src={storeInfo.image} alt={storeInfo.name} style={imageStyle} />
//      <div style={storeInfoContainer}>
//       <h2>{store.storeName}</h2>
//       <ul style={infoList}>
//         <li>{store.storeDetailAddr}</li>
//         <li>{store.weekdayStartTime} ~ {store.weekdayEndTime}</li>
//         <li>{store.store}</li>
//       </ul>
//       </div>
//       {/* <div style={couponContainer}>
//         {coupons.map(coupon => (
//           <Coupon key={coupon.id} coupon={coupon} />
//         ))}
//       </div> */}
//     </div>
//     </div>
//   );
// }

// const outerContainer = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '50vh', // 화면 높이를 100%로 설정 (필요한 경우 조절)
//   };

// const introContainer = {
//     display: 'flex',
//     flexDirection: 'column', // children들을 열 방향으로 배열
//     alignItems: 'center', // children들을 가운데 정렬
//     backgroundColor: '#f0f0f0', // 연한 회색 배경
//     padding: '0px',
//     borderRadius: '8px', // 소프트한 테두리를 위한 둥근 모서리 추가
//     textAlign: 'center',
//     width : '70%',
//     height: '100%'
// };

// const storeInfoContainer = {
//     textAlign: 'left', 
//     padding: '20px',
//     marginBottom: '50px', // 쿠폰 컨테이너와의 간격을 조절
//     width : '100%',
//   };

// const imageStyle = {
//   width: '100%',
//   height: 'auto',
//   objectFit: 'cover',
// };

// const infoList = {
//   listStyleType: 'none',
//   padding: '0',
//   margin: '10px 0',
// };


// export default StoreIntro;

import React from 'react';

function StoreIntro({storeInfo, store, coupons }) {

  console.log('storeInfo,',storeInfo);

  return (
    <div style={outerContainer}>
    <div style={introContainer}>
    {store.storeAttaches && store.storeAttaches[0] ? (
                    <img style={imageStyle}
                      src={`https:kr.object.ncloudstorage.com/bleuauction-bucket/store/${store.storeAttaches[0].saveFilename}`}
                      alt={store.storeAttaches[0].originFilename }
                    />
                  ) : (
                    <img src="/images/boss.png" alt="store" />
                  )}

      <h1 style={storename}>{store.storeName}</h1>
      {/* <img src={store.image} alt={store.name} style={imageStyle} /> */}
    </div>
    </div>
  );
}

const outerContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh', // 화면 높이를 100%로 설정 (필요한 경우 조절)
  };

const introContainer = {
    display: 'flex',
    flexDirection: 'column', // children들을 열 방향으로 배열
    alignItems: 'center', // children들을 가운데 정렬
    backgroundColor: '#f0f0f0', // 연한 회색 배경
    padding: '0px',
    borderRadius: '0px', // 소프트한 테두리를 위한 둥근 모서리 추가
    textAlign: 'center',
    width : '70%',
    height: '100%',
    margin: '0px',
};

const storeInfoContainer = {
    textAlign: 'left', 
    padding: '20px',
    marginBottom: '0px', // 쿠폰 컨테이너와의 간격을 조절
    width : '100%',
  };

const imageStyle = {
  width: '1344px', // 원하는 너비로 설정
  height: '530px', // 원하는 높이로 설정
  objectFit: 'cover', // 이미지 비율을 유지하면서 채우기 위한 설정 ('cover'는 이미지가 컨테이너를 꽉 채우도록 하며, 필요한 경우 이미지를 잘라냄)
  borderRadius: '4px', 
};

const infoList = {
  listStyleType: 'none',
  padding: '0',
  margin: '10px 0',
};

const storename = {
  margin: '10px 0',

}


export default StoreIntro;