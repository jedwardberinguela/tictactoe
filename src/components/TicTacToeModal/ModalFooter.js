import React, { Component } from "react";

import { Modal, Button } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";

class TicTacFooter extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    );
  }
}

export default TicTacFooter;
