import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { sendAxiosMultipartRequest, sendAxiosRequest } from '../../lib/common';
import axios, { formToJSON } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function UserEditPage() {
  const [currentImage, setCurrentImage] = useState(
    'http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg'
  );
  const [member, setMember] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    sendAxiosRequest(
      `/api/member/${jwtDecode(accessToken).sub}`,
      'GET',
      null,
      (response) => {
        console.log('응답 성공', response.data);
        setMember(response.data);
        setCurrentImage(
          'http://kr.object.ncloudstorage.com/bleuauction-bucket/' +
            loginUser.memberAttaches[0].filePath +
            loginUser.memberAttaches[0].saveFilename
        );
      },
      (error) => {
        console.log('응답 실패', error);
      },
      null,
      accessToken
    );
  }, []);
  console.log('로그인유저: ', member);

  // useEffect(() => {
  //   sendAxiosRequest('api/member/loginCheck', 'GET', null, response => {
  //     let loginUser = response.data.loginUser;
  //     console.log(loginUser);
  //     setMember(loginUser);
  //     setCurrentImage('http://kr.object.ncloudstorage.com/bleuauction-bucket/' + loginUser.memberAttaches[0].filePath + loginUser.memberAttaches[0].saveFilename);
  //   }, error => console.log(error))
  // }, []);

  function memberUpdate() {
    let memberForm = document.getElementById('memberForm');
    // const formData = new FormData(memberForm);
    const formData = new FormData();
    const updateMemberRequest = JSON.stringify(formData);

    const updateMemberBlob = new Blob([member], { type: 'application/json' });
    formData.append('updateMemberRequest', updateMemberBlob);

    const fileInput = document.getElementById('imageInput');

    if (fileInput && fileInput.files[0]) {
      console.log('조건만족하나?');
      formData.append('profileImage', fileInput.files[0]);
    }

    console.log('formData: ', formData);
    console.log('formData: ', formToJSON(formData));
    // axios.post('/api/member/update', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': `Bearer ${accessToken}`
    //   },
    // })
    //   .then(response => {
    //     console.log('서버 응답:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('에러 발생:', error);
    //   });

    sendAxiosMultipartRequest(
      '/api/member/update',
      formData,
      (response) => {
        console.log('수정한 정보', formToJSON(formData));
        console.log('서버 응답:', response.data);

        // console.log(formToJSON(updateStoreRequest));
        // 성공적으로 업데이트된 경우에 수행할 작업을 추가하세요
      },
      (error) => {
        console.error('가게 업데이트 중에 오류가 발생했습니다', error);
        // 오류 발생 시 처리를 추가하세요
      },
      accessToken
    );
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

  if (member === null) {
    return <div>Loading...</div>; // 로딩 표시
  } else {
    return (
      <div style={styles.container}>
        <form id="memberForm" onClick={handleImageChange} style={styles.form}>
          <img
            src={currentImage}
            alt={member.memberName}
            style={styles.profilePicture}
            onClick={handleImageClick}
          />
          <br />
          <button
            type="button"
            style={styles.buttonStyle}
            onClick={() => {
              document.getElementById('imageInput').click();
            }}
          >
            사진 등록
          </button>
          {/* <form onClick={handleImageChange} style={styles.form}> */}
          <input
            type="file"
            style={{ display: 'none' }}
            id="imageInput"
            onChange={handleImageChange}
          />
          <div style={styles.formSection}>
            <h1 style={styles.title}>일반 회원 정보 수정</h1>
            <InputField
              type="text"
              name="memberName"
              value={member.memberName}
              onChange={(e) =>
                setMember({ ...member, memberName: e.target.value })
              }
              placeholder="Name"
            />
            <InputField
              type="email"
              name="memberEmail"
              value={member.memberEmail}
              onChange={(e) =>
                setMember({ ...member, memberEmail: e.target.value })
              }
              placeholder="Email"
            />
            <InputField
              type="text"
              name="memberPwd"
              value={member.memberPwd}
              onChange={(e) =>
                setMember({ ...member, memberPwd: e.target.value })
              }
              placeholder="Password"
            />
            <InputField
              type="text"
              name="memberPhone"
              value={member.memberPhone}
              onChange={(e) =>
                setMember({ ...member, memberPhone: e.target.value })
              }
              placeholder="Phone Number"
            />
            <InputField
              type="text"
              name="memberZipcode"
              value={member.memberZipcode}
              onChange={(e) =>
                setMember({ ...member, memberZipcode: e.target.value })
              }
              placeholder="Postal Code"
            />
            <InputField
              type="text"
              name="memberAddr"
              value={member.memberAddr}
              onChange={(e) =>
                setMember({ ...member, memberAddr: e.target.value })
              }
              placeholder="Primary Address"
            />
            <InputField
              type="text"
              name="memberDetailAddr"
              value={member.memberDetailAddr}
              onChange={(e) =>
                setMember({ ...member, memberDetailAddr: e.target.value })
              }
              placeholder="Detail Address"
            />
            <InputField
              type="text"
              name="memberBank"
              value={member.memberBank}
              onChange={(e) =>
                setMember({ ...member, memberBank: e.target.value })
              }
              placeholder="Bank"
            />
            <InputField
              type="text"
              name="memberAccount"
              value={member.memberAccount}
              onChange={(e) =>
                setMember({ ...member, memberAccount: e.target.value })
              }
              placeholder="Account Number"
            />
            <button
              type="button"
              onClick={memberUpdate}
              style={styles.buttonStyle}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row', // 행 방향으로 아이템들을 정렬합니다.
    alignItems: 'flex-start', // 아이템들을 컨테이너의 시작 부분에 정렬합니다.
    // margin: '0 auto', // 컨테이너를 화면 가운데 정렬합니다.
    padding: '20px', // 컨테이너의 패딩을 추가합니다.
    // width: '50%',
    justifyContent: 'center',
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
  },
};

export default UserEditPage;
