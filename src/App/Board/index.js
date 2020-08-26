import React from 'react';

const BOARD_SIZE=3

function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) }
      />
    );
  }

  renderRow(i) {
    return (
      <div key={i} className="board-row">
        {[...Array(BOARD_SIZE).keys()].map(columnNumber => {
          return(this.renderSquare(i * BOARD_SIZE + columnNumber))
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {[...Array(BOARD_SIZE).keys()].map(rowNumber => {
          return(this.renderRow(rowNumber))
        })}
      </div>
    );
  }
}

export default Board;
