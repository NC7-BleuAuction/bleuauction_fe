import React, { useState } from 'react';
import TabBar from './TabBar';
import MenuList from '../Menu/MenuList';
import Button from '../MainPage/Button';
import StoreInfo from './StoreInfo';
import ReviewSection from '../Review/ReviewSection';



function MarketDetail() {
  const [activeTab, setActiveTab] = useState('info');

  const sampleReviews = [
    {
      id: 1,
      user: { name: '로제', profilePicture: '/images/rose.png' },
      text: '맛있어용',
      image: '/',
    },
    {
      id: 2,
      user: { name: 'Jane Doe', profilePicture: '/path/to/jane.jpg' },
      text: 'Really enjoyed using this.',
    },
    // ...기타 리뷰
  ];

  const storeInfo = {
    image: '/images/storeimage.png',
    name: '대원수산',
    location: '서울특별시 동작구 노들로 674 노량진수산시장 , 2층 활어 2-15호 강변상회',
    hours: '월요일 (오늘) 09:00 ~ 21:00',
    phone: '02-1234-5678',
  };

  const coupons = [
    { id: 1, title: '20% 할인', description: '연어' },
    { id: 2, title: '30% 할인', description: '방어' },
  ];

  const handleOrderClick = () => {
    alert('주문하기 버튼 클릭!');
  };

  return (
    <div>
      {/* <div style={infoCouponContainer}> 여기에 스타일을 추가 */}
      <StoreInfo storeInfo={storeInfo} coupons={coupons} />
      {/* </div> */}
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

const tabContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};


export default MarketDetail;
