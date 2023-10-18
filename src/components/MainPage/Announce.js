import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Announce.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function Announce() {
  const carousel = {
    height: '400px',
    width: '60%',
    margin: '0 auto',
    borderRadius: '30px',
    overflow: 'hidden'
  }

  const location = useLocation();
  const content = (location.pathname !== "/store/list") ? <img
    src="/images/storeimage.png"
    alt="슬라이드 1"
  /> : <img src='/images/login.png' />;

  return (
    <div style={carousel}>
      <Carousel >
        {/* 슬라이드 이미지 */}
        <Carousel.Item id={styles.carousel}>
          {content}

          <Carousel.Caption>
            <h3>꽃소녀</h3>
            <p>김철수 作</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id={styles.carousel}>
          {content}
          <Carousel.Caption>
            <h3>형형색색</h3>
            <p>이숙자 作</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id={styles.carousel}>
          {content}
          <Carousel.Caption>
            <h3>분홍</h3>
            <p>Robert Park 作</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id={styles.carousel}>
          {content}
          <Carousel.Caption>
            <h3>두꺼운 터치</h3>
            <p>Thomas Lee 作</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        쿠폰div
      </div>
    </div>
  );
}

export default Announce;