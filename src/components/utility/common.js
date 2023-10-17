import axios from 'axios';

export function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
  console.log(url);
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
  console.log(url);
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


function dateFormatParse(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function handleInputChange(e, index, state, stateSetter) {
  let { name, value } = e.target;
  let deepCopyState = [...state];
  deepCopyState[index] = {
    ...deepCopyState[index],
    [name]: value,
  };
  stateSetter(deepCopyState);
};
