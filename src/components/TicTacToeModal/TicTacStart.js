import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./../../styles/tictac.css";
import { Modal, Button, Row, Column, Image } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";
import { closeTicTacToeModal } from "./../../actions/TicTacToeAction";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import "./../../styles/tictacmodal.css";

class TicTacStart extends Component {

  closeModal = () => {
    const { closeTicTacToeModal } = this.props;
    closeTicTacToeModal()
  };

  render() {
    const { open, mode } = this.props;
    return (
      <Modal show={open} onHide={this.closeModal} className="modal-container" centered size="lg">
        <ModalHeader mode={mode}/>
        <ModalBody mode={mode}/>
        <ModalFooter closeModal={this.closeModal}/>
      </Modal>
    );
  }
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeTicTacToeModal: PropTypes.func.isRequired
  };
}
const mapStateToProps = ({ tictactoe: { open } }) => ({
  open
});

const mapDispatchToProps = {
  closeTicTacToeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacStart);
