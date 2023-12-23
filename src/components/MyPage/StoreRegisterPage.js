import React, { useState } from 'react';
// import { Form, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosMultipartRequest } from '../../lib/common';

function StoreRegisterPage() {
  // const accessToken = sessionStorage.getItem('accessToken');

  // const navigate = useNavigate();
  // const handleSubmit =  (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   let formData = new FormData(e.target);

  // let jsonObj = formToJSON(formData);

  // console.log(jsonObj);

  // POST 요청 생성
  // axios.post('/api/store/signup', jsonObj, {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => {
  //     // 성공적으로 서버에서 응답을 받은 경우의 처리
  //     console.log('등록된 가게 정보:', response.data);
  //     alert('가게 등록 성공!')
  //     navigate('/mypage');

  //   })
  //   .catch(error => {
  //     // 오류가 발생한 경우의 처리
  //     console.error('에러 발생:', error);
  //   });
  // sendAxiosMultipartRequest(`/api/store/signup`, formData, response => {
  //   console.log('메뉴 응답값:', response.data);
  //   alert('가게등록에 성공하셨습니다!');
  //   navigate('/mypage');
  // },
  //   error => {
  //     console.error('API 호출 중 에러 발생: ', error);
  //     alert('가게등록에 실패하셨습니다!');
  //   },
  //   null,
  //   accessToken
  // )

  const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    sendAxiosMultipartRequest(
      `/api/store/signup`,
      formData,
      (response) => {
        console.log('등록된 가게 정보:', response.data);
        alert('가게 등록에 성공하셨습니다!');
        navigate('/mypage');
      },
      (error) => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('가게 등록에 실패하셨습니다!');
      },
      null,
      accessToken // 현재 사용자의 접근 토큰
    );
  };

  // };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <h2>가게 등록 </h2>
        </div>
        <div>
          <label>시장명: </label>
          <input style={styles.input} type="text" name="marketName" />
        </div>
        <div>
          <label>가게명: </label>
          <input style={styles.input} type="text" name="storeName" />
        </div>
        <div>
          <label>사업자등록번호: </label>
          <input style={styles.input} type="text" name="licenseNo" />
        </div>
        <div>
          <label>우편번호: </label>
          <input style={styles.input} type="text" name="storeZipcode" />
        </div>
        <div>
          <label>기본주소: </label>
          <input style={styles.input} type="text" name="storeAddr" />
        </div>
        <div>
          <label>상세주소: </label>
          <input style={styles.input} type="text" name="storeDetailAddr" />
        </div>

        <div>
          <label>평일운영시작시간: </label>
          <input style={styles.input} type="time" name="weekdayStartTime" />
        </div>
        <div>
          <label>평일운영종료시간: </label>
          <input style={styles.input} type="time" name="weekdayEndTime" />
        </div>
        <div>
          <label>주말운영시작시간: </label>
          <input style={styles.input} type="time" name="weekendStartTime" />
        </div>
        <div>
          <label>주말운영종료시간: </label>
          <input style={styles.input} type="time" name="weekendEndTime" />
        </div>

        <button type="submit" style={styles.submitButton}>
          {' '}
          가게 등록
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  card: {
    width: '50%',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    borderRadius: '20px',
    padding: '20px',
  },

  title: {
    fontSize: '1.8rem',
    marginBottom: '30px',
    textAlign: 'center',
  },
  button: {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    border: 'none',
    padding: '10px 20px',
    color: 'white',
    borderRadius: '25px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // 폼 내용을 중앙 정렬합니다.
    padding: '20px', // 내부 패딩을 추가합니다.
    borderRadius: '12px', // 모서리를 둥글게 합니다.
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
};

export default StoreRegisterPage;

// import * as React from 'react';
// import { Button, TextField, Box, Typography, Container } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function StoreRegisterPage() {
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     // 폼 데이터를 JSON으로 변환하는 로직이 필요합니다.
//     // formToJSON 함수를 정의하거나 다른 방법을 사용하세요.

//     // JSON 객체 생성
//     let jsonObj = {};
//     formData.forEach((value, key) => { jsonObj[key] = value });

//     console.log(jsonObj);

//     // POST 요청 생성
//     axios.post('/api/store/signup', jsonObj, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         console.log('등록된 가게 정보:', response.data);
//         // navigate('/path-after-success'); // 성공 후 리디렉션 경로
//       })
//       .catch(error => {
//         console.error('에러 발생:', error);
//       });
//   };

//   // Material-UI 컴포넌트를 사용한 레이아웃
//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           가게 등록
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="marketName"
//             label="시장명"
//             name="marketName"
//             autoComplete="market-name"
//             autoFocus
//           />
//           {/* 다른 필드들도 이와 유사한 형태로 추가합니다. */}
//           {/* 예시: */}
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="storeName"
//             label="가게명"
//             id="storeName"
//             autoComplete="store-name"
//           />
//           {/* 나머지 필드를 여기에 추가 */}
//           {/* ... */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             가게 등록
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default StoreRegisterPage;
