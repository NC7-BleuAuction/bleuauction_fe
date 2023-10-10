import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Announce from '../components/Announce';
import Category from '../components/Category';
import StoreListItem from '../components/StoreListItem';
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