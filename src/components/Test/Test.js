import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Test.css';

const Test = () => {
  const [testStatus, setTestStatus] = useState({
    loading: false,
    response: ''
  });

  useEffect(() => {
    hello();
  }, []);

  const hello = () => {
    axios.get('/api/test')
      .then((response) => {
        console.log('Axios Response:', response);
        setTestStatus({ response: response.data, loading: false });
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setTestStatus({ response: '데이터를 가져오는 중 오류 발생', loading: false });
      });
  };

  return (
    <>
      <h1>테스트 API</h1>
      {testStatus.loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="response-container">
          <p>API 응답:</p>
          <p className="response-text">{testStatus.response}</p>
          <p>짜잔! 성공적으로 값을 가져왔습니다.</p>
        </div>
      )}
    </>
  );
};

export default Test;
