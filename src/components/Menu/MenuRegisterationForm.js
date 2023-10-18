import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest } from '../utility/Common';

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
    <div>
      <h2>메뉴 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>메뉴 이미지:</label>
          <input type="file" onChange={handleImageChange} />
          {previewImage && (
            <div>
              <h3>이미지 미리보기:</h3>
              <img src={previewImage} alt="미리보기" style={{ height: '100px' }} /> {/* 미리보기 이미지 크기는 조절 가능 */}
            </div>
          )}
        </div>
        {/* 나머지 입력 필드들... */}
        <div>
          <label>메뉴 이름:</label>
          <input type="text" name="menuName" value={menu.menuName} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 사이즈:</label>
          <input type="text" name="menuSize" value={menu.menuSize} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 가격:</label>
          <input type="text" name="menuPrice" value={menu.menuPrice} onChange={handleChange} />
        </div>
        <div>
          <label>메뉴 설명:</label>
          <textarea name="menuContent" value={menu.menuContent} onChange={handleChange} />
        </div>
        <button type="submit">메뉴 등록</button>
      </form>
    </div>
  );
}

export default MenuRegisterationForm;
