import React, { Component } from 'react';
import axios from 'axios';
import './Test.module.css';
import { useState, useEffect } from 'react';

// class Test extends Component {
//   constructor() {
//     super();
//     this.state = {
//       response: '',
//       loading: true, // 로딩 상태
//     };
//   }

  

//   componentDidMount() {
//     // `/api/test` 엔드포인트로 GET 요청
//     axios.get('/api/test')
//       .then((response) => {
//         this.setState({ response: response.data, loading: false }); // 로딩 상태를 false로 변경
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         this.setState({ loading: false }); // 에러 발생 시 로딩 상태를 false로 변경
//       });
//   }

//   render() {
//     const { response, loading } = this.state;

//     return (
//       <div className="test-container">
//         <h1>Test API</h1>
//         {loading ? (
//           <p>Loading...</p> // 로딩
//         ) : (
//           <div className="response-container">
//             <p>API Response:</p>
//             <p className="response-text">{response}</p>
//             <p>짜잔! 성공적으로 값을 가져왔습니다.</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

function Test() {
  const [test, setTest] = useState({response: '', loading: true});

  useEffect(() => {
    axios.get('/api/test')
      .then(response => setTest(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="test-container">
        <h1>Test API</h1>
        {test.loading ? (
          <p>Loading...</p> // 로딩
        ) : (
          <div className="response-container">
            <p>API Response:</p>
            <p>{test}</p>
            <p className="response-text">{test.response}</p>
            <p>짜잔! 성공적으로 값을 가져왔습니다.</p>
          </div>
        )}
      </div>
  )
}



export default Test;