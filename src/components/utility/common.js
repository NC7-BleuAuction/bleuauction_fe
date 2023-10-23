import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const mainUrl = 'http://localhost:3000';

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


export function refreshTokenInvalid() {
  alert('세션이 만료되어 재로그인이 필요합니다!');
  window.location.href = '/login';
}

export function accessTokenRefresh() {
  const refreshToken = localStorage.getItem('refreshToken');
  console.log('accessTokenRefresh() => refreshToken:', refreshToken);

  if (!isNullUndefinedOrEmpty(refreshToken)) {
    refreshTokenInvalid();
  }

  // 서버로 리프레시 토큰을 사용하여 새 액세스 토큰을 요청
  axios.post('/api/member/accTokRefresh', { refreshToken })
    .then(response => {
      console.log('/api/member/accTokRefresh => response: ', response);
      const newAccessToken = response.data.accessToken;
      if (!isNullUndefinedOrEmpty(newAccessToken)) {
        refreshTokenInvalid();
        return;
      }
      sessionStorage.setItem('accessToken', newAccessToken);
      console.log('refreshToken으로 accessToken 재발급 완료! =>');
    })
    .catch(error => {
      refreshTokenInvalid();
    });
}


export function logout() {
  const isConfirmed = window.confirm('정말로 로그아웃 하시겠습니까?');

  if (isConfirmed) {
    sessionStorage.clear();
    localStorage.clear();
    alert('정상적으로 로그아웃 되었습니다!');
    window.location.reload();
  }
}

export function getAccessToken(encodingOrDecodingType) {
  encodingOrDecodingType = encodingOrDecodingType.toLowerCase();

  const accessToken = sessionStorage.getItem('accessToken');

  if (isNullUndefinedOrEmpty(accessToken)) {
    if (encodingOrDecodingType === 'a') {
      return accessToken;
    } else if (encodingOrDecodingType === 'd') {
      return jwtDecode(accessToken);
    }
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
    .catch(errorCallback);
}


export function sendAxiosMultipartRequest(url, formData, successCallback, errorCallback) {
  console.log('sendAxiosMultipartRequest의 요청 URL: ', url);
  console.log('sendAxiosMultipartRequest의 요청 데이터: ', formData);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  };
  axios(axiosConfig).then(successCallback).catch(errorCallback);
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