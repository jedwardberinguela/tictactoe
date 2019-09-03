import React, { Component, Fragment } from "react";

import { Modal, Row, Button, Col, Container } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";
import "./../../styles/tictacmodal.css";
import { checkRowColumnDiagonal, makeCheckResult } from "./../../utilities/CommonUtils";

const styles = {
  boardSize: {
    width: 450,
    display: "flex",
    flexWrap: "wrap"
  }
};

/**
 * @prop {int} mode - Accepts mode as props
 */
class ModalBody extends Component {
  constructor() {
    super();
    this.state = {
      xTurn: "X",
      gameEnded: false,
      board: null,
      moves: 0,
      winner: "none",
      logs: []
    };
  }

  /**
   * @param {int} mode - This is the mode that the user selects
   * @returns integer that gets the size of square depending on game mode
   */
  computeSquareSize = mode => {
    return styles.boardSize.width / mode;
  };

  componentDidMount() {
    const { mode } = this.props;

    this.resetStates();
    // set board array size by mode * mode
    let boardArr = this.initializeBoard(mode);
    this.setState({ board: boardArr });
  }

  /**
   * @param {int} mode - This is the mode that the user selects
   * @returns {[]} the board setup as a 1D Array
   */
  initializeBoard = mode => {
    let arr = new Array(mode), i, l;
    for (i = 0, l = mode; i < l; i++) {
      arr[i] = new Array(mode);
    }

    return arr;
  };


  getPossibleMoves = (grid) => {
    const possibleMoves = [];
    for (let j = 0; j < grid.length; j++) {
      let row = grid[j];

      for (let i = 0; i < row.length; i++) {
        const point = row[i];
        if (point === null || point === undefined) {

          possibleMoves.push([i, j]);
        }
      }
    }
    return possibleMoves;
  }

  /**
   * @param {int} mode - This is the mode that the user selects
   * @returns elements of the squares on the board
   */
  renderBody = mode => {
    const numOfSquares = mode * mode;
    const elems = [];
    const squareSize = this.computeSquareSize(mode);

    for (let i = 0; i < numOfSquares; i++) {
      elems.push(
        <div
          ref={"square" + i}
          key={i}
          data-grid={i}
          style={{
            width: squareSize,
            height: squareSize,
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            color: "green",
            position: "relative"
          }}
        />
      );
    }
    return elems;
  };

