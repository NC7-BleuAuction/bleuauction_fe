import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Announce.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

function Announce(props) {
  const location = useLocation();
  let attaches;
  if (location.pathname === '/store/list') {
    attaches = props.storeList
      .filter(store => store.storeAttaches.length > 0)
      .flatMap(store => store.storeAttaches.map(attach => 'https://kr.object.ncloudstorage.com/bleuauction-bucket/' + attach.filePath + attach.saveFilename));
  }




  const carouselContainer = {
    height: '400px',
    width: '60%',
    margin: '0 auto',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0px 0px 5px 20px #1565c0', /* 옅은 파랑색 */
  };



  const images = location.pathname !== '/store/list' ? [
    "/images/11ad8.png",
    "/images/11ad9.png",
    "/images/11ad6.png",
    "/images/11ad7.png",
    "https://www.youtube.com/watch?v=BTsODTH2SRk" // Add the video URL here
  ] : attaches;

  return (
    <div style={carouselContainer}>
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index} id={styles.carousel}>
            {index === images.length - 1 ? (

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <ReactPlayer url={image} playing style={{ margin: 'auto' }} />
              </div>
            ) : (<>
              <img src={image} alt={`슬라이드 ${index + 1}`} />
            </>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Announce;
