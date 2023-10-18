import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { sendAxiosRequest } from '../utility/Common';

// const useForm = (initialValues) => {
//     const [values, setValues] = useState(initialValues);  // values는 폼 컨트롤의 상태를 나타냄, initialValues로 초기 설정
//     const handleChange = (e) => {   //폼 컨트롤의 onChange 이벤트 핸들러
//       const { name, value } = e.target;
//       setValues({
//         ...values,
//         [name]: value,
//       });
//     };
//     return [values, handleChange];
//   };

// const [values, handleChange] = useForm({
//     marketName: '',
//     storeName: '',
//     businessNumber: '',
//     postalCode: '',
//     primaryAddress: '',
//     detailedAddress: '',
//     weekdayStart: '',
//     weekdayEnd: '',
//     weekendStart: '',
//     weekendEnd: '',
// });


// const requestData = { 
//     marketName: values.marketName,
//     storeName: values.storeName,      
//     licenseNo: values.businessNumber,
//     storeZipCode: values.postalCode,
//     storeAddr: values.primaryAddress,
//     storeDetailAddr: values.detailedAddress,
//     weekdayStartTime: values.weekdayStart,
//     weekdayEndTime: values.weekdayEnd,
//     weekendStartTime: values.weekendStart,
//     weekendEndTime: values.weekendEnd,
//   };

function StoreRegisterPage() {


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let formData = new FormData(e.target);

    let jsonObj = formToJSON(formData);

    console.log(jsonObj);

    // POST 요청 생성
    axios.post('/api/store/signup', jsonObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // 성공적으로 서버에서 응답을 받은 경우의 처리
        console.log('등록된 가게 정보:', response.data);
      })
      .catch(error => {
        // 오류가 발생한 경우의 처리
        console.error('에러 발생:', error);
      });

    // sendAxiosRequest('/api/store/signup', 'POST', jsonData, response => {
    //   console.log(response);
    //   console.log('응답값:', response.data);
    //   alert('가게등록에 성공하셨습니다!');
    //   //   navigate('/main');
    // },
    //   error => {
    //     console.log('API 호출 중 에러 발생: ', error);
    //     alert('가게등록에 실패하셨습니다!');
    //   }
    // )
  };

  return (
    <div style={styles.container}>
      {/* <Card style={styles.card}> */}
      {/* <Card.Body> */}
      {/* <Card.Title style={styles.title}>가게 등록</Card.Title> */}
      {/* <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="marketName">
                        <Form.Label>시장명:</Form.Label>
                        <Form.Control type="text" name="marketName" />
                    </Form.Group>

                    <Form.Group controlId="storeName">
                        <Form.Label>가게명:</Form.Label>
                        <Form.Control type="text" name="storeName" />
                    </Form.Group>

                    <Form.Group controlId="licenseNo">
                        <Form.Label>사업자등록번호:</Form.Label>
                        <Form.Control type="text" name="licenseNo" />
                    </Form.Group>

                    <Form.Group controlId="storeZipcode">
                        <Form.Label>우편번호:</Form.Label>
                        <Form.Control type="text" name="storeZipcode" />
                    </Form.Group>

                    <Form.Group controlId="storeAddr">
                        <Form.Label>기본주소:</Form.Label>
                        <Form.Control type="text" name="storeAddr" />
                    </Form.Group>

                    <Form.Group controlId="storeDetailAddr">
                        <Form.Label>상세주소:</Form.Label>
                        <Form.Control type="text" name="storeDetailAddr" />
                    </Form.Group> */}

      {/* [Repeat similar pattern for the rest of the form groups] */}

      {/* <Form.Group controlId="weekdayStartTime">
                        <Form.Label>평일운영시작시간:</Form.Label>
                        <Form.Control type="time" name="weekdayStartTime" />
                    </Form.Group>

                    <Form.Group controlId="weekdayEndTime">
                        <Form.Label>평일운영종료시간:</Form.Label>
                        <Form.Control type="time" name="weekdayEndTime" />
                    </Form.Group>
       
                    <Form.Group controlId="weekendStartTime">
                        <Form.Label>주말운영시작시간:</Form.Label>
                        <Form.Control type="time" name="weekendStartTime" />
                    </Form.Group>
       
                    <Form.Group controlId="weekendEndTime">
                        <Form.Label>주말운영시작시간:</Form.Label>
                        <Form.Control type="time" name="weekendEndTime" />
                    </Form.Group>
        */}
      <form onSubmit={handleSubmit}>
        <label>시장명: </label>
        <input type="text" name="marketName" />
        <label>가게명: </label>
        <input type="text" name="storeName" />
        <label>사업자등록번호: </label>
        <input type="text" name="licenseNo" />
        <label>우편번호: </label>
        <input type="text" name="storeZipcode" />
        <label>기본주소: </label>
        <input type="text" name="storeAddr" />
        <label>상세주소: </label>
        <input type="text" name="storeDetailAddr" />

        <div>
          <label>평일운영시작시간: </label>
          <input type="time" name="weekdayStartTime" />
        </div>
        <div>
          <label>평일운영종료시간: </label>
          <input type="time" name="weekdayEndTime" />
        </div>
        <div>
          <label>주말운영시작시간: </label>
          <input type="time" name="weekendStartTime" />
        </div>
        <div>
          <label>주말운영종료시간: </label>
          <input type="time" name="weekendEndTime" />
        </div>

        <button type="submit" > 가게 등록</button>

      </form>
    </div>

  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: '50%', // 카드의 너비 조정
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // 부드러운 그림자 효과
    borderRadius: '20px', // 둥근 모서리
    padding: '20px', // 카드 내부의 패딩
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
    transition: 'all 0.3s', // 더 부드러운 전환 효과
    '&:hover': {
      transform: 'scale(1.1)', // 호버 시 버튼 크기 확대
    },
  }
};



export default StoreRegisterPage;