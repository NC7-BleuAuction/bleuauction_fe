import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './StoreItemDailyPrice.css';
import { sendAxiosRequest } from '../utility/common';

function StoreItemDailyPrice() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); // 임시 false

  // const [stores, setStores] = useState([]);

  useEffect(() => {
  axios.get('/api/item') 
    .then(response => setItems(response.data)) 
    .catch(error => console.log(error));
    // console.log(stores);
  }, []);

console.log(items);


  const categoryOptions = {
    S: '생선/횟감',
    F: '생선/비횟감',
    C: '갑각류',
    M: '패류',
    E: '기타',
  };

  const originOptions = {
    ES: '동해',
    WS: '서해',
    SS: '남해',
    JJ: '제주',
    WD: '완도',
    JP: '일본',
    CN: '중국',
    RU: '러시아',
    NW: '노르웨이',
  };

  const recommendationItems = [
    {
      id: 1,
      image: 'item1.jpg',
      name: '추천 상품 1',
    },
    {
      id: 2,
      image: 'item2.jpg',
      name: '추천 상품 2',
    },
  ];


  // useEffect(() => {
  //   axios.get('/api/daily-price').then((response) => {
  //     setItems(response.data);
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <div className="daily-box">
      <div className="filter-buttons">
        <p>품목 카테고리 선택:</p>
        {Object.keys(categoryOptions).map((code) => (
          <button
            key={code}
            className={selectedCategory === code ? 'selected' : ''}
            onClick={() => setSelectedCategory(code)}
          >
            {categoryOptions[code]}
          </button>
        ))}
      </div>
      <div className="origin-buttons">
        <p>원산지 선택:</p>
        {Object.keys(originOptions).map((code) => (
          <button
            key={code}
            className={selectedOrigin === code ? 'selected' : ''}
            onClick={() => setSelectedOrigin(code)}
          >
            {originOptions[code]}
          </button>
        ))}
      </div>
      <div className="carousel">
        <h2>추천하는 오늘의 생선</h2>
        {/* <Carousel showArrows={true}>
          {recommendationItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <p className="legend">{item.name}</p>
            </div>
          ))}
        </Carousel> */}
      </div>
      <h1>오늘의 시세</h1>
      <div className="price-list">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>품목명</th>
                <th>품목크기</th>
                <th>원산지 구분</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter(
                  (item) =>
                    (!selectedCategory || item.itemCode === selectedCategory) &&
                    (!selectedOrigin || item.originPlaceStatus === selectedOrigin)
                )
                .map((item) => (
                  <tr key={item.itemNo}>
                    <td>{item.itemName}</td>
                    <td>{item.itemSize}</td>
                    <td>{originOptions[item.originPlaceStatus]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StoreItemDailyPrice;