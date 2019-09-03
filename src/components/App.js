import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import TicTacMode from "./TicTacMode";
import TicTacStart from "./TicTacToeModal/TicTacStart";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/mode" component={TicTacMode} />
        <Route path="/start" component={TicTacStart} />
      </Router>
    );
  }
}
