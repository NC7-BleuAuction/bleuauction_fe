import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Test from './components/Test/Test';

function App() {
  const location = useLocation();
  const [showTestPage, setShowTestPage] = useState(false);

  useEffect(() => {
    // URL 경로가 "/api/test"인 경우 Test 컴포넌트를 렌더링
    setShowTestPage(location.pathname === '/api/test');
  }, [location.pathname]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>bleuauction 작업중!</p>
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
          {/* showTestPage가 true인 경우에만 Test 컴포넌트를 렌더링 */}
          {showTestPage && <Route path="/api/test" element={<Test />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
