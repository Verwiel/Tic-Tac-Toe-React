import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//children
  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
//parent
  class Board extends React.Component {
    constructor(props) { 
//used to initialize the this.state 
      super(props);
//always need a super after constructor
      this.state = {
        squares: Array(9).fill(null), 
//defaults array to all null
        xIsNext: true,
      };
    }

    handleClick(i) { 
//defined for renderSquare onClick below
      const squares = this.state.squares.slice(); 
//slice creates copy of array to modify
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
//keeps user from entering in a taken spot or if game is over
      squares[i] = this.state.xIsNext ? 'X' : 'O'; 
//gives value to square clicked
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }

    renderSquare(i) {
      return ( 
//parentheses to prevent ; after return since its split
        <Square
          value = {this.state.squares[i]} 
//each square now gets the prop from squares
          onClick={() => this.handleClick(i)} 
//called by square
        />
      );
    }
  
    render() {
      const winner = 
    calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
//declares winner or which player is next on top of the board
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  