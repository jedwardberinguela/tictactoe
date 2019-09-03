import React, { Component } from "react";
import logo from "./../assets/tic-tac-logo.png";
import "./../styles/home.css";
import { Button, Image, Form } from "react-bootstrap";
import * as bs from 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {
  constuctor() {
    this.startPressed = this.startPressed.bind(this);
  }

  startPressed = () => {
    let path = `mode`;
    this.props.history.push(path);
  }

  render() {
    return (
      <Form className="text-center">
        <Form.Text className="header">
          <Image src={logo} className="logo" alt="logo" />
          <Form.Text>Welcome to Tic Tac Toe AI!</Form.Text>
          <Button variant="light" onClick={this.startPressed} className="start-game-btn">Start Game</Button>
        </Form.Text>
      </Form>
    );
  }
}

export default Home;