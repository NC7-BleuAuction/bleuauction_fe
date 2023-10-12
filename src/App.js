import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Home from './routes/Home';
import SideBar from './components/Common/SideBar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Test from './components/Test/Test';
import Test2 from './components/Test/test2'
// import Main from './components/main'
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import MenuList from './components/Menu/MenuList';
import MarketDetailPage from './components/Market/MarketDetailPage';
import ReviewForm from './components/Review/ReviewForm';
import MyPage from './components/MyPage/MyPage'
import EditPage from './components/MyPage/EditPage';

function App() {
  const [hello, setHello] = useState('');


  useEffect(() => {
    axios.get('/api/hello') // 데이터 확인 테스트용
      .then(response => setHello(response.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <Router>
      <div className='App'>
        <div>{hello}</div>
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
        <Route path="/" element={<Home />} />
        <Route path="/api/test" element={<Test />} />
        <Route path="/api/test2" element={<Test2 />} />
        <Route path="/menulist" element={<MenuList />} />
        <Route path="/reviewregister" element={<ReviewForm />} />
        <Route path="/market/detail" element={<MarketDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/register" && <SideBar />}
      {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}  
    </>
  );
}

export default App;


