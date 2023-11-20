import React from 'react';
import { FaClock, FaMapMarkerAlt, FaRegBuilding } from 'react-icons/fa'; // 원하는 아이콘을 여기에 추가하세요.
import { getCurrentDay, isStoreOpen } from '../../lib/common';

function StoreInfoDetail({ storeDetail }) {
  const iconStyles = {
    marginRight: '5px', // 아이콘과 텍스트 사이에 약간의 간격 제공
    color: '#007bff', // 아이콘 색상 (예: 부트스트랩 기본 색상)
  };

  console.log('storeDetail,', storeDetail);
  // console.log(storeInfo);

  // storeDetail아 null이거나 필요한 속성이 없으면 렌더링하지 않습니다.
  if (!storeDetail) {
    return <div>Loading...</div>; // 혹은 다른 대체 컨텐츠
  }
  const currentDay = new Date().getDay(); // 0 (일요일)부터 6 (토요일)까지
  return (
    <div style={outerContainer}>
      <div style={storeInfoContainer}>
        <h2>{storeDetail.storeName}</h2>
        <ul style={infoList}>
          <li style={listItem}>
            <FaRegBuilding style={{ marginRight: '10px' }} />
            시장 이름: {storeDetail.marketName}
          </li>
          <li style={listItem}>
            <FaMapMarkerAlt style={{ marginRight: '10px' }} />
            기본 주소: {storeDetail.storeAddr}
          </li>
          <li style={listItem}>
            <FaMapMarkerAlt style={{ marginRight: '10px' }} />
            상세 주소: {storeDetail.storeDetailAddr}
          </li>
          <div>
            <li style={listItem}>
              <FaClock style={{ marginRight: '10px' }} />
              평일 운영 시간: {storeDetail.weekdayStartTime} ~{' '}
              {storeDetail.weekdayEndTime}
              {currentDay >= 1 &&
                currentDay <= 5 &&
                isStoreOpen(
                  storeDetail.weekdayStartTime,
                  storeDetail.weekdayEndTime,
                  currentDay
                )}
            </li>
            <li style={listItem}>
              <FaClock style={{ marginRight: '10px' }} />
              주말 운영 시간: {storeDetail.weekendStartTime} ~{' '}
              {storeDetail.weekendEndTime}
              {currentDay === 0 ||
                (currentDay === 6 &&
                  isStoreOpen(
                    storeDetail.weekendStartTime,
                    storeDetail.weekendEndTime,
                    currentDay
                  ))}
            </li>
          </div>
          <li style={listItem}>{storeDetail.store}</li>
        </ul>
      </div>
    </div>
    // ...
  );
}

const outerContainer = {
  display: 'flex',
  justifyContent: 'flex-start', // 중앙 정렬에서 왼쪽 정렬로 변경
  alignItems: 'center',
  height: '30vh',
  width: '100%', // 전체 너비를 사용하도록 변경할 수 있습니다.
  // ... 나머지 속성들 ...
};

const introContainer = {
  display: 'flex',
  flexDirection: 'column', // children들을 열 방향으로 배열
  alignItems: 'center', // children들을 가운데 정렬
  // backgroundColor: '#f0f0f0',// 연한 회색 배경
  padding: '0px',
  borderRadius: '8px', // 소프트한 테두리를 위한 둥근 모서리 추가
  textAlign: 'center',
  width: '70%',
  height: '100%',
};

const storeInfoContainer = {
  textAlign: 'left',
  padding: '20px 20px 20px 300px', // 오른쪽에 20px 여백을 주고 왼쪽 여백을 없앰
  marginBottom: '10px', // 쿠폰 컨테이너와의 간격을 조절
  width: '100%',
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
};

export default StoreInfoDetail;
