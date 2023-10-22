import React, { useEffect, useState } from 'react';
import axios, { formToJSON } from 'axios';
import './App.css';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from './routes/Home';
import SideBar from './components/Common/SideBar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Test from './components/Test/Test';
import Test2 from './components/Test/test2';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import MenuList from './components/Menu/MenuList';
import MenuRegisterationForm from './components/Menu/MenuRegisterationForm';
import StoreList from './components/Market/StoreList';
import MarketDetailPage from './components/Market/MarketDetailPage';
import ReviewForm from './components/Review/ReviewForm';
import MyPage from './components/MyPage/MyPage';
import UserEditPage from './components/MyPage/UserEditPage';
import MyOrder from './components/MyPage/MyOrder';
import StoreItemDailyPrice from './components/StoreItemDailyPrice/StoreItemDailyPrice';
import UserProvider from './components/Auth/UserContext';
import StoreItemRegister from './components/MyPage/StoreItemRegister'
import Payment from './components/Pay/Pay';
import StoreRegisterPage from './components/MyPage/StoreRegisterPage';
import StoreEditPage from './components/MyPage/StoreEditPage ';
import NoticeList from './components/Notice/NoticeList';
import NoticeDetail from './components/Notice/NoticeDetail';
import { useUser } from './components/Auth/UserContext';
import { sendAxiosRequest } from './components/utility/common';
import StoreItemAdd from  './components/StoreItemDailyPrice/StoreItemAdd';
import NoticeRegisterationForm from  './components/Admin/NoticeRegisterationForm';
import AdminNoticeList from  './components/Admin/AdminNoticeList';
import AdminNoticeDetail from  './components/Admin/AdminNoticeDetail';

function App() {

  const {user, login} = useUser();


  // useEffect(() => {
  // if (localStorage.getItem('memberEmail') !== null) {
  // const saveUser = {
  //   'memberEmail': localStorage.getItem('memberEmail'),
  //   'memberPwd': localStorage.getItem('memberPwd')
  // };

  //   if (saveUser !== null) {
  //     sendAxiosRequest("/api/member/login", 'POST', formToJSON(saveUser), response => {
  //       //   //   console.log(response.data);
  //       console.log(localStorage.getItem('memberEmail'));
  //       console.log(localStorage.getItem('memberPwd'));
  //       // if (response.data.loginUser !== null) {
  //         login(response.data.loginUser)
  //       // }
  //       // login(saveUser);
  //       //     login(localStorage.getItem('data'));
  //       //     // console.log(user);
  //       //   // }, error => {
  //         //     // console.log(error);
  //       });
  //     }
  //   }
  //   }, []);



  return (
    <Router>
      <div className='App'>
        {/* <div>{hello}</div> */}
        <RoutingComponent />
      </div>
    </Router>
  );

}

function RoutingComponent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/store/list" element={<StoreList />} />
        <Route path="/api/test" element={<Test />} />
        <Route path="/api/test2" element={<Test2 />} />
        <Route path="/menulist" element={<MenuList />} />
        <Route path="/reviewregister" element={<ReviewForm />} />
        <Route path="/market/detail" element={<MarketDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/storeRegister" element={<StoreRegisterPage />} />
        <Route path="/useredit" element={<UserEditPage />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="/StoreItemDailyPrice" element={<StoreItemDailyPrice />} />
        <Route path="/MenuRegisterationForm" element={<MenuRegisterationForm />} />
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/detail/:noticeNo" element={<NoticeDetail />} />
        <Route path="/StoreEditPage" element={<StoreEditPage />} />
        <Route path="/storeItemRegister" element={<StoreItemRegister />} />
        <Route path="/StoreItemAdd" element={<StoreItemAdd />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/admin/notice/register" element={<NoticeRegisterationForm />} />
        <Route path="/admin/notice/list" element={<AdminNoticeList />} />
        <Route path="/admin/notice/detail/:noticeNo" element={<AdminNoticeDetail />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/register" && <SideBar />}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </>
  );
}

export default App;




