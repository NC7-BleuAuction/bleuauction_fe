import React from "react";
import logo from '../logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import Test from './Test/Test'; // 경로 수정
import Test2 from ''



import '../App.css';

export default function() {
  const navigate = useNavigate();
  const goToTest = () => {
    navigate("/api/test")
  }
  const goToTest2 = () => {
    navigate("/api/test2")
  }
  return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            bleuauction 작업중!
          </p>
         <Link to="/api/test" className="App-link">Go to TestPage</Link><br></br>
         <Link to="/api/test2" className="App-link">Go to TestPag222</Link>
      </>
  )
}