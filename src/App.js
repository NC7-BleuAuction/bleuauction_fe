import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './components/Test/Test'; // 경로 수정
import Test2 from './components/test2'
import Main from './components/main'

function App() {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/api/test" element={<Test />} />
    <Route path="/api/test2" element={<Test2 />} />
  </Routes>
  </Router>
  );
}

export default App;
