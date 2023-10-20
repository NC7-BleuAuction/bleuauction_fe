import React, { useState } from 'react';
import TabBar from './TabBar';
import MenuList from '../Menu/MenuList';
import Button from '../MainPage/Button';
import StoreInfo from './StoreInfo';
import ReviewSection from '../Review/ReviewSection';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';
import { MenuItem } from '@mui/material';


function MarketDetailPage() {
  const [activeTab, setActiveTab] = useState('info');
  const [menuData, setMenuData] = useState([]); // 메뉴 데이터를 저장할 상태


  const location = useLocation(); // 추가된 부분
  const store = location.state; // 추가된 부분
  console.log(store);

  const storeInfo = {
    image: '/images/storeimage.png',
    name: '대원수산',
    location: '서울특별시 동작구 노들로 674 노량진수산시장 , 2층 활어 2-15호 강변상회',
    hours: '월요일 (오늘) 09:00 ~ 21:00',
    phone: '02-1234-5678',
  };

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
      {activeTab === 'menu' && <MenuList menus={menuData}/>}
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