  isValidMove = (targetId, mode) => {
    for (let i = 0; i < this.state.board.length; i++) {
      const boardRow = this.state.board[i];
      for (let j = 0; j < boardRow.length; j++) {
        if (parseInt(targetId) === i * mode + j) {
          if (this.state.board[i][j] === null || this.state.board[i][j] === undefined) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @param {event} e - The event triggered by the user
   * Will call the turn function if the user triggered a valid square
   */
  userMoved = e => {

    const { mode } = this.props;
    const targetId = e.target.dataset.grid;

    const isValidMove = this.isValidMove(targetId, mode);

    if (isValidMove) {
      this.turn(this.state.board, mode, targetId);

      if (!this.state.gameEnded) {
        this.findBestSpot(this.state.board).then((spot) => {
          this.turn(this.state.board, mode, spot);
        });
      }
    }
  }

  /**
   * @param {int} squareId - the index of the square on the board array
   * Will update the board according to the user/AI move
   */

  turn = async (board, mode, squareId) => {

    const result = this.checkWin(board, mode, this.state.moves);
    if (!!result && !!result.winner) {
      this.setState({
        gameEnded: true,
        winner: result.winner,
        moves: 0
      });
    } else {
      if (typeof squareId === "string") {
        for (let i = 0; i < board.length; i++) {
          const boardRow = board[i];
          for (let j = 0; j < boardRow.length; j++) {
            if (parseInt(squareId) === i * mode + j) {
              board[i][j] = this.state.xTurn;
              this.refs["square" + squareId].innerText = this.state.xTurn;
            }
          }
        }
      } else {
        board[squareId[1]][squareId[0]] = this.state.xTurn;
        const squareIdIndex = squareId[1] * mode + squareId[0];
        this.refs["square" + squareIdIndex].innerText = this.state.xTurn;
      }

      this.setState({
        xTurn: this.state.xTurn === "X" ? "O" : "X",
        moves: this.state.moves + 1
      });

      await this.logAction(squareId, this.state.moves);
    }
  };

  /**
   * @param {int} squareId - the index of the square on the board array
   * @param {string} xTurn - the current players turn
   * This method will append the next move element to my board
   */
  logAction = (squareId, moves) => {
    this.setState({ logs: [...this.state.logs, squareId] });

    this.renderLogs(moves);
  };

  renderLogs = (moves) => {
    const { logs } = this.state;
    const { mode } = this.props;
    const elems = [];

    let turn = 0;
    for (let i = 0; i < logs.length; i++) {
      turn += 1;
      if (typeof logs[i] === "string") {
        const intValue = parseInt(logs[i]) + 1;
        elems.push(
          <div
            key={i}
            data-grid={i}
            style={{
              width: "80%",
              height: 25,
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "green"
            }}
          >Turn {turn}: Human player: box {intValue}</div>
        )
      } else {
        const currentTile = logs[i];
        const value = currentTile[0] * mode + currentTile[1] + 1;
        elems.push(
          <div
            key={i}
            data-grid={i}
            style={{
              width: "80%",
              height: 25,
              border: "1px solid black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "green"
            }}
          >Turn {turn}: AI player: box {value}</div>
        )
      }
    }

    return elems;
  }

  /**
   * @returns winner of the match. if none found returns null
   */
  checkWin = (grid, mode, moveCount) => {
    for (let selector = 0; selector < 4; selector++) {
      const result = checkRowColumnDiagonal(selector, mode, grid);
      if (result) {
        return result;
      }
    }

    if (moveCount === grid.length * grid.length) {
      return makeCheckResult('draw', null);
    }

    return null;
  }

  /**
   * @returns the minimax algorithm function
   */
  findBestSpot = async (board) => {
    return this.minimax(board, "O", "O", 0, true);
  };

  /**
   * This method will reset all the states
   * Will be used to reset the game
   */
  resetStates = () => {
    this.setState({
      xTurn: "X",
      gameEnded: false,
      board: null,
      moves: 0,
      winner: "none",
    });
    this.initializeBoard();
  };

  /**
   * @param {int} activePlayer - AI
   * @param {int} depth - so that the algorithm is not fatalistic if it knows it will lose
   * @returns {int} score - best move to make if `topLevel` is true, or the best score
   */
  score = (board, activePlayer, depth) => {
    const { mode } = this.props;
    const winResult = this.checkWin(board, mode);
    if (!!winResult && winResult.winner !== null && winResult.winner !== undefined) {
      if (winResult.winner === activePlayer) {
        return 10 - depth;
      } else {
        return -10 - depth;
      }
    } else {
      return 0;
    }
  };

  /**
   * @param {string} currentPlayer - current player in turn
   * @returns {string} - the opposing player
   */
  getNextPlayer = currentPlayer => {
    if (currentPlayer === "X") {
      return "O";
    } else {
      return "X";
    }
  };

  makeMove = (board, move, player) => {
    const copiedGrid = JSON.parse(JSON.stringify(board));
    copiedGrid[move[1]][move[0]] = player;
    return copiedGrid;
  }

  /**
   *
   * @param {int} currentPlayer Player for this recursion instance
   * @param {int} activePlayer - (AI)
   * @param {int} depth So that the algorithm is not fatalistic if it knows it will lose
   * @param {boolean} [topLevel]
   * @returns {[] | int} best move to make if `topLevel` is true, or the best score
   */
  minimax = (board, currentPlayer, activePlayer, depth, topLevel = false) => {
    let gameStateScore = this.score(board, activePlayer, depth);
    if (gameStateScore !== 0) {
      // meaning someone from the simulation won
      return gameStateScore;
    }

    depth += 1;

    const availableMoves = this.getPossibleMoves(board);
    const correspondingScores = availableMoves.map((move) => {
      const newGridState = this.makeMove(board, move, currentPlayer);
      const nextPlayer = this.getNextPlayer(currentPlayer);
      return this.minimax(newGridState, nextPlayer, activePlayer, depth);
    });

    let result;

    if (correspondingScores.length === 0) {
      return 0;
    }

    if (currentPlayer === activePlayer) {
      result = Math.max(...correspondingScores);

    } else {
      result = Math.min(...correspondingScores);
    }

    if (topLevel) {
      const moveIndexToMake = correspondingScores.indexOf(result);
      return availableMoves[moveIndexToMake];
    }

    return result;
  };

  renderWinner = () => {
    const { gameEnded, winner } = this.state;
    if (gameEnded) {
      if (winner !== "draw") {
        return (
          <Row className="banner">
            Congratulations {winner} player! You won!
          </Row>
        )
      } else {
        return (
          <Row className="banner">
            Draw!
          </Row>
        )
      }
    } else {
      return (
        <Fragment />
      )
    }
  }

  render() {
    const { mode } = this.props;
    return (
      <Modal.Body className="modal-body" style={{ minWidth: 900 }}>
        {this.renderWinner()}
        <Container>
          <Row xs={12}>
            <Col xs={6}>
              <Row style={styles.boardSize} onClick={e => this.userMoved(e)}>
                {this.renderBody(mode)}
              </Row>
            </Col>
            <Col xs={6}>
              {this.renderLogs()}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    );
  }
}

export default ModalBody;
