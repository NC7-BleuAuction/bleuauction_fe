// import React, { useState, useEffect } from 'react';
// import InputField from './InputField';
// import { sendAxiosMultipartRequest, sendAxiosRequest } from '../utility/common';
// import axios, { formToJSON } from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';


// function EditPage() {
//   // 예시 사용자 정보
//   // const user = {
//   //   name: '김생선',
//   //   email: 'fish@example.com',
//   //   password: 'password123',
//   //   phoneNumber: '010-1234-5678',
//   //   postalCode: '12345',
//   //   primaryAddress: '서울시 강남구',
//   //   detailAddress: '역삼동',
//   //   bank: '국민은행',
//   //   accountNumber: '1234-56-789012',
//   // };

//   const defaultImage = '/images/storeimage.png'; // 기본 이미지 경로

//   const [store, setStore] = useState(null);

//   useEffect(() => { 
//     sendAxiosRequest('api/store/storeCheck', 'GET', null, response => {
//     let storeUser = response.data.storeUser;
//     setStore(storeUser);
//   }, error => console.log(error))} 

// , []); 


//   // // 각 필드의 상태를 초기화합니다.
//   // const [image, setImage] = useState(defaultImage); // 이미지 상태
//   // const [name, setName] = useState(user.name);
//   // const [email, setEmail] = useState(user.email);
//   // const [password, setPassword] = useState(user.password);
//   // const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
//   // const [postalCode, setPostalCode] = useState(user.postalCode);
//   // const [primaryAddress, setPrimaryAddress] = useState(user.primaryAddress);
//   // const [detailAddress, setDetailAddress] = useState(user.detailAddress);
//   // const [bank, setBank] = useState(user.bank);
//   // const [accountNumber, setAccountNumber] = useState(user.accountNumber);

//   // // 수정 버튼 클릭 시 실행될 함수
//   // const handleUpdate = () => {
//   //   // TODO: 여기서 프로필 정보 업데이트 로직을 구현합니다.
//   //   // 예시: API 호출을 통해 서버에 데이터를 업데이트합니다.
//   //   console.log({
//   //     name,
//   //     email,
//   //     password,
//   //     phoneNumber,
//   //     postalCode,
//   //     primaryAddress,
//   //     detailAddress,
//   //     bank,
//   //     accountNumber,
//   //   });
//   // };

//   function storeUpdate() {
//     // 폼 데이터 객체 생성
//     let formData = new FormData(); 

//     const updateStoreRequest = JSON.stringify(store);
//     // Blob 객체로 변환하여 'updateMemberRequest' 파트로 추가
//     const updateStoreBlob = new Blob([updateStoreRequest], { type: 'application/json' });
//     formData.append('updateStoreRequest', updateStoreBlob);
  
//     // 이미지 파일 추가 (있는 경우)
//     let fileInput = document.getElementById('imageInput');
//     if (fileInput.files[0]) {
//       formData.append('profileImage', fileInput.files[0]);
//     }
  
//     // Axios를 이용하여 멀티파트 폼 데이터를 서버로 전송합니다.
//     sendAxiosMultipartRequest('/api/store/update', 'PUT', formData, 
//       response => {
//         console.log('response.data', response.data);
//       }, 
//       error => {
//         console.error('멤버 업데이트 중 에러 발생', error);
//       }
//     );
//   }

//   const [currentImage, setCurrentImage] = useState(defaultImage);


//   // 파일 선택 시 이벤트 처리
//   const handleImageChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
      
//       reader.onload = (e) => {
//         // 읽기 동작이 성공적으로 완료되면, 현재 이미지 상태를 새 이미지 URL로 업데이트합니다.
//         setCurrentImage(e.target.result);
//       };

