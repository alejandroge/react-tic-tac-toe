import React from 'react';
import Board from './Board/'
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        squareNo: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares, squareNo: i,
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
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let moveDesc = ''
      const instruction = move ?  `Go to move #${move}` : 'Go to game start';
      if (step.squareNo != null) {
        const row = Math.floor(step.squareNo / 3) + 1
        const column = step.squareNo % 3 + 1
        moveDesc = `(${row}, ${column})`
      }
      const klass = (move === this.state.stepNumber) ? 'current-step' : ''
      const desc = [instruction, moveDesc].join(' ')
      return (
        <li key={ move } className={ klass }>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
        </li>
      );
    });

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className='game-status'>{ status }</div>
          <div className='moves-list'>{ moves }</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for(let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
