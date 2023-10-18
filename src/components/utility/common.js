import axios from 'axios';

export function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
  console.log('sendAxiosRequest의 요청 URL: ', url);
  console.log('sendAxiosRequest의 요청 데이터: ', params);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (params != null)
    axiosConfig.params = params;
  axios(axiosConfig).then(successCallback).catch(errorCallback);
}

export function sendAxiosMultipartRequest(url, method, formData, successCallback, errorCallback) {
  console.log('sendAxiosMultipartRequest의 요청 URL: ', url);
  console.log('sendAxiosMultipartRequest의 요청 데이터: ', formData);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: method,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
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