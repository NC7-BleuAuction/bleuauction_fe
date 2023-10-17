import React, { useState } from 'react';
import InputField from './InputField'; 

function EditPage() {
  // 예시 사용자 정보
  const user = {
    name: '김생선',
    email: 'fish@example.com',
    password: 'password123',
    phoneNumber: '010-1234-5678',
    postalCode: '12345',
    primaryAddress: '서울시 강남구',
    detailAddress: '역삼동',
    bank: '국민은행',
    accountNumber: '1234-56-789012',
  };

  const defaultImage = '/images/storeimage.png'; // 기본 이미지 경로

  // 각 필드의 상태를 초기화합니다.
  const [image, setImage] = useState(defaultImage); // 이미지 상태
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [primaryAddress, setPrimaryAddress] = useState(user.primaryAddress);
  const [detailAddress, setDetailAddress] = useState(user.detailAddress);
  const [bank, setBank] = useState(user.bank);
  const [accountNumber, setAccountNumber] = useState(user.accountNumber);

  // 수정 버튼 클릭 시 실행될 함수
  const handleUpdate = () => {
    // TODO: 여기서 프로필 정보 업데이트 로직을 구현합니다.
    // 예시: API 호출을 통해 서버에 데이터를 업데이트합니다.
    console.log({
      name,
      email,
      password,
      phoneNumber,
      postalCode,
      primaryAddress,
      detailAddress,
      bank,
      accountNumber,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

const handleImageClick = () => {
  const fileInput = document.getElementById('imageInput');
  fileInput.click(); // 숨겨진 input[type="file"] 요소를 호출
};

const handleImageDelete = () => {
  setImage(defaultImage); // 이미지를 기본 이미지로 설정

  // TODO: 서버에 이미지 삭제 정보를 업데이트하는 로직
  // 예: axios.post('/api/delete-image', { userId: 'exampleId' });
};
  
  const styles = {
      container: {
        display: 'flex',
        flexDirection: 'row', // 행 방향으로 아이템들을 정렬합니다.
        alignItems: 'flex-start', // 아이템들을 컨테이너의 시작 부분에 정렬합니다.
        // margin: '0 auto', // 컨테이너를 화면 가운데 정렬합니다.
        padding: '20px', // 컨테이너의 패딩을 추가합니다.
        // width: '50%',
        justifyContent: 'center'
    },
    profilePicture: {
        width: '200px',
        height: '200px',
        borderRadius: '100px',
        marginBottom: '20px',
        alignSelf: 'flex-start', // 사진을 컨테이너의 시작 부분에 정렬합니다.
    },
    formSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '20px', // 프로필 사진과 폼 섹션 사이에 마진을 추가합니다.
    },
    title: {
        fontSize: '24px', // 원하는 폰트 크기로 설정합니다.
        fontWeight: 'bold', // 제목의 폰트를 굵게 설정합니다.
        marginBottom: '20px', // 제목 아래에 마진을 추가합니다.
        textAlign: 'center',
      },
    buttonStyle: {
        border: 'none',
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#C4C4C433',
        textAlign: 'center', // 수정: 텍스트를 중앙에 배치합니다.
        // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        width: '500px',
        cursor: 'pointer',

    }
    
};

// Input 태그의 style 프로퍼티에 styles.input을 추가하세요.
  // <input style={styles.input} ... />
  
  
  
    return (
      <div style={styles.container}>
        <img src={image} alt={name} style={styles.profilePicture} onClick={handleImageClick} />
        <input 
            type="file" 
            style={{ display: 'none' }} 
            id="imageInput"
            onChange={handleImageChange} 
        />
        <div style={styles.formSection}>
        <h1 style={styles.title}>회원 정보 수정</h1> 
          <InputField type="text" value={name} onChange={e => setName(e.target.value)} placeholder="이름" />
          <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <InputField type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
          <InputField type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Postal Code" />
          <InputField type="text" value={primaryAddress} onChange={e => setPrimaryAddress(e.target.value)} placeholder="Primary Address" />
          <InputField type="text" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} placeholder="Detail Address" />
          <InputField type="text" value={bank} onChange={e => setBank(e.target.value)} placeholder="Bank" />
          <InputField type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Account Number" />
         <button onClick={handleImageDelete} style={styles.buttonStyle}>사진 삭제</button>
          <button onClick={handleUpdate} style={styles.buttonStyle}>수정</button>
        </div>
      </div>
    );

}
export default EditPage;

