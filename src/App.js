import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Notice from './components/Notice/Notice';

function App() {
  return (
    <Routes>
      <div className="App">
        <header className="App-header">
          <h1>bleuauction 작업중</h1>
          <Link to="/notices">Go to Notices</Link>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Routes>
        <Route path="/notices" element={<Notice />} />
      </Routes>
    </Routes>
  );
}

export default App;
