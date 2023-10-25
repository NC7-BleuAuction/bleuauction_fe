import '../utility/common.css';
import React, { useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { json, useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import {
  sendAxiosRequest,
  addEventToElements,
  removeEventToElements,
  isTokenExpired, getAccessToken, isNullUndefinedOrEmpty, isNotNullOrNonEmpty
} from '../utility/common';
import { useUser } from '../Auth/UserContext';
import jwtDecode from "jwt-decode";

function formatNumber(number) {
  return number.toLocaleString();
}

function updateItemNames() {
  const itemCodeSelect = document.getElementById("itemCode");
  const itemNameSelect = document.getElementById("itemName");

  const selectedValue = itemCodeSelect.value;
  const itemNames = itemNameSelect;

  const options = {
    'N': ['품목구분 항목을 먼저 선택해주세요.'],
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

const codeToTextMap = {
  'ES': '동해',
  'WS': '서해',
  'SS': '남해',
  'JJ': '제주',
  'WD': '완도',
  'JP': '일본',
  'CN': '중국',
  'RU': '러시아',
  'NW': '노르웨이',
  'ET': '기타'
};


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
    'D': ['ES', 'WS', 'SS', 'JJ', 'WD', 'ET'],
    'I': ['JP', 'CN', 'RU', 'NW', 'ET']
  };

  originPlaceNames.innerHTML = '';
  options[selectedValue].forEach(regionCode => {
    const option = document.createElement('option');
    option.value = regionCode;
    console.log(regionCode);
    option.textContent = codeToTextMap[regionCode] || regionCode;
    originPlaceNames.appendChild(option);
  });
}


function insertSidp(tokenMember) {
  let form = document.getElementById('sidpForm');
  let formData = new FormData(form);
  let jsonObj = formToJSON(formData);
  jsonObj.dailyPrice = formatNumber(jsonObj.dailyPrice).replaceAll(',', '');
  console.log('jsonObj: ', jsonObj);
  sendAxiosRequest('api/sidp/add', 'POST', jsonObj, response => {
    if (isNotNullOrNonEmpty(response.data)) {
      console.log('response.data: ', response.data);
      alert('품목 시세를 성공적으로 등록하였습니다.');
      window.location.reload();
    } else {
      alert('품목 등록에 실패하였습니다. 잠시후 다시 시도해주세요!');
    }


  }, erorr => console.log(console.log(erorr)), null, tokenMember);
}




function StoreItemRegister() {
  const [tokenMember] = useState(getAccessToken('a'));
  const [dailyPrice, setDailyPrice] = useState(''); // 사용자 입력을 저장할 상태
  const [minPrice] = useState(0); // 최소가격
  const [maxPrice] = useState(1000000); // 최대가격
  const [store] = useState(1);

  console.log('tokenMember: ', tokenMember);

  function handleDailyPriceChange(event) {
    let inputNumber = parseInt(event.target.value.replace(/,/g, ''), 10);

    // 최소 및 최대 값 적용
    if (isNaN(inputNumber) || inputNumber < minPrice) {
      inputNumber = minPrice;
    } else if (inputNumber > maxPrice) {
      alert('입력 가능한 최대 가격을 초과하였습니다!')
      inputNumber = '';
    }
    setDailyPrice(formatNumber(inputNumber));
  }
  // useEffect 내에서 updateItemNames를 호출
  useEffect(() => {
    const itemCodeSelect = document.getElementById("itemCode");
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
      <form id='sidpForm' className='ba-form-container'>
        <table>
          <thead>
            <tr>
              <th colSpan="2">품목 시세등록 </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><label htmlFor="daliyPriceDate">기준날짜</label></th>
              <td>
                <input name='storeNo' type='text' hidden value='1' />
                <input type='date' name='daliyPriceDate' />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="item_code">품목구분</label></th>
              <td>
                <select name='itemCode' id="itemCode">
                  <option selected value="N">선택안함</option>
                  <option value="S">생선(횟감)</option>
                  <option value="F">생선(비횟감)</option>
                  <option value="C">갑각류</option>
                  <option value="M">패류</option>
                  <option value="E">기타</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label htmlFor="itemName">품목</label></th>
              <td>
                <select name='itemName' id="itemName">
                  <option selected>품목구분 항목을 먼저 선택해주세요.</option>
                </select>
              </td>
            </tr>
            <tr>
              <th><label>크기</label></th>
              <td>
                <label htmlFor="itemSizeS">
                  <input type="radio" id="itemSizeS" name="itemSize" value="S" /> 소
                </label>
                <label htmlFor="itemSizeM">
                  <input type="radio" id="itemSizeM" name="itemSize" value="M" /> 중
                </label>
                <label htmlFor="itemSizeL">
                  <input type="radio" id="itemSizeL" name="itemSize" value="L" /> 대
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
                <label htmlFor="wildFarmStatusW">
                  <input type="radio" id="wildFarmStatusW" name="wildFarmStatus" value="W" /> 자연산
                </label>
                <label htmlFor="wildFarmStatusF">
                  <input type="radio" id="wildFarmStatusF" name="wildFarmStatus" value="F" /> 양식
                </label>
              </td>
            </tr>
            <tr>
              <th><label>금일가격</label></th>
              <td>
                <label htmlFor="dailPrice">
                  <input type="text" id="dailyPrice" name="dailyPrice" value={dailyPrice}
                    onChange={handleDailyPriceChange} />(원)
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" className='ba-btn ba-margin-tb50' onClick={() => insertSidp(tokenMember)}>품목시세 등록</button>
      </form>
    </div >

  );
}




export default StoreItemRegister;