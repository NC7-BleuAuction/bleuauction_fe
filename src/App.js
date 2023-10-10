import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import SideBar from './components/SideBar';
import Test from './components/Test';

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => setHello(response.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div className='App'>
      <div>
        {hello}
      {/* 데이터 확인 테스트용 */}
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/api/test" element={<Test />} />
        </Routes>
        <SideBar/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;