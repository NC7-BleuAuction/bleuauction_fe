import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Notice from './components/Notice';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            BleuAuction 작업중.
          </p>
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
      <Switch>
        <Route exact path="/notice" component={Notice} />
        {/* 다른 페이지의 라우트를 여기에 추가할 수 있음. */}
      </Switch>
    </Router>
  );
}

export default App;
