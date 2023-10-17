import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import Category from '../components/MainPage/Category';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { Routes, Route } from 'react-router-dom';


var list = [
  {
    'storeNo': 1,
    'memberNo': '1',
    'storeName': '해피' ,
    'licenseNo': '11',
    'storeZipcode': '1111',
    'storeAddr': '주소',
    'storeDetailAddr': '상세주소',
    'weekdayStartTime': '',
    'weekdayEndTime': '',
    'weekendStartTime': '',
    'weekendStartTime': '',
    'unsupportedType': '',
    'storeStatus': 'Y',
    'menus':[],
    'orders': []
  }
];



function Home() {

  const [stores, setStores] = useState([]);

  useEffect(() => {
  axios.get('/api/store/list') 
    .then(response => setStores(response.data)) 
    .catch(error => console.log(error));
    // console.log(stores);
  }, []);

  // console.log(stores);


  // for(let i = 0; stores[i]; i++){
  //   stores[i].index = i;
  // }


  return (
    <>
    <Announce/> 
    <Category/>
    <StoreHome stores = {stores}/>
    {/* <button onClick={()=>{console.log(stores); window.sessionStorage.getItem("memberNo")}}></button> */}
    </>
  )
}

export default Home;