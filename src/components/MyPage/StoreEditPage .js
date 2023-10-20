import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { sendAxiosMultipartRequest, sendAxiosRequest } from '../utility/common';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StoreEditPage() {
  const defaultImage = '/images/rose.png';
  const [store, setStore] = useState(null);

  useEffect(() => {
    sendAxiosRequest('api/store/loginCheck', 'GET', null, (response) => {
      let loginStore = response.data.loginStore;
      setStore(loginStore);
    }, (error) => {
      console.log(error);
    });
  }, []);

  const navigate = useNavigate();

  function updateStore() {
    let formData = new FormData();

    const updateStoreRequest = JSON.stringify(store);
    const updateStoreBlob = new Blob([updateStoreRequest], { type: 'application/json' });
    formData.append('updateStoreRequest', updateStoreBlob);

    let fileInput = document.getElementById('imageInput');
    if (fileInput.files[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }

    sendAxiosMultipartRequest('/api/store/update', 'PUT', formData, response => {
      console.log('response.data', response.data);
    }, (error) => {
      console.error('가게 업데이트 중 에러 발생', error);
    });
  }

  const [currentImage, setCurrentImage] = useState(defaultImage);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCurrentImage(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '20px',
      justifyContent: 'center'
    },
    profilePicture: {
      width: '200px',
      height: '200px',
      borderRadius: '100px',
      marginBottom: '20px',
      alignSelf: 'flex-start',
    },
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    buttonStyle: {
      border: 'none',
      margin: '10px 0',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#C4C4C433',
      textAlign: 'center',
      width: '500px',
      cursor: 'pointer',
    },
    // Add other styles here
  };

  if (store === null) {
    return <div>Loading...</div>;
  } else {
    const { storeName, marketName, licenseNo, storeZipcode, storeAddr, storeDetailAddr, weekdayStartTime, weekdayEndTime, weekendStartTime, weekendEndTime } = store || {};

    return (
      <div style={styles.container}>
        <form id='storeForm' onClick={handleImageChange} style={styles.form}>
          <img src={currentImage} alt={storeName} style={styles.profilePicture} onClick={handleImageClick} />
          <br />
          <button type="button" style={styles.buttonStyle} onClick={() => { document.getElementById('imageInput').click() }}>사진 등록</button>
          <input
            type="file"
            style={{ display: 'none' }}
            id="imageInput"
            onChange={handleImageChange}
          />
          <div style={styles.formSection}>
            <h1 style={styles.title}>가게 정보 수정</h1>
            <div>
              <label>시장명: </label>
              <input style={styles.input} type="text" name="marketName" defaultValue={marketName} />
            </div>
            <div>
              <label>가게명: </label>
              <input style={styles.input} type="text" name="storeName" defaultValue={storeName} />
            </div>
            <div>
              <label>사업자등록번호: </label>
              <input style={styles.input} type="text" name="licenseNo" defaultValue={licenseNo} />
            </div>
            <div>
              <label>우편번호: </label>
              <input style={styles.input} type="text" name="storeZipcode" defaultValue={storeZipcode} />
            </div>
            <div>
              <label>기본주소: </label>
              <input style={styles.input} type="text" name="storeAddr" defaultValue={storeAddr} />
            </div>
            <div>
              <label>상세주소: </label>
              <input style={styles.input} type="text" name="storeDetailAddr" defaultValue={storeDetailAddr} />
            </div>
            <div>
              <label>평일운영시작시간: </label>
              <input style={styles.input} type="time" name="weekdayStartTime" defaultValue={weekdayStartTime} />
            </div>
            <div>
              <label>평일운영종료시간: </label>
              <input style={styles.input} type="time" name="weekdayEndTime" defaultValue={weekdayEndTime} />
            </div>
            <div>
              <label>주말운영시작시간: </label>
              <input style={styles.input} type="time" name="weekendStartTime" defaultValue={weekendStartTime} />
            </div>
            <div>
              <label>주말운영종료시간: </label>
              <input style={styles.input} type="time" name="weekendEndTime" defaultValue={weekendEndTime} />
            </div>
            <button type="submit" style={styles.submitButton}>수정</button>
          </div>
        </form>
      </div>
    );
  }
}

export default StoreEditPage;
