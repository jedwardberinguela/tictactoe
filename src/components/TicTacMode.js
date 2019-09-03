import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Row, Image } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";

import logo from "./../assets/tic-tac-logo.png";
import "./../styles/tictac.css";
import TicTacStart from "./TicTacToeModal/TicTacStart";
import { showTicTacToeModal } from "./../actions/TicTacToeAction";

class TicTacMode extends Component {
  // Declared state mode 3 to have a default value when opening the modal
  state = {
    mode: 3
  };

  /**
   * This method has mode params. This param is to used to determine which mode the user has selected
   * This mode will update the default state 'mode' of 3.
   * showTicTacModal will trigger an action that will execute the opening of modal
   */
  modeSelected = mode => {
    const { showTicTacToeModal } = this.props;
    this.setState({ mode: mode });
    showTicTacToeModal();
  };

  render() {
    const { mode } = this.state;
    const { open } = this.props;

    return (
      <Fragment>
        <Form className="text-center">
          <Form.Group className="header">
            <Image src={logo} className="logo" alt="logo" />
            <Form.Label>Please select game mode:</Form.Label>
            <Row>
              <Button
                variant="primary"
                className="mode-button"
                onClick={() => this.modeSelected(3)}
              >
                3x3
              </Button>
              {/**
                * REMOVED 4X4 AND 5X5 BY NOW WORK IN PROGRESS
              */}
              {/* <Button
                variant="danger"
                className="mode-button"
                onClick={() => this.modeSelected(4)}
              >
                4x4
              </Button>
              <Button
                variant="success"
                className="mode-button"
                onClick={() => this.modeSelected(5)}
              >
                5x5
              </Button> */}
            </Row>
          </Form.Group>
        </Form>
        <TicTacStart mode={mode} open={open} />
      </Fragment>
    );
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    showTicTacToeModal: PropTypes.func.isRequired
  };
}
const mapStateToProps = ({ tictactoe: { open } }) => ({
  open
});

const mapDispatchToProps = {
  showTicTacToeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacMode);
