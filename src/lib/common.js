import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { isValidDateValue } from "@testing-library/user-event/dist/utils";


export const mainUrl = 'http://localhost:3000';

export function isNotNullOrNonEmpty(value) {
  if (value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }

  return true;
}

/* 토큰 만료 체크 */
export function isTokenExpired(token) {
  if (!isNullUndefinedOrEmpty(token)) {
    return true;
  }
  const expirationTime = jwtDecode(token).exp * 1000;
  const currentDate = Date.now();
  return currentDate > expirationTime; // 토큰 만료 true 반환
}


export function isNullUndefinedOrEmpty(value) {
  const valueStr = value + '';
  if (valueStr === 'null' || value === 'undefined' || /^\s*$/.test(valueStr)) {
    return null;
  }
  return value;
}

export function redirectLogin() {
  window.location.href = '/login';
  alert('인증이 만료되어 재로그인이 필요합니다!');
}

export function accessTokenRefresh() {
  const refreshToken = localStorage.getItem('refreshToken');
  console.log('accessTokenRefresh() => refreshToken:', refreshToken);

  if (!isNullUndefinedOrEmpty(refreshToken)) {
    redirectLogin();
  }

  // 서버로 리프레시 토큰을 사용하여 새 액세스 토큰을 요청
  axios.post('/api/member/accTokRefresh', { refreshToken })
    .then(response => {
      console.log('/api/member/accTokRefresh => response: ', response);
      const newAccessToken = response.data.accessToken;
      if (!isNullUndefinedOrEmpty(newAccessToken)) {
        redirectLogin();
        return;
      }
      sessionStorage.setItem('accessToken', newAccessToken);
      console.log('refreshToken으로 accessToken 재발급 완료! =>');
    })
    .catch(error => {
      redirectLogin();
    });
}


export function logout() {
  const isConfirmed = window.confirm('정말로 로그아웃 하시겠습니까?');

  if (isConfirmed) {
    sessionStorage.clear();
    localStorage.clear();
    alert('정상적으로 로그아웃 되었습니다!');
    window.location.href = '/';
    // window.location.reload();
  }
}

export function getAccessToken(encodingOrDecodingType) {
  encodingOrDecodingType = encodingOrDecodingType.toLowerCase();

  const accessToken = sessionStorage.getItem('accessToken');

  if (isTokenExpired(accessToken)) {
    redirectLogin();
    return;
  }

  if (encodingOrDecodingType === 'a') {
    return accessToken;
  } else if (encodingOrDecodingType === 'd') {
    return jwtDecode(accessToken);
  }

  return null;
}

export function getLoginUserInfo(decodedToken) {
  if (decodedToken != null) {
    const { sub, memberName, memberEmail } = decodedToken;
    return { sub, memberName, memberEmail };
  }
  return null;
}


export function processAxiosTokenError(error) {
  console.log('processAxiosTokenError ==========> ', error.data);
  if (error.data === 'E') { // 토큰이 있으나 기간이 만료된 경우 => 엑세스 토큰 재발급
    console.error('토큰의 기간이 만료되었습니다!');
    accessTokenRefresh();
  } else if (error.data === 'I') { // 서버에서 검증 받는데 실패한 토큰의 경우 => 로그인을 통한 완전 재발급
    console.error('값이 누락되거나 유효하지 않은 토큰입니다!');
    redirectLogin();
  } else {
    console.error('토큰 이외의 에러 발생!');
  }
}


export function sendAxiosRequest(url, method, data, successCallback, errorCallback, contentType, jwtToken) {
  console.log('sendAxiosRequest의 요청 URL: ', url);
  console.log('sendAxiosRequest의 요청 데이터: ', data);

  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: method,
  };

  if (data) {
    if (contentType === 'application/json') {
      axiosConfig.headers = {
        'Content-Type': contentType,
        'Authorization': jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
      };
      // JSON 객체일시 문자열로 변환
      axiosConfig.data = JSON.stringify(data);
    } else {
      axiosConfig.data = data;
      axiosConfig.headers = {
        'Authorization': jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
      };
    }
  } else {
    // 데이터가 없는 경우
    axiosConfig.headers = {
      'Authorization': jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
    };
  }
  console.log('sendAxiosRequest().axiosConfig: ', axiosConfig);

  axios(axiosConfig)
    .then(successCallback)
    .catch(error => {
      processAxiosTokenError(error);
    });
}


export function sendAxiosMultipartRequest(url, formData, successCallback, errorCallback, jwtToken) {
  console.log('sendAxiosMultipartRequest의 요청 URL: ', url);
  console.log('sendAxiosMultipartRequest의 요청 데이터: ', formData);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: 'POST',
    data: formData,
    headers: {
      'Authorization': jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
      'Content-Type': 'multipart/form-data',
    }
  };
  axios(axiosConfig).then(successCallback).catch(error => {
    processAxiosTokenError(error);
  });
}

export function putsendAxiosMultipartRequest(url, formData, successCallback, errorCallback, jwtToken) {
  console.log('sendAxiosMultipartRequest의 요청 URL: ', url);
  console.log('sendAxiosMultipartRequest의 요청 데이터: ', formData);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: 'PUT',
    data: formData,
    headers: {
      'Authorization': jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
      'Content-Type': 'multipart/form-data',
    }
  };
  axios(axiosConfig).then(successCallback).catch(error => {
    processAxiosTokenError(error);
  });
}


export function dateFormatParse(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function handleInputChange(e, index, state, stateSetter) {
  let { name, value } = e.target;
  let deepCopyState = [...state];
  deepCopyState[index] = {
    ...deepCopyState[index],
    [name]: value,
  };
  stateSetter(deepCopyState);
}

export function scrollMoveTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function getCurrentDay() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0 (일요일)부터 6 (토요일)까지

  return dayOfWeek;
}


// 현재 일 기준 가게 시작, 종료 시간
export function startEndTimeInfo(store) {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();

  let startTime;
  let endTime;
  if (dayOfWeek === 0 || dayOfWeek === 6) { // 주말이면
    startTime = store.weekendStartTime;
    endTime = store.weekendEndTime;
  } else { // 평일이면
    startTime = store.weekdayStartTime;
    endTime = store.weekdayEndTime;
  }

  return [startTime, endTime];
}


// 가게 시작시간, 종료시간 기준으로 영업중인지 확인
export function isOpenNow(startTime, endTime) {
  const currentDate = new Date();
  const currentTimeMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
  const start = startTime.split(':').map(Number);
  const end = endTime.split(':').map(Number);

  const startTimeMinutes = start[0] * 60 + start[1];
  const endTimeMinutes = end[0] * 60 + end[1];

  // O: 마감 C: 영업중
  return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes ? 'O' : 'C';
}


export function isStoreOpen(startTime, endTime, currentDay) {
  const currentTime = new Date();
  const openTime = new Date(currentTime.toDateString() + ' ' + startTime);
  const closeTime = new Date(currentTime.toDateString() + ' ' + endTime);

  if (currentTime >= openTime && currentTime <= closeTime) {
    return <span style={{ color: 'blue' }}> (영업중)</span>;
  } else {
    return <span style={{ color: 'red' }}> (영업종료)</span>;
  }
}


// 리스트(요소여러 개)에 이벤트 추가
export function addEventToElements(eventName, eventFunction, elements) {
  for (let element of elements) {
    element.addEventListener(eventName, eventFunction);
  }
}

// 리스트(요소여러 개)에 이벤트 제거
export function removeEventToElements(eventName, eventFunction, elements) {
  for (let element of elements) {
    element.removeEventListener(eventName, eventFunction);
  }
}