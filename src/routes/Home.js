import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import Category from '../components/MainPage/Category';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { Routes, Route } from 'react-router-dom';


var list = [
  {
    'storeNo': '',
    'memberNo': '',
    'storeName': '' ,
    'licenseNo': '',
    'storeZipcode': '',
    'storeAddr': '',
    'storeDetailAddr': '',
    'weekdayStartTime': '',
    'weekdayEndTime': '',
    'weekendStartTime': '',
    'weekendStartTime': '',
    'unsupportedType': '',
    'storeStatus': '',
    'menus':[],
    'orders': []
  }
];



function Home() {

  const [stores, setStores] = useState(list);

  useEffect(() => {
  axios.get('/api/store/list/axios') 
    .then(response => setStores(response.data))
    .catch(error => console.log(error));
    console.log(stores);
  }, []);



  return (
    <>
    <Announce/> 
    <Category/>
    {/* <StoreHome storeList = {stores}/> */}
    <button onClick={()=>{console.log(stores)}}></button>
    </>
  )
}

export default Home;