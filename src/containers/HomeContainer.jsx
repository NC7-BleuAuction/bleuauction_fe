import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storeListState } from '../modules/stores';
import Announce from '../components/MainPage/Announce';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { accordionSummaryClasses } from '@mui/material';
import { list } from '../lib/api/store';
import { isNullUndefinedOrEmpty } from '../lib/common';

const HomeContainer = () => {
  const [stores, setStores] = useRecoilState(storeListState);

  const [pageRowCount, setPageRowCount] = useState([6]);
  const accessToken = sessionStorage.getItem('accessToken');

  const initList = async () => {
    const response = await list({ pageRowCount, jwtToken: 'UA' });
    if (isNullUndefinedOrEmpty(response.data)) {
      setStores(response.data);
    }
  };

  useEffect(() => {
    initList();
  }, []);

  return (
    <>
      <Announce />
      {stores && <StoreHome stores={stores} />}
    </>
  );
};

export default HomeContainer;
