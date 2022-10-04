import React from 'react';
import './tictactoe.css';

/*
  modifying the tictactoe from the react tutorial based on the rules from this SMBC comic
  https://www.smbc-comics.com/comics/1655744364-20220620.png
*/

let objectives = ['Win', 'Lose', 'Tie'];

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);


    let x = Math.floor(Math.random() * 3);
    let o = Math.floor(Math.random() * 3);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      xWentFirst: true,
      xScore: 0,
      oScore: 0,
      xObjective: x,
      oObjective: o,
      showXObjective: false,
      showOObjective: false,
      squaresFilled: 0,
    };
  }

  handleClick(i) {

    let filled = this.state.squaresFilled;

    const gameOver = (calculateWinner(this.state.squares, filled) !== null);

    if (this.state.squares[i] === null && !gameOver) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      filled = filled + 1;

      let newState = {
        squares: squares,
        xIsNext: !this.state.xIsNext,
        squaresFilled: filled
      };
      const winner = calculateWinner(squares, filled);
      if (winner !== null) {
        let newXScore = this.state.xScore;
        let newOScore = this.state.oScore;

        console.log('xScore = ' + newXScore + ' oScore = ' + newOScore);

        if (winner === 'X') {
          if (this.state.xObjective === 0) newXScore++;
          if (this.state.oObjective === 1) newOScore++
        }
        else if (winner === 'O') {
          if (this.state.xObjective === 1) newXScore++;
          if (this.state.oObjective === 0) newOScore++;
        }
        else if (winner === 'Tie') {
          if (this.state.xObjective === 2) newXScore++;
          if (this.state.oObjective === 2) newOScore++;
        }

        newState = {
          squares: squares,
          xIsNext: !this.state.xIsNext,
          squaresFilled: filled,
          xScore: newXScore,
          oScore: newOScore
        };
      }
      this.setState(newState);
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />);
  }

  render() {

    return (
      <div>
        {this.renderHeader()}
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
        {this.renderFooter()}
      </div>
    );
  }

  renderHeader() {
    const winner = calculateWinner(this.state.squares, this.state.squaresFilled);
    let status;
    let statusHeader;
    if (winner) {
      status = winner === 'Tie' ? 'It\'s a Tie!' : 'Winner: ' + winner;
      statusHeader =
        <div className="status">
          {status}<button className='new-game-button' onClick={() => this.startNewGame()}>New Game</button>
        </div>;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      statusHeader = <div className="status">{status}</div>;
    }
    return statusHeader;
  }

  renderFooter() {

    let xObjectiveLabel = this.state.showXObjective ? 
    (<label>X Current Objective: {objectives[this.state.xObjective]}</label>) :
    (<label>Click to Show/Hide X's Hidden Objective</label>);

    let oObjectiveLabel = this.state.showOObjective ? 
    (<label>O Current Objective: {objectives[this.state.oObjective]}</label>) :
    (<label>Click to Show/Hide O's Hidden Objective</label>);

    return (
      <div className='game-footer'>
        <div>
          <div>Score</div>
          <div>X: {this.state.xScore}</div>
          <div>O: {this.state.oScore}</div>
        </div>
        <div className='footer-line'> </div>
        <div>
          <div>Current Objectives</div>
          <input onChange={() => { this.toggleShowXObjective() }} type='checkbox' checked={this.state.showXObjective} />
          {xObjectiveLabel}
          <div/>
          <input onChange={() => { this.toggleShowOObjective() }} type='checkbox' checked={this.state.showOObjective} />
          {oObjectiveLabel}

        </div>
      </div>
    );
  }

  toggleShowXObjective() {
    let newShow = !this.state.showXObjective;
    this.setState({ showXObjective: newShow });
  }
  toggleShowOObjective() {
    let newShow = !this.state.showOObjective;
    this.setState({ showOObjective: newShow });
  }

  startNewGame() {
    let xGoingFirst = !this.state.xWentFirst;
    let x = Math.floor(Math.random() * 3);
    let o = Math.floor(Math.random() * 3);


    let newState = {
      squares: Array(9).fill(null),
      xIsNext: xGoingFirst,
      xWentFirst: xGoingFirst,
      xObjective: x,
      oObjective: o,
      squaresFilled: 0
    };
    this.setState(newState);
  }
}



class TicTacToe extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================



function calculateWinner(squares, squaresFilled) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== null) {
      return squares[a];
    }
  }
  if (squaresFilled === 9) return 'Tie';
  return null;
}

export default TicTacToe;