import { Pieces } from "./pieces";

export class Queen extends Pieces {
  constructor(color, row, col, board) {
    super(color, board);
    this.row = row;
    this.col = col;
    this.queenPath = [];
  }
  #getColorAndCount() {
    return { count: 1, queenColor: this.board.board[this.row][this.col][0] };
  }

  #topLeftPath() {
    let { count, queenColor } = this.#getColorAndCount();

    // till col reaches 0  decrease the row upto 0 (top left side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board.board[movePath][this.col - count];

      if (currentLeftSquare === null || !currentLeftSquare.includes(queenColor))
        this.queenPath.push([movePath, this.col - count]);
      else break;
      count++;
    }
  }
  #topRightPath() {
    let { count, queenColor } = this.#getColorAndCount();

    // till col reaches 7  decrease the row upto 0 (top right side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        !currentRightSquare.includes(queenColor)
      )
        this.queenPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomRightPath() {
    let { count, queenColor } = this.#getColorAndCount();

    // till col reaches 7  increase the row uptp 7 (bottom right side)
    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        !currentRightSquare.includes(queenColor)
      )
        this.queenPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomLeftPath() {
    let { count, queenColor } = this.#getColorAndCount();

    // till col reaches 0  increase the row uptp 7 (bottom left side)
    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board.board[movePath][this.col - count];

      if (currentLeftSquare === null || !currentLeftSquare.includes(queenColor))
        this.queenPath.push([movePath, this.col - count]);
      else break;

      count++;
    }
  }

  #verticalUp() {
    // UP
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      const square = this.board.board[movePath][this.col];
      if (square === null) {
        this.queenPath.push([movePath, this.col]);
      } else if (!square.includes(queenColor)) {
        // stop after capturing enemy piece
        this.queenPath.push([movePath, this.col]);
        break; // stop after capturing
      } else break; // same color piece
    }
  }

  #verticalDown() {
    // DOWN
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.row + 1; movePath < 8; movePath++) {
      const square = this.board.board[movePath][this.col];
      if (square === null) this.queenPath.push([movePath, this.col]);
      else if (!square.includes(queenColor)) {
        this.queenPath.push([movePath, this.col]);
        break;
      } else break;
    }
  }

  #horizontalLeft() {
    // LEFT
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.col - 1; movePath >= 0; movePath--) {
      const square = this.board.board[this.row][movePath];
      if (square === null) this.queenPath.push([this.row, movePath]);
      else if (!square.includes(queenColor)) {
        this.queenPath.push([this.row, movePath]);
        break;
      } else break;
    }
  }

  #horizontalRight() {
    // RIGHT
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.col + 1; movePath < 8; movePath++) {
      const square = this.board.board[this.row][movePath];
      if (square === null) this.queenPath.push([this.row, movePath]);
      else if (!square.includes(queenColor)) {
        this.queenPath.push([this.row, movePath]);
        break;
      } else break;
    }
  }

  #availablePaths() {
    // bishiop movement of queen (diagonals)
    this.#topLeftPath();
    this.#topRightPath();
    this.#bottomLeftPath();
    this.#bottomRightPath();

    // for rook movement of queen (vertical and horizontal)
    this.#verticalUp();
    this.#verticalDown();
    this.#horizontalLeft();
    this.#horizontalRight();
  }

  #move(fromRow, fromCol, toRow, toCol) {
    const queen = this.board.board[fromRow][fromCol];
    this.board.board[toRow][toCol] = queen;
    this.board.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
  }
  moveQueen(toRow, toCol) {
    this.#availablePaths();
    this.queenPathSet = new Set(
      this.queenPath.map(([row, col]) => `${row},${col}`),
    );
    if (this.queenPathSet.has(`${toRow},${toCol}`))
      this.#move(this.row, this.col, toRow, toCol);
  }
  show() {
    this.#availablePaths();
    this.queenPathSet = new Set(
      this.queenPath.map(([row, col]) => `${row},${col}`),
    );
    // console.log(this.queenPathSet);
  }
}
