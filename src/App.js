import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import { Overview, Upload, Play } from './pages'
import './App.css';

function App() {
  return (
    <div className="App">
        <header><NavLink to="/"><h1>Two Truths & A Lie</h1></NavLink></header>
        <nav>
          <NavLink className="nav-link" activeClassName="current-page" to="/upload">Submit</NavLink>
          <NavLink className="nav-link" activeClassName="current-page" to="/play">Play</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Overview}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/play" component={Play}/>
        </Switch>
    </div>
  );
}

export default App;
