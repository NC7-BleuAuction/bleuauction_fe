import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendAxiosRequest } from '../components/utility/common';
import { formToJSON } from 'axios';

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

function RegisterPage() {

  const [values, handleChange] = useForm({ //useForm은 초기 값 initialValues를 인수로 받음,  그 상태와 상태를 변경하는 함수를 반환하는 useForm 훅을 호출
    email: '',
    password: '',
    name: '',
    phone: '',
    zip: '',
    address: '',
    detailAddress: '',
    bank: '',
    accountNumber: '',
    accountType: '',
  });

  const navigate = useNavigate();

  const requestData = { //객체는 폼에서 사용자가 입력한 데이터를 서버로 전송하기 위해 준비되는 데이터 구조
    memberCategory: values.accountType,
    memberEmail: values.email,      //values 객체의 email 속성 값을 requestData 객체의 email 속성에 할당
    memberPwd: values.password,
    memberName: values.name,
    memberPhone: values.phone,
    memberZipcode: values.zip,
    memberAddr: values.address,
    memberDetailAddr: values.detailAddress,
    memberBank: values.bank,
    memberAccount: values.accountNumber,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(formToJSON(data));
    sendAxiosRequest("/api/member/signup", 'POST', formToJSON(data), response => {
      console.log(response.data);
    }, error => {
      console.log(error);
    });
    // navigate('/main');

  };

  return (
    <div style={styles.background}>
      <div style={styles.logoContainer}>
        <img src="/images/logo.png" alt="BLEU AUCTION" style={styles.logo} />
      </div>
      <div style={styles.container}>
        <div style={styles.toggleButtons}>
          <button style={accountType === 'personal' ? styles.activeButton : styles.button} onClick={() => setAccountType('personal')}>개인</button>
          <button style={accountType === 'business' ? styles.activeButton : styles.button} onClick={() => setAccountType('business')}>기업</button>
        </div>
        {accountType === 'personal' && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input style={styles.input} type="text" name="memberName" placeholder="이름" value={values.memberName} onChange={handleChange} />
            <input style={styles.input} type="email" name="memberEmail" placeholder="이메일" value={values.memberEmail} onChange={handleChange} />
            <input style={styles.input} type="password" name="memberPwd" placeholder="비밀번호" value={values.memberPwd} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberPhone" placeholder="전화번호" value={values.memberPhone} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberZipcode" placeholder="우편번호" value={values.memberZipcode} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberAddr" placeholder="기본주소" value={values.memberAddr} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberDetailAddr" placeholder="상세주소" value={values.memberDetailAddr} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberBank" placeholder="은행" value={values.memberBank} onChange={handleChange} />
            <input style={styles.input} type="text" name="memberAccount" placeholder="계좌번호" value={values.memberAccount} onChange={handleChange} />
            <button type="submit" style={styles.submitButton}>회원 가입</button>
          </form>
        )}
        {accountType === 'business' && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input style={styles.input} type="text" name="name" placeholder="기업명" value={values.name} onChange={handleChange} />
            <input style={styles.input} type="text" name="businessnum" placeholder="사업자등록번호" value={values.businessnum} onChange={handleChange} />
            <input style={styles.input} type="email" name="email" placeholder="이메일" value={values.email} onChange={handleChange} />
            <input style={styles.input} type="password" name="password" placeholder="비밀번호" value={values.password} onChange={handleChange} />
            <input style={styles.input} type="text" name="phone" placeholder="전화번호" value={values.phone} onChange={handleChange} />
            <input style={styles.input} type="text" name="zip" placeholder="우편번호" value={values.zip} onChange={handleChange} />
            <input style={styles.input} type="text" name="address" placeholder="기본주소" value={values.address} onChange={handleChange} />
            <input style={styles.input} type="text" name="detailAddress" placeholder="상세주소" value={values.detailAddress} onChange={handleChange} />
            <input style={styles.input} type="text" name="bank" placeholder="은행" value={values.bank} onChange={handleChange} />
            <input style={styles.input} type="text" name="accountNumber" placeholder="계좌번호" value={values.accountNumber} onChange={handleChange} />
            <button type="submit" style={styles.submitButton}>회원 가입</button>
          </form>
        )}
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
