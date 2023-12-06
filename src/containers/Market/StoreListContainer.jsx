import React, { useEffect, useState } from 'react';
import Announce from '../../components/MainPage/Announce';
import {
  isOpenNow,
  sendAxiosRequest,
  scrollMoveTop,
  getAccessToken,
  isTokenExpired,
} from '../../lib/common';
import { list } from '../../lib/api/store';
import StoreListComponent from '../../components/Market/StoreListComponent';
import { useRecoilState } from 'recoil';
import { storeListState } from '../../modules/stores';

function StoreListContainer() {
  const pageLowCount = 3;
  const [startPageNo, setStartPageNo] = useState(0);
  const [storeList, setStoreList] = useRecoilState(storeListState);
  const [newAddLength, setNewAddLength] = useState(pageLowCount);
  const [isFetching, setIsFetching] = useState(false); // 스크롤 이벤트 실행 여부 체크 위한 flag
  const accessToken = sessionStorage.getItem('accessToken');

  const initList = async () => {
    const response = await list({ jwtToken: accessToken });
    if (response?.data) {
      setStoreList(response.data);
      setNewAddLength(response.data.length);
      setStartPageNo(Math.floor(response.data.length / pageLowCount));
    }
  };
  useEffect(() => {
    initList();
  }, []);

  const addList = async () => {
    const response = await list({
      jwtToken: accessToken,
      startPageNo,
    });
    if (response?.data) {
      let addReviewList = response.data;
      setNewAddLength(addReviewList.length);
      let newReviewList = [...storeList, ...addReviewList];
      setStartPageNo(Math.floor(newReviewList.length / pageLowCount));
      setStoreList(newReviewList);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || newAddLength < pageLowCount) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {
        setIsFetching(true);

        console.log('스크롤 이벤트 핸들러 작동');
        addList();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startPageNo, storeList, isFetching]);

  return (
    <>
      <Announce storeList={storeList} />
      <StoreListComponent storeList={storeList} scrollMoveTop={scrollMoveTop} />
    </>
  );
}

export default StoreListContainer;
