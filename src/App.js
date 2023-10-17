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
import StoreList from './routes/StoreList';
import TabBar from './components/Market/TabBar';
import MarketDetailPage from './components/Market/MarketDetailPage';
import ReviewForm from './components/Review/ReviewForm';
import MyPage from './components/MyPage/MyPage';
import StoreMyPage from './components/MyPage/StoreMyPage';
import UserEditPage from './components/MyPage/UserEditPage';
import MyOrder from './components/MyPage/MyOrder';
import StoreItemDailyPrice from './components/StoreItemDailyPrice/StoreItemDailyPrice';
import UserProvider from  './components/Auth/UserContext';
import StoreRegisterPage from './components/MyPage/StoreRegisterPage';


function App() {
  // const [hello, setHello] = useState('');


  // useEffect(() => {
  //   axios.get('/api/hello') // 데이터 확인 테스트용
  //     .then(response => setHello(response.data))
  //     .catch(error => console.log(error));
  // }, []);


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
    <UserProvider>
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
        <Route path="/storemypage" element={<StoreMyPage />} />
        <Route path="/storeRegister" element={<StoreRegisterPage />} />
        <Route path="/useredit" element={<UserEditPage />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="/StoreItemDailyPrice" element={<StoreItemDailyPrice />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/register" && <SideBar />}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
    </UserProvider>
    </>
  );
}

export default App;




