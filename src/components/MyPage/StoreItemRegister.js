import '../utility/Common.css';
import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest, addEventToElements, removeEventToElements } from '../utility/Common';

function formatNumber(number) {
  return number.toLocaleString();
}

function updateItemNames() {
  const itemCodeSelect = document.getElementById("item_code");
  const itemNameSelect = document.getElementById("item_name");

  const selectedValue = itemCodeSelect.value;
  const itemNames = itemNameSelect;

  const options = {
    'S': ['광어', '우럭', '도미', '방어', '전복', '참치', '연어', '가리비', '전갱이'],
    'F': ['광어', '우럭', '도미', '방어', '전복', '참치', '연어', '가리비', '전갱이'],
    'C': ['새우'],
    'M': ['가리비', '오징어'],
    'E': ['기타']
  };

  itemNames.innerHTML = '';
  options[selectedValue].forEach(fishName => {
    const option = document.createElement('option');
    option.value = fishName;
    option.textContent = fishName;
    itemNames.appendChild(option);
  });
}


function updateOriginStatus() {
  const originStatusSelects = document.querySelectorAll("[name=originStatus]");
  const originPlaceStatusSelect = document.getElementById("originPlaceStatus");

  let selectedValue;
  originStatusSelects.forEach(input => {
    if (input.checked) {
      selectedValue = input.value;
    }
  })


  const originPlaceNames = originPlaceStatusSelect;

  const options = {
    'D': ['동해', '서해', '남해', '제주', '완도', '기타'],
    'I': ['일본', '중국', '러시아', '노르웨이', '기타']
  };

  originPlaceNames.innerHTML = '';
  options[selectedValue].forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    originPlaceNames.appendChild(option);
  });
}
function StoreItemRegister() {
  const [dailyPrice, setDailyPrice] = useState(''); // 사용자 입력을 저장할 상태
  const [minPrice] = useState(1000); // 최소가격
  const [maxPrice] = useState(1000000); // 최대가격

  function handleDailyPriceChange(event) {
    let inputNumber = parseInt(event.target.value.replace(/,/g, ''), 10);

    // 최소 및 최대 값 적용
    if (isNaN(inputNumber) || inputNumber < minPrice) {
      inputNumber = minPrice;
    } else if (inputNumber > maxPrice) {
      inputNumber = maxPrice;
    }

    setDailyPrice(formatNumber(inputNumber));
  }
  // useEffect 내에서 updateItemNames를 호출
  useEffect(() => {
    const itemCodeSelect = document.getElementById("item_code");
    const originStatusSelects = document.querySelectorAll("[name=originStatus]");

    itemCodeSelect.addEventListener('change', updateItemNames);
    addEventToElements('change', updateOriginStatus, originStatusSelects);

    return () => {
      itemCodeSelect.removeEventListener('change', updateItemNames);
      removeEventToElements('change', updateOriginStatus, originStatusSelects);
    };
  }, []);



  return (

    <div className='ba-cursor-pointer-div'>
      <form className='ba-form-container'>
        <table>
          <thead>
            <tr>
              <th colSpan="2">품목 시세등록 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><label htmlFor="daliy_price_date">기준날짜</label></th>
              <td>
                <input type='date' name='daliy_price_date' />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="item_code">품목구분</label></th>
              <td>
                <select name='item_code' id="item_code">
                  <option selected>선택안함</option>
                  <option value="S">생선(횟감)</option>
                  <option value="F">생선(비횟감)</option>
                  <option value="C">갑각류</option>
                  <option value="M">패류</option>
                  <option value="E">기타</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="item_name">품목</label></th>
              <td>
                <select name='item_name' id="item_name">
                  <option selected>품목구분 항목을 먼저 선택해주세요.</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label>크기</label></th>
              <td>
                <label htmlFor="sizeS">
                  <input type="radio" id="sizeS" name="itemSize" value="S" /> 소
                </label>
                <label htmlFor="sizeM">
                  <input type="radio" id="sizeM" name="itemSize" value="M" /> 중
                </label>
                <label htmlFor="sizeL">
                  <input type="radio" id="sizeL" name="itemSize" value="L" /> 대
                </label>
              </td>
            </tr>
            <tr>
              <th><label>원산지</label></th>
              <td>
                <label htmlFor="originD">
                  <input type="radio" id="originD" name="originStatus" value="D" /> 국내산
                </label>
                <label htmlFor="originI">
                  <input type="radio" id="originI" name="originStatus" value="I" /> 수입산
                </label>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="originPlaceStatus">지역명</label></th>
              <td>
                <select name="originPlaceStatus" id="originPlaceStatus">
                  <option selected>원산지 항목을 먼저 선택해주세요.</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label>자연산/양식</label></th>
              <td>
                <label htmlFor="wild_farm_statusW">
                  <input type="radio" id="wild_farm_statusW" name="wild_farm_status" value="W" /> 자연산
                </label>
                <label htmlFor="wild_farm_statusF">
                  <input type="radio" id="wild_farm_statusF" name="wild_farm_status" value="F" /> 양식
                </label>
              </td>
            </tr>
            <tr>
              <th><label>금일가격</label></th>
              <td>
                <label htmlFor="daily_price">
                  <input type="text" id="daily_price" name="daily_price" value={dailyPrice}
                    onChange={handleDailyPriceChange} />(원)
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" className='ba-btn ba-margin-tb50'>품목등록</button>
      </form>
    </div >

  );
}




export default StoreItemRegister;