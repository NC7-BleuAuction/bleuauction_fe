import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'react-bootstrap';
import './App.css';

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
      axios.get('/api/hello')
      .then(response => setHello(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="App">
      <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
      <Header/>
      <Announce/>
      <SideBar/>
      <Footer/>
    </div>
  );
}

function Header() {
  return (
    <div className="header-box">
      <div className='header-top'>
          <a href="/" id="header-title">BLEU AUCTION</a>
            <form className='header-search-form'>
              <input className='header-search-box' type='text' placeholder='검색어를 입력하세요.'></input>
              <button id='search-btn' type="submit"></button>
            </form>
          <a href='/'>로그인</a>
          <a href='/'>회원가입</a>
      </div>

      <div className='header-bottom'>
        <a href='/'>추천</a>
        <a href='/'>시장</a>
        <a href='/'>시세</a>
        <a href='/'>공지사항</a>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className='footer-box'>
      <img src='../LogoPage.png' />
    </div>
  )
}

function SideBar() {
  return (
    <div className='side-bar-box'>
      <a href='/'>등록</a>
      <a href='/'>오늘의 <br/>방사능</a>
      <a href='/'>챗봇</a>
    </div>
  )
}

function Announce() {
  const carousel = {
    height: '400px',
    width: '60%',
    margin: '0 auto',
    borderRadius: '30px',
    overflow: 'hidden'
  }
  return (           
    <div style={carousel}>
    <Carousel >
      {/* 슬라이드 이미지 */}
      <Carousel.Item id='carousel'>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_I0twC6CuVzdVxXirXhxPbCOZTrwBFFqjmeX4pTw&s"
          alt="슬라이드 1"
        />
        <Carousel.Caption>
          <h3>꽃소녀</h3>
          <p>김철수 作</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item id='carousel'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_I0twC6CuVzdVxXirXhxPbCOZTrwBFFqjmeX4pTw&s" alt="슬라이드 2" />
        <Carousel.Caption>
          <h3>형형색색</h3>
          <p>이숙자 作</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item id='carousel'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_I0twC6CuVzdVxXirXhxPbCOZTrwBFFqjmeX4pTw&s" alt="슬라이드 3" />
        <Carousel.Caption>
          <h3>분홍</h3>
          <p>Robert Park 作</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item id='carousel'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8_I0twC6CuVzdVxXirXhxPbCOZTrwBFFqjmeX4pTw&s" alt="슬라이드 4" />
        <Carousel.Caption>
          <h3>두꺼운 터치</h3>
          <p>Thomas Lee 作</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}






export default App;

{/*
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  여기는 킹종원이 점령했다.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header>
*/}