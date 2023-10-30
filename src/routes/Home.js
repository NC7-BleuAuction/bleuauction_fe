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
        </>
      )}
    </>
  )
}

export default Home;