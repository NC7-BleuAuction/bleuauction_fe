import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Test.css';

const Test = () => {
  const [testStatus, setState] = useState({
    loading: false,
    response: '값'
  });
  useEffect(() => {
    //hello()
  })
  const hello = () => {
    axios.get('/api/test')
    .then((response) => {
      console.log('Axios Response :' , response)
      setState({ response: response.data, loading: false }); // 로딩 상태를 false로 변경
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setState({ response: '값',loading: false }); // 에러 발생 시 로딩 상태를 false로 변경
    });
  }
  

  console.log("testStatus : ",testStatus)
  return (
    <>
      <h1>Test API</h1>
      {testStatus.loading ? (
        <p>Loading...</p> // 로딩
      ) : (
        <div className="response-container">
          <p>API Response:</p>
          <p className="response-text">{testStatus.response}</p>
          <p>짜잔! 성공적으로 값을 가져왔습니다.</p>
        </div>
      )}
    </>
  );
}

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

export default Test;
