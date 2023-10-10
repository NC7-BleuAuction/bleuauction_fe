import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test/Test'; // 경로 수정

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            bleuauction 작업중!
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/api/test" className="App-link">Go to TestPage</Link>
        </header>
        <Routes>
          <Route path="/api/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
