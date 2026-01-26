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

    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col - count < 0) break;

      let currentLeftSquare = this.board[movePath][this.col - count];

      if (currentLeftSquare === null) {
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push([movePath, this.col - count]);
      } else if (currentLeftSquare.color !== bishiopColor) {
        // can capture enemy, and still attacks it
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push([movePath, this.col - count]);
        break;
      } else {
        // own piece blocks path, but still attacked
        this.attackedSquare.push([movePath, this.col - count]);
        break;
      }

      count++;
    }
  }

  #topRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col + count > 7) break;

      let currentRightSquare = this.board[movePath][this.col + count];

      if (currentRightSquare === null) {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push([movePath, this.col + count]);
      } else if (currentRightSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push([movePath, this.col + count]);
        break;
      } else {
        this.attackedSquare.push([movePath, this.col + count]);
        break;
      }

      count++;
    }
  }

  #bottomRightPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col + count > 7) break;

      let currentRightSquare = this.board[movePath][this.col + count];

      if (currentRightSquare === null) {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push([movePath, this.col + count]);
      } else if (currentRightSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col + count]);
        this.attackedSquare.push([movePath, this.col + count]);
        break;
      } else {
        this.attackedSquare.push([movePath, this.col + count]);
        break;
      }

      count++;
    }
  }

  #bottomLeftPath() {
    let { count, bishiopColor } = this.#getCountandCOlor();

    for (let movePath = this.row + 1; movePath <= 7; movePath++) {
      if (this.col - count < 0) break;

      let currentLeftSquare = this.board[movePath][this.col - count];

      if (currentLeftSquare === null) {
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push([movePath, this.col - count]);
      } else if (currentLeftSquare.color !== bishiopColor) {
        this.bishiopPath.push([movePath, this.col - count]);
        this.attackedSquare.push([movePath, this.col - count]);
        break;
      } else {
        this.attackedSquare.push([movePath, this.col - count]);
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

    this.bishiopPathSet = new Set(
      this.bishiopPath.map(([row, col]) => `${row},${col}`),
    );
  }

  getAttackSquares() {
    this.#availablePath();
    return this.attackedSquare;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    const target = this.board[toRow][toCol];
    if (target) {
      this.board[toRow][toCol] = null;
    }

    const bishiop = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = bishiop;
    this.board[fromRow][fromCol] = null;

    this.row = toRow;
    this.col = toCol;

    if (this.board.__board__.recordMove) {
      this.board.__board__.recordMove(bishiop, fromRow, fromCol, toRow, toCol);
    }

    this.board.__board__.switchTurn();
  }

  move(toRow, toCol) {
    this.#availablePath();
    const movableSet = new Set(this.bishiopPath.map(([r, c]) => `${r},${c}`));

    if (movableSet.has(`${toRow},${toCol}`)) {
      if (
        !this.board.__board__.isLegalMove(
          this,
          this.row,
          this.col,
          toRow,
          toCol,
        )
      ) {
        return this.show();
      }

      this.#move(this.row, this.col, toRow, toCol);
    }
    return this.show();
  }

  show() {
    this.#availablePath();
    return this.bishiopPath;
  }
}
