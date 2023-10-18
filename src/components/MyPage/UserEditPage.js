import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { sendAxiosMultipartRequest, sendAxiosRequest } from '../utility/common';
import axios, { formToJSON } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';




function UserEditPage() {
  // 예시 사용자 정보

  // const user = {
  //   name: 'Rose',
  //   email: 'rose@example.com',
  //   password: 'password123',
  //   phoneNumber: '010-1234-5678',
  //   postalCode: '12345',
  //   primaryAddress: '서울시 강남구',
  //   detailAddress: '역삼동',
  //   bank: '국민은행',
  //   accountNumber: '1234-56-789012',
  // };

  const defaultImage = '/images/rose.png';

  const [member, setMember] = useState(null);

  useEffect(() => {
    sendAxiosRequest('api/member/loginCheck', 'GET', null, response => {
      let loginUser = response.data.loginUser;
      setMember(loginUser);
    }, error => console.log(error))
  }

    , []);

  const navigate = useNavigate();

  function memberUpdate() {
    // 폼 데이터 객체 생성
    let formData = new FormData();

    const updateMemberRequest = JSON.stringify(member);
    // Blob 객체로 변환하여 'updateMemberRequest' 파트로 추가
    const updateMemberBlob = new Blob([updateMemberRequest], { type: 'application/json' });
    formData.append('updateMemberRequest', updateMemberBlob);

    // 이미지 파일 추가 (있는 경우)
    let fileInput = document.getElementById('imageInput');
    if (fileInput.files[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }

    // Axios를 이용하여 멀티파트 폼 데이터를 서버로 전송합니다.
    sendAxiosMultipartRequest('/api/member/update', 'PUT', formData,
      response => {
        console.log('response.data', response.data);
      },
      error => {
        console.error('멤버 업데이트 중 에러 발생', error);
      }
    );
  }

  const [currentImage, setCurrentImage] = useState(defaultImage);



  // 파일 선택 시 이벤트 처리
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // 읽기 동작이 성공적으로 완료되면, 현재 이미지 상태를 새 이미지 URL로 업데이트합니다.
        setCurrentImage(e.target.result);
      };

      // 선택된 이미지 파일을 데이터 URL로 읽습니다. 이로 인해 onload 콜백이 실행됩니다.
      reader.readAsDataURL(event.target.files[0]);
    }
  };


  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  // const memberDelete = () => {
  //   setCurrentImage(defaultImage);

  //     // 서버에 프로필 이미지 삭제를 요청합니다.
  //     axios.post('/api/member/update', { userId: member.id }) // 'member.id'는 실제 회원 ID에 해당하는 프로퍼티명으로 변경해야 합니다.
  //     .then((response) => {
  //       // 요청이 성공적으로 완료되었을 때 수행할 동작입니다.
  //       // 예를 들어, 사용자에게 성공적으로 삭제되었다는 알림을 표시할 수 있습니다.
  //       console.log(response.data); // 서버로부터 받은 응답 데이터를 콘솔에 출력합니다.
  //       alert('프로필 사진이 성공적으로 삭제되었습니다.');
  //     })
  //     .catch((error) => {
  //       // 서버 요청 중에 오류가 발생했을 때 수행할 동작입니다.
  //       // 예를 들어, 사용자에게 오류가 발생했다는 것을 알릴 수 있습니다.
  //       console.error('프로필 사진 삭제 중 오류 발생', error);
  //       alert('프로필 사진을 삭제하는 중 문제가 발생했습니다.');
  //     });
  //};

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


  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div style={styles.container}>
        <form id='memberForm' onClick={handleImageChange} style={styles.form}>
          <img src={currentImage} alt={member.memberName} style={styles.profilePicture} onClick={handleImageClick} />
          <br />
          <button type="button" style={styles.buttonStyle} onClick={() => { document.getElementById('imageInput').click() }}>사진 등록</button>
          {/* <form onClick={handleImageChange} style={styles.form}> */}
          <input
            type="file"
            style={{ display: 'none' }}
            id="imageInput"
            onChange={handleImageChange}  // 이벤트 핸들러를 파일 입력에 연결합니다.
          />
          {/* </form> */}
          <div style={styles.formSection}>
            <h1 style={styles.title}>일반 회원 정보 수정</h1>
            <InputField type="text" name="memberName" value={member.memberName} onChange={e => setMember({ ...member, memberName: e.target.value })} placeholder="Name" />
            <InputField type="email" name="memberEmail" value={member.memberEmail} onChange={e => setMember({ ...member, memberEmail: e.target.value })} placeholder="Email" />
            <InputField type="password" name="memberPwd" value={member.memberPwd} onChange={e => setMember({ ...member, memberPwd: e.target.value })} placeholder="Password" />
            <InputField type="text" name="memberPhone" value={member.memberPhone} onChange={e => setMember({ ...member, memberPhone: e.target.value })} placeholder="Phone Number" />
            <InputField type="text" name="memberZipcode" value={member.memberZipcode} onChange={e => setMember({ ...member, memberZipcode: e.target.value })} placeholder="Postal Code" />
            <InputField type="text" name="memberAddr" value={member.memberAddr} onChange={e => setMember({ ...member, memberAddr: e.target.value })} placeholder="Primary Address" />
            <InputField type="text" name="memberDetailAddr" value={member.memberDetailAddr} onChange={e => setMember({ ...member, memberDetailAddr: e.target.value })} placeholder="Detail Address" />
            <InputField type="text" name="memberBank" value={member.memberBank} onChange={e => setMember({ ...member, memberBank: e.target.value })} placeholder="Bank" />
            <InputField type="text" name="memberAccount" value={member.memberAccount} onChange={e => setMember({ ...member, memberAccount: e.target.value })} placeholder="Account Number" />
            {/* <button type='button' onClick={memberUpdate} style={styles.buttonStyle}>사진 삭제</button> */}
            <button type='button' onClick={memberUpdate} style={styles.buttonStyle}>수정</button>
          </div>
        </form>
      </div>
    );
  }
}
export default UserEditPage;

