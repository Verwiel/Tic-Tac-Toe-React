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
//parent to square, child of game
  class Board extends React.Component {
    renderSquare(i) {
      return ( 
//parentheses to prevent ; after return since its split
        <Square
          value = {this.props.squares[i]} 
//each square now gets the prop from squares
          onClick={() => this.props.onClick(i)} 
//called by square
        />
      );
    }
  
    render() {
      return (
        <div>
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
//Parent of Board  
  class Game extends React.Component {
    constructor(props) {
//used to initialize the this.state 
      super(props);
//always need a super after constructor
      this.state = {
        history: [{
          squares: Array(9).fill(null),
//defaults array to all null
        }],
        stepNumber: 0,
//will indicate which step were currently viewing so we can jump to it using jumpTo
        xIsNext: true,
      };
    }

    handleClick(i) { 
//defined for renderSquare onClick
      const history = this.state.history.slice(0,
    this.state.stepNumber + 1);
//stores value of step number on click
      const current = history[history.length - 1];
      const squares = current.squares.slice();
//slice creates copy of array to modify
//slice also allows timetravel function added since its immutable
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
//keeps user from entering in a taken spot or if game is over
        squares[i] = this.state.xIsNext ? 'X' : 'O'; 
//gives value to square clicked
        this.setState({
          history: history.concat([{
//concat method doesn’t mutate the original array like push does
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
// always renders based on step number
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
//creates list off to the right of previous moves and a start over option
        return (
          <li key={move}>
{/*key is needed for React to decide which components to update. */}
            <button onClick={() => this.jumpTo(move)}>
          {desc}</button>
{/*puts values from the list into buttons */}
          </li>
        );
      });
//shows a list of past moves you can interact with

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
//declares winner or which player is next on top of the board
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
{/* list of current player and previous moves */}
          </div>
        </div>
      );
    }
  }
//Below is given
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
  