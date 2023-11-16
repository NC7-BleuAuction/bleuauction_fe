import React, { useState } from 'react';
import TabBar from './TabBar';
import MenuList from '../Menu/MenuList';
import StoreInfoDetail from './StoreInfoDetail';
import Button from '../MainPage/Button';
import StoreInfo from './StoreInfo';
import ReviewForm from '../Review/ReviewForm';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {getAccessToken, sendAxiosRequest} from '../utility/common';
import { MenuItem } from '@mui/material';
import OrderModal from './OrderModal';
import { useUser } from '../Auth/UserContext';
import jwtDecode from "jwt-decode";


function MarketDetailPage() {
  const accessToken = sessionStorage.getItem('accessToken');
  jwtDecode(accessToken);

  const [activeTab, setActiveTab] = useState('info');
  const [modal, setModal] = useState(false);
  const [menuData, setMenuData] = useState([]); // 메뉴 데이터를 저장할 상태
  const [storeDetail, setStoreDetail] = useState(null); // 처음에는 정보가 없으므로 null로 초기화합니다.


  const location = useLocation(); // 추가된 부분
  const store = location.state; // 추가된 부분


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
          setMenuData(response.data.map((menu) => ({
            ...menu,
            count: 0
          }))); // 받아온 데이터로 상태를 업데이트합니다.
          console.log(menuData);
        }
      }, error => {
        console.error("An error occurred while fetching the menus:", error);
      }, null, accessToken);
    }
  }, [])




  // 가게 정보 및 메뉴 정보를 불러오는 부분
  useEffect(() => {
    if (store && store.storeNo) {
      // 가게 정보를 불러오는 API 요청
      sendAxiosRequest(`/api/store/${store.storeNo}`, 'GET', null, response => {
        console.log("Store details fetched:", response.data);
        setStoreDetail(response.data); // 받아온 데이터로 상태를 업데이트합니다.
      }, error => {
        console.error("An error occurred while fetching the store details:", error);
      });

      // 메뉴 정보를 불러오는 API 요청 (기존 로직 유지)
      // ... (기존 메뉴 정보 요청 코드)
    }
  }, [store]); // store가 변경될 때마다 이 훅을 재실행합니다.

  console.log("store정보!!",store);

  const handleOrderClick = () => {
    // alert('주문하기 버튼 클릭!');
    setModal(true);
    console.log(modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      <div style={infoContainerStyle}>
      <StoreInfo store={store}/>
      </div>
      <div style={tabContainerStyle}>
        <TabBar activeTab={activeTab} onTabClick={setActiveTab} />
        {activeTab === 'menu' && <Button onClick={handleOrderClick} buttonText="주문하기" />}
        <OrderModal store={store} menus={menuData} isOpen={modal} onClose={closeModal} setMenuData={setMenuData} />
      </div>
      {activeTab === 'info' && <StoreInfoDetail storeDetail={storeDetail}/>}
      {activeTab === 'menu' && <MenuList menus={menuData}/>}
      {activeTab === 'review' && <ReviewForm  store={store}/>}
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