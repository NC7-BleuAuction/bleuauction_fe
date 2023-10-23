import React, { useState, useEffect } from 'react';
import { sendAxiosRequest, sendAxiosMultipartRequest } from '../utility/common';
import axios from 'axios';

function StoreEditPage() {
  const defaultImage = '/images/rose.png';
  const [store, setStore] = useState(null);
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    sendAxiosRequest('/api/store/loginCheck', 'GET', null, (response) => {
      setLoginUser(response.data.loginUser);
    }, (error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (loginUser) {
      sendAxiosRequest(`/api/store/detailByMember?member=${loginUser?.memberNo}`, 'GET', null, (res) => {
        setStore(res.data);
      }, (err) => {
        console.error('Failed to fetch store details', err);
      });
    }
  }, [loginUser]);

  function updateStore(e) {
    e.preventDefault();
    let storeForm = new FormData(document.getElementById('storeForm'));

    // 이미지 파일 추가 (있는 경우)
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files[0]) {
      storeForm.append('profileImage', fileInput.files[0]);
    }

    console.log('formData: ', storeForm);
    // Axios를 이용하여 멀티파트 폼 데이터를 서버로 전송합니다.
    sendAxiosMultipartRequest('/api/store/update', storeForm, (response) => {
      console.log('가게 업데이트 성공');
      // 성공적으로 업데이트된 경우에 수행할 작업을 추가하세요
    }, (error) => {
      console.error('가게 업데이트 중에 오류가 발생했습니다', error);
      // 오류 발생 시 처리를 추가하세요
    });
  }

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
  };

  if (store === null) {
    return <div>Loading...</div>;
  } else {
    const { marketName, storeName, licenseNo, storeZipcode, storeAddr, storeDetailAddr, weekdayStartTime, weekdayEndTime, weekendStartTime, weekendEndTime } = store || {};

    return (
      <div style={styles.container}>
        <form id='storeForm' onSubmit={updateStore}>
          <img src={currentImage} alt={storeName} style={styles.profilePicture} onClick={handleImageClick} />
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
            <button type="submit" style={styles.submitButton} onClick={updateStore}>수정</button>
          </div>
        </form>
      </div>
    );
  }
}

export default StoreEditPage;
