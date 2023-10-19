import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import Category from '../components/MainPage/Category';
import StoreListItem from '../components/Market/StoreListItem';
import StoreHome from '../components/StoreHome';
import { Routes, Route } from 'react-router-dom';

function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
  console.log(url);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: method,
  };
  if (params != null)
    axiosConfig.params = params;
  axios(axiosConfig).then(successCallback).catch(errorCallback);
}




function Home() {

  const [stores, setStores] = useState([]);

  useEffect(() => {

    sendAxiosRequest('/api/store/list', 'GET', null, response => {
      console.log(response.data);
      setStores(response.data);
    }, error => {
      console.log(error);
    });


  // axios.get('/api/store/list')
  //   .then(response => {
  //     console.log('responseData', response);
  //     setStores(response.data)
  //   })
  //   .catch(error => console.log(error));
  //   // console.log(stores);
  }, []);

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