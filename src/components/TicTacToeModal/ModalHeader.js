import React, { Component } from "react";

import { Modal, Button } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";

class TicTacFooter extends Component {
  render() {
    const { mode } = this.props;
    return (
      <Modal.Header closeButton>
        <Modal.Title>
          Tic Tac Toe - {mode} x {mode}{" "}
        </Modal.Title>
      </Modal.Header>
    );
  }
}

export default TicTacFooter;
