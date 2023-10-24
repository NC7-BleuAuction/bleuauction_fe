import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest } from '../utility/common';
import './MenuRegistrationForm.css';


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
      console.log('메뉴 응답값:', response.data);
      alert('메뉴등록에 성공하셨습니다!');
      navigate('/');
    },
      error => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('메뉴등록에 실패하셨습니다!');
      }
    )
  };

  return (
    // <div className="container">
    //   <form onSubmit={handleSubmit} className="form">
    //   <h2>메뉴 등록</h2>
    //     <div>
    //       <label>메뉴 이미지:</label>
    //       <input className="input" type="file" onChange={handleImageChange} />
    //       {previewImage && (
    //         <div>
    //           <h3>이미지 미리보기:</h3>
    //           <img src={previewImage} alt="미리보기" style={{ height: '100px' }} /> {/* 미리보기 이미지 크기는 조절 가능 */}
    //         </div>
    //       )}
    //     </div>
    //     <div>
    //       <label>메뉴 이름:</label>
    //       <input className="input" type="text" name="menuName" value={menu.menuName} onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>메뉴 사이즈:</label>
    //       <select 
    //         name="menuSize" 
    //         value={menu.menuSize} 
    //         onChange={handleChange} 
    //         className="input"
    //       >
    //         <option value="">-- 선택 --</option>
    //         <option value="S">소 (S)</option>
    //         <option value="M">중 (M)</option>
    //         <option value="L">대 (L)</option>
    //       </select>        
    //       </div>
    //     <div>
    //       <label>메뉴 가격:</label>
    //       <input className="input" type="number" name="menuPrice" value={menu.menuPrice} onChange={handleChange} />
    //     </div>
    //     <div>
    //       <label>메뉴 설명:</label>
    //       <textarea name="menuContent" value={menu.menuContent} onChange={handleChange} />
    //     </div>
    //     <button type="submit" className="submitButton">메뉴 등록</button>
    //   </form>
    // </div>
    <div class="container">
    <form action="/submit-menu" method="post" enctype="multipart/form-data" class="form"> 
        <h2>메뉴 등록</h2>
        
        <div class="input-group">
            <label for="menuImage">메뉴 이미지</label>
            <input class="input" type="file" id="menuImage" name="menuImage" placeholder="메뉴 이미지"/>
           
        </div>

        <div class="input-group">
            
            <input class="input" type="text" id="menuName" name="menuName" placeholder="메뉴이름"/>
        </div>

        <div class="input-group">

            <select class="input" id="menuSize" name="menuSize">
                <option value="">-- 메뉴 사이즈 --</option>
                <option value="S">소 (S)</option>
                <option value="M">중 (M)</option>
                <option value="L">대 (L)</option>
            </select>
        </div>

        <div class="input-group">
            <input class="input" type="number" id="menuPrice" name="menuPrice" placeholder="메뉴가격"/>
        </div>

        <div class="input-group">
            <textarea class="input" id="menuContent" name="menuContent" placeholder="메뉴설명"></textarea>
        </div>
        
        <button type="submit" class="submitButton">메뉴 등록</button>
    </form>
</div>
  );
}

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '30vh',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center', // 폼 내용을 중앙 정렬합니다.
//     padding: '20px',  // 내부 패딩을 추가합니다.
//     borderRadius: '12px',  // 모서리를 둥글게 합니다.
//     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // 약간의 그림자 효과를 추가합니다.
//     background: 'white', // 배경색을 흰색으로 설정합니다.
//     width: '800px', 
//   },
//   input: {
//     padding: '10px',
//     margin: '5px 0',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//     outline: 'none',
//     width: '300px', 
//   },
//   submitButton: {
//     padding: '10px 20px',
//     cursor: 'pointer',
//     backgroundColor: '#0575E6',
//     border: 'none',
//     borderRadius: '8px',
//     color: 'white',
//   },
// }


export default MenuRegisterationForm;
