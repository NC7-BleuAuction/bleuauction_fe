import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storeListState } from '../modules/stores';
import Announce from '../components/MainPage/Announce';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { accordionSummaryClasses } from '@mui/material';
import { list } from '../lib/api/store';

const HomeContainer = () => {
  const [stores, setStores] = useRecoilState(storeListState);

  const [pageRowCount, setPageRowCount] = useState([6]);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    list({ pageRowCount, setStores });
  }, []);

  return (
    <>
      <Announce />
      {stores && <StoreHome stores={stores} />}
    </>
  );
};

export default HomeContainer;
