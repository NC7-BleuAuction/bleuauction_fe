import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { Routes, Route } from 'react-router-dom';
import { accessTokenRefresh, redirectLogin, isNullUndefinedOrEmpty, sendAxiosRequest } from '../components/utility/common';
import { accordionSummaryClasses } from '@mui/material';

function Home() {

  const [stores, setStores] = useState([]);
  const [pageRowCount, setPageRowCount] = useState([6]);
  const accessToken = sessionStorage.getItem('accessToken');

  /* 토큰 들고 요청 예시 */
  // useEffect(() => {
  //   if (isNullUndefinedOrEmpty(accessToken)) {   // AccessToken이 있을 때만 요청 

  //     // 요청 헤더에 엑세스 토큰 추가
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     };

  //     console.log('Home.js headers: ', config);

  //     axios.get(`/api/store/list?pageLowCount=${pageRowCount}`, config)
  //       .then(response => {
  //         console.log('response.data: ', response.data);
  //         setStores(response.data);
  //       })
  //       .catch(error => {
  //         const errorData = error.response.data;
  //         console.log('errorData: ', errorData);
  //         if (errorData === 'E') { // 토큰이 있으나 만료
  //           console.log('여기야');
  //           accessTokenRefresh();
  //         } else if (errorData === 'I') { // 토큰이 아예없거나 유효하지 않은 토큰
  //           redirectLogin();
  //         }
  //       });
  //   }
  // }, [accessToken]); // accessToken이 변경될 때만 실행

  useEffect(() => {
    sendAxiosRequest(`/api/store/list?pageLowCount=${pageRowCount}`, 'GET', null, response => {
      console.log('/api/store/list => response.data: ' + response.data);
      if (isNullUndefinedOrEmpty(response.data)) {
        setStores(response.data);
      }
    }, error => console.log(error), null, 'UA');

  }, []);


  return (
    <>
      <Announce />
      {stores && (
        <>
          <StoreHome stores={stores} />
          <button onClick={() => { console.log(stores); window.sessionStorage.getItem("memberNo") }}>더보기-></button>
        </>
      )}
    </>
  )
}

export default Home;