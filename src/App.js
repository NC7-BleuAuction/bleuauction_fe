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
            BleuAuction 화면 작업 중!
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
        <Switch>
          <Route path="/notice" component={Notice} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
