import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Notice from './components/Notice/Notice';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>bleuauction 작업중</h1>
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
        <Route path="/notices" component={Notice} />
        <Redirect from="/" to="/notices" />
      </Switch>
    </Router>
  );
}

export default App;
