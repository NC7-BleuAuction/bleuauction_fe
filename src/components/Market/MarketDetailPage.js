import React, { useState } from 'react';
import TabBar from './TabBar';
import MenuList from '../Menu/MenuList';
import Button from '../MainPage/Button';
import StoreInfo from './StoreInfo';
import ReviewSection from '../Review/ReviewSection';
import { useLocation } from 'react-router-dom';



function MarketDetailPage() {
  const [activeTab, setActiveTab] = useState('info');

  const location = useLocation(); // 추가된 부분
  const store = location.state; // 추가된 부분
  // console.log(store);



  const storeInfo = {
    image: '/images/storeimage.png',
    name: '대원수산',
    location: '서울특별시 동작구 노들로 674 노량진수산시장 , 2층 활어 2-15호 강변상회',
    hours: '월요일 (오늘) 09:00 ~ 21:00',
    phone: '02-1234-5678',
  };


  const handleOrderClick = () => {
    alert('주문하기 버튼 클릭!');
  };  

  return (
    <div>
      <div style={infoContainerStyle}>
      <StoreInfo storeInfo={storeInfo} store={store} />
      </div>
      <div style={tabContainerStyle}>
        <TabBar activeTab={activeTab} onTabClick={setActiveTab} />
        {activeTab === 'menu' && <Button onClick={handleOrderClick} buttonText="주문하기" />}
      </div>
      {activeTab === 'info' && <p>여기에 가게정보를 표시합니다.</p>}
      {activeTab === 'menu' && <MenuList />}
      {activeTab === 'review' && <ReviewSection />}
    </div>

  );
}

const infoContainerStyle = {
  marginBottom: '0px', // 예시: 아래쪽 마진을 추가하여 공간 생성
};

const tabContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};


export default MarketDetailPage;