import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sendAxiosRequest } from '../utility/common';
import './StoreItemAdd.css';
import { useNavigate } from 'react-router-dom';


function StroeItemAdd() {

  const [fish, setFish] = useState('');
  const [code, setCode] = useState('');
  const [size, setSize] = useState('');
  const [origin, setOrigin] = useState('');
  const [place, setPlace] = useState('');
  const [wild, setWild] = useState('');
  const [price, setPrice] = useState('');

  const handleCode = () => {
    setCode(
      (fish === '광어'||'우럭'||'도미'||'방어'||'참치') ? 'S' :
      (fish === '연어') ? 'F' :
      (fish === '오징어') ? 'E' :
      (fish === '새우') ? 'C' :
      (fish === '가리비'||'전복') ? 'M' : '')
    }

  const handleSize = (e) => {
    setSize(e.target.value)
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const itemSize = 
  Number(size) >= 3 ? 'L' :
  Number(size) >= 2 ? 'M' : 'S'
  

  const fishs = {
    '광어': 1,
    '우럭': 2,
    '도미': 3,
    '방어': 4,
    '참치': 5,
    '연어': 6,
    '오징어': 7,
    '새우': 8,
    '가리비': 9,
    '전복': 10
  }

  const codes = {
    S: '생선/횟감',
    F: '생선/비횟감',
    C: '갑각류',
    M: '패류',
    E: '기타',
  };

  const DPlace = {
    ES: '동해',
    WS: '서해',
    SS: '남해',
    JJ: '제주',
    WD: '완도'
  }

  const IPlace = {
    JP: '일본',
    CN: '중국',
    RU: '러시아',
    NW: '노르웨이'
  }

  const selectPlace = 
  (origin === "D") ? DPlace : 
  (origin === "I") ? IPlace : null;

  const hiddenButtons = 
  (selectPlace !== null) ?
    Object.keys(selectPlace).map((code) => (
      <button
        key={code}
        className={place === code ? 'selected' : ''}
        onClick={() => setPlace(code)}
      >
        {selectPlace[code]}
      </button>
    ))
    : null;
  
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    console.log('dddd');
    sendAxiosRequest ('/api/item/new', 'POST', item, response => {
      console.log(response.data);
      console.log(item);
      navigate('/');
    }, error => {
      console.log(error);
    });

  };

  const item = {
    'itemName': fish,
    'itemCode': code,
    'itemSize': itemSize,
    'originStatus': origin,
    'originPlaceStatus': place,
    'wildFarmStatus': wild
  }




  return (
    <>
      <p>품목 선택</p>
      <div className="freezer_box">
      {
        Object.keys(fishs).map((name) => (
          <div key={name}
            className={fish === name ? 'selected' : 'not_selected'} 
            onClick={() => {setFish(name); handleCode()}}>
            <img src={`/images/fish${fishs[name]}.jpg`} alt={name} className='fish_image'/>
            <p>{name}</p>
          </div>
        ))
      }
      </div>

      <div className='fish_size'>
        <p>무게 입력 (kg)</p>
        <div>
          <input
              type="number"
              value={size}
              onChange={handleSize}
              placeholder="예) 2.5"
            />
        </div>
      </div>

      <div className='fish_size'>
        <p>금일 판매 가격 (원)</p>
        <div>
          <input
              type="number"
              value={price}
              onChange={handlePrice}
              placeholder="예) 10000"
            />
        </div>
      </div>
      
      <div className="fish_origin">
        <p>원산지</p>
        
        <div className="origin_buttons">
          <button className={origin === 'D' ? 'selected' : ''}
            onClick={() => setOrigin('D')}>국내산</button>
          <button className={origin === 'I' ? 'selected' : ''}
            onClick={() => setOrigin('I')}>수입산</button>
        </div>

      </div>

      <div className='fish_place'>
        

        <div className="filter_buttons">
          {hiddenButtons}
        </div>
      </div>

      <div className='fish_origin'>
        <p>자연산 / 양식</p>

        <div className="origin_buttons">
          <button className={wild === 'W' ? 'selected' : ''}
            onClick={() => setWild('W')}>자연산</button>
          <button className={wild === 'F' ? 'selected' : ''}
            onClick={() => setWild('F')}>양식</button>
        </div>

      </div>

      <div className='fish_origin'>
        <div className="origin_buttons">
        <button onClick={handleSubmit}>제출하기</button>
        </div>
      </div>
    </>
  )
}

export default StroeItemAdd;