//       // 선택된 이미지 파일을 데이터 URL로 읽습니다. 이로 인해 onload 콜백이 실행됩니다.
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const handleImageClick = () => {
//     document.getElementById('imageInput').click();
//   };

// // const handleImageDelete = () => {
// //   setImage(defaultImage); // 이미지를 기본 이미지로 설정

// //   // TODO: 서버에 이미지 삭제 정보를 업데이트하는 로직
// //   // 예: axios.post('/api/delete-image', { userId: 'exampleId' });
// // };
  
//   const styles = {
//       container: {
//         display: 'flex',
//         flexDirection: 'row', // 행 방향으로 아이템들을 정렬합니다.
//         alignItems: 'flex-start', // 아이템들을 컨테이너의 시작 부분에 정렬합니다.
//         // margin: '0 auto', // 컨테이너를 화면 가운데 정렬합니다.
//         padding: '20px', // 컨테이너의 패딩을 추가합니다.
//         // width: '50%',
//         justifyContent: 'center'
//     },
//     profilePicture: {
//         width: '200px',
//         height: '200px',
//         borderRadius: '100px',
//         marginBottom: '20px',
//         alignSelf: 'flex-start', // 사진을 컨테이너의 시작 부분에 정렬합니다.
//     },
//     formSection: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         marginLeft: '20px', // 프로필 사진과 폼 섹션 사이에 마진을 추가합니다.
//     },
//     title: {
//         fontSize: '24px', // 원하는 폰트 크기로 설정합니다.
//         fontWeight: 'bold', // 제목의 폰트를 굵게 설정합니다.
//         marginBottom: '20px', // 제목 아래에 마진을 추가합니다.
//         textAlign: 'center',
//       },
//     buttonStyle: {
//         border: 'none',
//         margin: '10px 0',
//         padding: '10px',
//         borderRadius: '4px',
//         backgroundColor: '#C4C4C433',
//         textAlign: 'center', // 수정: 텍스트를 중앙에 배치합니다.
//         // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
//         width: '500px',
//         cursor: 'pointer',

//     }
    
// };

// // Input 태그의 style 프로퍼티에 styles.input을 추가하세요.
//   // <input style={styles.input} ... />
  
  
  
//   if (store === null) {
//     return <div>Loading...</div>; // 로딩 표시
//   } else {
//     return (
//       <div style={styles.container}>
//         <form id='storeForm' onClick={handleImageChange} style={styles.form}>
//         <img src={currentImage} alt={store.storeName} style={styles.profilePicture} onClick={handleImageClick} />
//         <input 
//             type="file" 
//             style={{ display: 'none' }} 
//             id="imageInput"
//             onChange={handleImageChange} 
//         />
//         <div style={styles.formSection}>
//         <h1 style={styles.title}>판매자 회원 정보 수정</h1> 
//           <InputField type="text" name="storeName" value={store.storeName} onChange={e => setStore({...store, storeName: e.target.value})} placeholder="Store Name" />
//           <InputField type="email" name="marketName" value={store.markerName} onChange={e => setStore({...store, markerName: e.target.value})} placeholder="Market Name" />
//           <InputField type="password" name="storeName" value={store.storeName} onChange={e => setStore({...store, storeName: e.target.value})} placeholder="Store Name" />
//           <InputField type="text" name="storeName" value={store.storeName} onChange={e => setStore({...store, storeName: e.target.value})} placeholder="Store Name" />
//           <InputField type="text" name="storeName" value={store.storeName} onChange={e => setStore({...store, storeName: e.target.value})} placeholder="Store Name" />
//           <InputField type="text"  name="storeName" value={store.storeName} onChange={e => setStore({...store, storeName: e.target.value})} placeholder="Store Name" />
//           <InputField type="text" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} placeholder="Detail Address" />
//           <InputField type="text" value={bank} onChange={e => setBank(e.target.value)} placeholder="Bank" />
//           <InputField type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Account Number" />
//          <button onClick={handleImageDelete} style={styles.buttonStyle}>사진 삭제</button>
//           <button onClick={handleUpdate} style={styles.buttonStyle}>수정</button>
//         </div>
//         </form>
//       </div>
//     );

// }
// export default EditPage;

