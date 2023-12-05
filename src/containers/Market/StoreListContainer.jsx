import React, { useEffect, useState } from 'react';
import Announce from '../../components/MainPage/Announce';
import {
  isOpenNow,
  sendAxiosRequest,
  scrollMoveTop,
  getAccessToken,
  isTokenExpired,
} from '../../lib/common';
import StoreListComponent from '../../components/Market/StoreListComponent';

function StoreListContainer() {
  const pageLowCount = 3;
  const [startPageNo, setStartPageNo] = useState(0);
  const [storeList, setStoreList] = useState([]);
  const [newAddLength, setNewAddLength] = useState(pageLowCount);
  const [isFetching, setIsFetching] = useState(false); // 스크롤 이벤트 실행 여부 체크 위한 flag
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    sendAxiosRequest(
      `/api/store/list`,
      'GET',
      null,
      (response) => {
        console.log('/api/store/list의 응답값 => ', response.data);
        setStoreList(response.data);
        setNewAddLength(response.data.length);
        setStartPageNo(Math.floor(response.data.length / pageLowCount));
      },
      (error) => console.log(error),
      null,
      accessToken
    );
  }, []);

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
        sendAxiosRequest(
          `/api/store/list?startPage=${startPageNo}`,
          'GET',
          null,
          (response) => {
            console.log(
              `/api/store/list?startPage=${startPageNo}의 응답값 => `,
              response.data
            );
            let addReviewList = response.data;
            setNewAddLength(addReviewList.length);
            let newReviewList = [...storeList, ...addReviewList];
            setStartPageNo(Math.floor(newReviewList.length / pageLowCount));
            setStoreList(newReviewList);
            setIsFetching(false);
          },
          (error) => {
            console.log(error);
            setIsFetching(false);
          },
          null,
          accessToken
        );
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
