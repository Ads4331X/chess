export class Bishiop {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.bishiopPath = [];
    this.attackedSquare = [];
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

      if (currentLeftSquare === null)
        this.bishiopPath.push([movePath, this.col - count]);
      else if (
        currentLeftSquare.color !== bishiopColor &&
        currentLeftSquare.name[1] === "K"
      )
        this.bishiopPath.push([movePath, this.col - count]);
      else if (currentLeftSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col - count]);
        break;
      } else {
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push(...this.bishiopPath);
        break;
      }
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

      if (currentRightSquare === null)
        this.bishiopPath.push([movePath, this.col + count]);
      else if (
        currentRightSquare.color !== bishiopColor &&
        currentRightSquare.name[1] === "K"
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else if (currentRightSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col + count]);
        break;
      } else {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push(...this.bishiopPath);
        break;
      }
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

      if (currentRightSquare === null)
        this.bishiopPath.push([movePath, this.col + count]);
      else if (
        currentRightSquare.color !== bishiopColor &&
        currentRightSquare.name[1] === "K"
      )
        this.bishiopPath.push([movePath, this.col + count]);
      else if (currentRightSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col + count]);
        break;
      } else {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push(...this.bishiopPath);
        break;
      }
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

      if (currentLeftSquare === null)
        this.bishiopPath.push([movePath, this.col - count]);
      else if (
        currentLeftSquare.color !== bishiopColor &&
        currentLeftSquare.name[1] === "K"
      )
        this.bishiopPath.push([movePath, this.col - count]);
      else if (currentLeftSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col - count]);
        break;
      } else {
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push(...this.bishiopPath);
        break;
      }
      count++;
    }
  }

  #availablePath() {
    this.bishiopPath = [];
    this.attackedSquare = [];

    this.#topLeftPath();
    this.#topRightPath();
    this.#bottomLeftPath();
    this.#bottomRightPath();
  }

  getAttackSquares() {
    this.#availablePath();

    return this.attackedSquare;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    const bishiop = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = bishiop;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.__board__.switchTurn();
  }
  move(toRow, toCol) {
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
