import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import { isOpenNow, sendAxiosRequest } from '../utility/common';

// import DaumPostcode from 'react-daum-postcode';




function RegisterPage() {

  // const [showPostcode, setShowPostcode] = useState(false);

  //   const handleAddress = (data) => {
  //     handleChange({
  //         target: {
  //             name: "zip",
  //             value: data.zonecode
  //         }
  //     });
  //     handleChange({
  //         target: {
  //             name: "address",
  //             value: data.address
  //         }
  //     });
  //     setShowPostcode(false); // 주소 선택 후, 우편번호 찾기 창을 닫습니다.
  // };

  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);  // values는 폼 컨트롤의 상태를 나타냄, initialValues로 초기 설정
    const handleChange = (e) => {   //폼 컨트롤의 onChange 이벤트 핸들러
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    return [values, handleChange];
  };



  // const [values, handleChange] = useForm({ //useForm은 초기 값 initialValues를 인수로 받음,  그 상태와 상태를 변경하는 함수를 반환하는 useForm 훅을 호출
  //   email: '',
  //   password: '',
  //   name: '',
  //   phone: '',
  //   zip: '',
  //   address: '',
  //   detailAddress: '',
  //   bank: '',
  //   accountNumber: '',
  //   accountType: '',
  // });

  const navigate = useNavigate();

  // const requestData = { //객체는 폼에서 사용자가 입력한 데이터를 서버로 전송하기 위해 준비되는 데이터 구조
  //   memberCategory: values.accountType,
  //   memberEmail: values.email,      //values 객체의 email 속성 값을 requestData 객체의 email 속성에 할당
  //   memberPwd: values.password,
  //   memberName: values.name,
  //   memberPhone: values.phone,
  //   memberZipcode: values.zip,
  //   memberAddr: values.address,
  //   memberDetailAddr: values.detailAddress,
  //   memberBank: values.bank,
  //   memberAccount: values.accountNumber,
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let formObj = formToJSON(formData);
    sendAxiosRequest('/api/member/signup', 'POST', formObj, response => {
      console.log('응답값:', response.data);
      alert('회원가입에 성공하셨습니다!');
      navigate('/');
    },
      error => {
        console.error('API 호출 중 에러 발생: ', error);
        alert('회원가입에 실패하셨습니다!');
      }
    )
  };

  return (
    <div style={styles.background}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.png" alt="BLEU AUCTION" style={styles.logo} />
      </div>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} type="text" name="memberName" placeholder="이름" />
          <input style={styles.input} type="email" name="memberEmail" placeholder="이메일" />
          <input style={styles.input} type="password" name="memberPwd" placeholder="비밀번호" />
          <input style={styles.input} type="text" name="memberPhone" placeholder="전화번호" />
          {/* {showPostcode && (
                <DaumPostcode
                    onComplete={handleAddress}
                    autoClose={true}
                />
            )} */}
          <input style={styles.input} type="text" name="memberZipcode" placeholder="우편번호" />
          {/* <button onClick={() => setShowPostcode(true)} style={{...styles.button, marginBottom: '10px'}}>우편번호 찾기</button> */}
          <input style={styles.input} type="text" name="memberAddr" placeholder="기본주소" />
          <input style={styles.input} type="text" name="memberDetailAddr" placeholder="상세주소" />
          <input style={styles.input} type="text" name="memberBacnk" placeholder="은행" />
          <input style={styles.input} type="text" name="memberAccount" placeholder="계좌번호" />
          <div style={styles.accountTypeContainer}>
            <label style={styles.accountTypeLabel}>
              <input
                type="radio"
                name="memberCategory"
                value="M"
                style={styles.accountTypeInput}
              />
              개인
            </label>
            <label style={styles.accountTypeLabel}>
              <input
                type="radio"
                name="memberCategory"
                value="S"
                style={styles.accountTypeInput}
              />
              기업
            </label>
          </div>
          <button type="submit" style={styles.submitButton}>회원 가입</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'var(--Blue, linear-gradient(180deg, #0575E6 0%, #02298A 84.79%, #021B79 100%))',
  },
  logoContainer: {
    marginBottom: '10px',
  },
  logo: {
    width: '200px',
  },
  container: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  toggleButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
  activeButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'lightgray',
    borderRadius: '10px',
  },
  input: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  submitButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#0575E6',
    border: 'none',
    borderRadius: '8px',
    color: 'white',

  },
  accountTypeContainer: {
    marginBottom: '10px',
  },
  accountTypeLabel: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  accountTypeInput: {
    marginRight: '5px',
  },
};

export default RegisterPage;
