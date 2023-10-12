import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Announce from '../components/MainPage/Announce';
import Category from '../components/MainPage/Category';
import StoreListItem from '../components/Market/StoreListItem';
import { Routes, Route } from 'react-router-dom';



function Home() {
  return (
    <>
    <Announce/> 
    <Category/>
    <StoreListItem/>
    </>
  )
}

export default Home;