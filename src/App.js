import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import AdminPage from './components/MyPage/AdminPage';
import NoticeList from './components/Notice/NoticeList';
import NoticeDetail from './components/Notice/NoticeDetail';
import { useUser } from './components/Auth/UserContext';
import StoreMyPage from './components/MyPage/StoreItemRegister'; // StoreMyPage 컴포넌트 파일의 경로에 따라 수정
import { sendAxiosRequest } from './components/utility/common';
import StoreItemAdd from  './components/StoreItemDailyPrice/StoreItemAdd';

function App() {
  // const [hello, setHello] = useState('');


  // useEffect(() => {
  //   axios.get('/api/hello') // 데이터 확인 테스트용
  //     .then(response => setHello(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  const {user, login} = useUser();

  // user !==null ? ()

  // // const data = localStorage.getItem(user);

  // useEffect(() => {
  // //   // sendAxiosRequest("/api/member/login", 'POST', user, response => {
  // //   //   console.log(response.data);
  //     console.log(localStorage.getItem('memberEmail'));
  //     console.log(localStorage.getItem('memberPwd'));
  //     const saveUser = {
  //       'memberEmail': localStorage.getItem('memberEmail'),
  //       'memberPwd': localStorage.getItem('memberPwd')
  //     }
  //     if (localStorage.getItem('memberEmail') !== null) {
  //       login(saveUser);
  //     }
  // //     login(localStorage.getItem('data'));
  // //     // console.log(user);
  // //   // }, error => {
  // //     // console.log(error);
  // //   // });
  // }, [])



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
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/notice/list" element={<NoticeList />} />
        <Route path="/notice/detail/:noticeNo" element={<NoticeDetail />} />
        <Route path="/storemypage" element={<StoreMyPage />} />
        <Route path="/storeItemRegister" element={<StoreItemRegister />} />
        <Route path="/StoreItemAdd" element={<StoreItemAdd />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/register" && <SideBar />}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </>
  );
}

export default App;




