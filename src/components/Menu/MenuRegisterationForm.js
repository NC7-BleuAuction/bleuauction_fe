import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest } from '../utility/common';

function MenuRegisterationForm() {
  const [menu, setMenu] = useState({
    menuImage: null,
    menuName: '',
    menuSize: '',
    menuPrice: '',
    menuContent: '',
  });

  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 URL

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // 이미지 파일 데이터를 상태에 저장하고 미리보기 설정
      setMenu({ ...menu, menuImage: file });
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let formObj = formToJSON(formData);
    sendAxiosRequest('/api/menu/new', 'POST', formObj, response => {
      console.log('응답값:', response.data);
      alert('메뉴등록에 성공하셨습니다!');
      navigate('/main');
    },
      error => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('메뉴등록에 실패하셨습니다!');
      }
    )
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
      <h2>메뉴 등록</h2>
        <div>
          <label>메뉴 이미지:</label>
          <input style={styles.input} type="file" onChange={handleImageChange} />
          {previewImage && (
            <div>
              <h3>이미지 미리보기:</h3>
              <img src={previewImage} alt="미리보기" style={{ height: '100px' }} /> {/* 미리보기 이미지 크기는 조절 가능 */}
            </div>
          )}
        </div>
        <div>
          <label>메뉴 이름:</label>
          <input style={styles.input} type="text" name="menuName" value={menu.menuName} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 사이즈:</label>
          <input style={styles.input} type="text" name="menuSize" value={menu.menuSize} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 가격:</label>
          <input style={styles.input} type="text" name="menuPrice" value={menu.menuPrice} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 설명:</label>
          <textarea name="menuContent" value={menu.menuContent} onChange={handleChange} />
        </div>
        <button type="submit" style={styles.submitButton}>메뉴 등록</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 폼 내용을 중앙 정렬합니다.
    padding: '20px',  // 내부 패딩을 추가합니다.
    borderRadius: '12px',  // 모서리를 둥글게 합니다.
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // 약간의 그림자 효과를 추가합니다.
    background: 'white', // 배경색을 흰색으로 설정합니다.
    width: '800px', 
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '300px', 
  },
  submitButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#0575E6',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
  },
}


export default MenuRegisterationForm;
