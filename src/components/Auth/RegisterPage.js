import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return [values, handleChange];
};

function RegisterPage() {
  const [accountType, setAccountType] = useState('personal');
  const [values, handleChange] = useForm({
    email: '',
    password: '',
    name: '',
    phone: '',
    zip: '',
    address: '',
    detailAddress: '',
    bank: '',
    accountNumber: '',
  });

  const navigate = useNavigate(); // useNavigate hook


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data: ', values);
    navigate('/main');
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
          <input style={styles.input} type="text" name="name" placeholder="이름" value={values.name} onChange={handleChange} />
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
};

export default RegisterPage;

