
import React from 'react';

function StoreInfoDetail({storeDetail}) {

  console.log('storeDetail,',storeDetail);
  // console.log(storeInfo);

    // storeDetail아 null이거나 필요한 속성이 없으면 렌더링하지 않습니다.
    if (!storeDetail) {
        return <div>Loading...</div>; // 혹은 다른 대체 컨텐츠
      }
  return (
    <div style={outerContainer}>
    <div style={introContainer}>
      {/* <img src={storeDetail.image} alt={storeDetail.name} style={imageStyle} /> */}
     <div style={storeInfoContainer}>
      <h2>{storeDetail.storeName}</h2>
      <ul style={infoList}>
        <li style={listItem}>시장 이름:{storeDetail.marketName}</li>
        <li style={listItem}>기본 주소:{storeDetail.storeAddr}</li>
        <li style={listItem}>상세 주소:{storeDetail.storeDetailAddr}</li>
        <li style={listItem}>사업등록번호:{storeDetail.licenseNo}</li>
        <li style={listItem}>운영시간:{storeDetail.weekdayStartTime} ~ {storeDetail.weekdayEndTime}</li>
        <li style={listItem}>{storeDetail.store}</li>
      </ul>
      </div>
      {/* <div style={couponContainer}>
        {coupons.map(coupon => (
          <Coupon key={coupon.id} coupon={coupon} />
        ))}
      </div> */}
    </div>
    </div>
  );
}

const outerContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // backgroundColor: '#f7f7f7', // 아주 연한 회색 배경으로 조정
  };

const introContainer = {
    display: 'flex',
    flexDirection: 'column', // children들을 열 방향으로 배열
    alignItems: 'center', // children들을 가운데 정렬
    // backgroundColor: '#f0f0f0',// 연한 회색 배경
    padding: '0px',
    borderRadius: '8px', // 소프트한 테두리를 위한 둥근 모서리 추가
    textAlign: 'center',
    width : '70%',
    height: '100%'
};

const storeInfoContainer = {
    textAlign: 'left', 
    padding: '20px',
    marginBottom: '10px', // 쿠폰 컨테이너와의 간격을 조절
    width : '100%',
  };

const imageStyle = {
//   width: '100%',
//   height: 'auto',
//   objectFit: 'cover',
};

const infoList = {
  listStyleType: 'none',
  padding: '0',
  margin: '10px 0',
  fontSize: '25px', // larger font size

};

const listItem = {
    marginBottom: '10px',
}


export default StoreInfoDetail;