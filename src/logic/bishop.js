import { Pieces } from "./pieces";

export class Bishiop extends Pieces {
  constructor(color, row, col, board) {
    super(color, board);
    this.row = row;
    this.col = col;
    this.bishiopPath = [];
  }

  #getCountandCOlor() {
    return { count: 1, bishiopColor: this.board.board[this.row][this.col][0] };
  }

  #topLeftPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    // till col reaches 0  decrease the row (top left side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board.board[movePath][this.col - count];

      if (
        currentLeftSquare === null ||
        !currentLeftSquare.includes(bishiopColor)
      )
        this.bishiopPath.push([movePath, this.col - count]);
      else break;
      count++;
    }
  }
  #topRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        !currentRightSquare.includes(bishiopColor)
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        !currentRightSquare.includes(bishiopColor)
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomLeftPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board.board[movePath][this.col - count];

      if (
        currentLeftSquare === null ||
        !currentLeftSquare.includes(bishiopColor)
      )
        this.bishiopPath.push([movePath, this.col - count]);
      else break;

      count++;
    }
  }

  #availablePath() {
    this.bishiopPath = [];

    this.#topLeftPath();
    this.#topRightPath();
    this.#bottomLeftPath();
    this.#bottomRightPath();
  }

  #move(fromRow, fromCol, toRow, toCol) {
    const bishiop = this.board.board[fromRow][fromCol];
    this.board.board[toRow][toCol] = bishiop;
    this.board.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
  }
  moveBishiop(toRow, toCol) {
    this.#availablePath();
    this.bishiopPathSet = new Set(
      this.bishiopPath.map(([row, col]) => `${row},${col}`),
    );
    if (this.bishiopPathSet.has(`${toRow},${toCol}`))
      this.#move(this.row, this.col, toRow, toCol);

    return this.show();
  }
  show() {
    this.#availablePath();
    this.bishiopPathSet = new Set(
      this.bishiopPath.map(([row, col]) => `${row},${col}`),
    );
  }
}
