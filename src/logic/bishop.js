export class Bishiop {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.bishiopPath = [];
  }

  #getCountandCOlor() {
    return { count: 1, bishiopColor: this.color };
  }

  #topLeftPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    // till col reaches 0  decrease the row upto 0 (top left side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board[movePath][this.col - count];

      if (
        currentLeftSquare === null ||
        currentLeftSquare.color !== bishiopColor
      )
        this.bishiopPath.push([movePath, this.col - count]);
      else break;
      count++;
    }
  }
  #topRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    // till col reaches 7  decrease the row upto 0 (top right side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        currentRightSquare.color !== bishiopColor
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    // till col reaches 7  increase the row uptp 7 (bottom right side)
    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col + count > 7) {
        break;
      }
      let currentRightSquare = this.board[movePath][this.col + count];

      if (
        currentRightSquare === null ||
        currentRightSquare.color !== bishiopColor
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else break;
      count++;
    }
  }

  #bottomLeftPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    // till col reaches 0  increase the row uptp 7 (bottom left side)
    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board[movePath][this.col - count];

      if (
        currentLeftSquare === null ||
        currentLeftSquare.color !== bishiopColor
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
    if (!this.board.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }
    const bishiop = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = bishiop;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.switchTurn();
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
    return this.bishiopPath;
  }
}
