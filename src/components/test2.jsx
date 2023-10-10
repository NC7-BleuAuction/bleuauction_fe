import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [testStatus, setState] = useState({
    loading: false,
    response: '값을 가져오니라'
  });

  console.log("testStatus : ",testStatus)
  return (
    <>
      <h1>Test API</h1>
      <div className="response-container">
          <p>{testStatus.response}</p>
        </div>
    </>
  );
}
export default Test;
