import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import SideBar from './components/SideBar';
// import Test from './components/Test';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test'; // 경로 수정
import Test2 from './components/Test/test2'
// import Main from './components/main'

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/hello') // 데이터 확인 테스트용
      .then(response => setHello(response.data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div className='App'>
      <div>
        {hello}
      {/* 데이터 확인 테스트용 */}
      </div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/api/test" element={<Test />} />
          <Route path="/api/test2" element={<Test2 />} />
        </Routes>
        <SideBar/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
