export class Queen {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.queenPath = [];
  }
  #getColorAndCount() {
    return { count: 1, queenColor: this.color };
  }

  #topLeftPath() {
    let { count, queenColor } = this.#getColorAndCount();

    // till col reaches 0  decrease the row upto 0 (top left side)
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      if (this.col - count < 0) {
        break;
      }
      let currentLeftSquare = this.board[movePath][this.col - count];

      if (currentLeftSquare === null)
        this.queenPath.push([movePath, this.col - count]);
      else if (
        currentLeftSquare.color !== queenColor &&
        currentLeftSquare.name[1] === "K"
      )
        this.queenPath.push([movePath, this.col - count]);
      else if (currentLeftSquare.color !== queenColor) {
        this.queenPath.push([movePath, this.col - count]);
        break;
      } else break;
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
      let currentRightSquare = this.board[movePath][this.col + count];

      if (currentRightSquare === null)
        this.queenPath.push([movePath, this.col + count]);
      else if (
        currentRightSquare.color !== queenColor &&
        currentRightSquare.name[1] === "K"
      )
        this.queenPath.push([movePath, this.col + count]);
      else if (currentRightSquare.color !== queenColor) {
        this.queenPath.push([movePath, this.col + count]);
        break;
      } else break;
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
      let currentRightSquare = this.board[movePath][this.col + count];

      if (currentRightSquare === null)
        this.queenPath.push([movePath, this.col + count]);
      else if (
        currentRightSquare.color !== queenColor &&
        currentRightSquare.name[1] === "K"
      )
        this.queenPath.push([movePath, this.col + count]);
      else if (currentRightSquare.color !== queenColor) {
        this.queenPath.push([movePath, this.col + count]);
        break;
      } else break;
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
      let currentLeftSquare = this.board[movePath][this.col - count];

      if (currentLeftSquare === null)
        this.queenPath.push([movePath, this.col - count]);
      else if (
        currentLeftSquare.color !== queenColor &&
        currentLeftSquare.name[1] === "K"
      )
        this.queenPath.push([movePath, this.col - count]);
      else if (currentLeftSquare.color !== queenColor) {
        this.queenPath.push([movePath, this.col - count]);
        break;
      } else break;

      count++;
    }
  }

  #verticalUp() {
    // UP
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.row - 1; movePath >= 0; movePath--) {
      const square = this.board[movePath][this.col];
      if (square === null) this.queenPath.push([movePath, this.col]);
      else if (square.color !== queenColor && square.name[1] === "K")
        this.queenPath.push([movePath, this.col]);
      else if (square.color !== queenColor) {
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
      const square = this.board[movePath][this.col];
      if (square === null) this.queenPath.push([movePath, this.col]);
      else if (square.color !== queenColor && square.name[1] === "K")
        this.queenPath.push([movePath, this.col]);
      else if (square.color !== queenColor) {
        this.queenPath.push([movePath, this.col]);
        break;
      } else break;
    }
  }

  #horizontalLeft() {
    // LEFT
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.col - 1; movePath >= 0; movePath--) {
      const square = this.board[this.row][movePath];
      if (square === null) this.queenPath.push([this.row, movePath]);
      else if (square.color !== queenColor && square.name[1] === "K")
        this.queenPath.push([this.row, movePath]);
      else if (square.color !== queenColor) {
        this.queenPath.push([this.row, movePath]);
        break;
      } else break;
    }
  }

  #horizontalRight() {
    // RIGHT
    const { queenColor } = this.#getColorAndCount();
    for (let movePath = this.col + 1; movePath < 8; movePath++) {
      const square = this.board[this.row][movePath];
      if (square === null) this.queenPath.push([this.row, movePath]);
      else if (square.color !== queenColor && square.name[1] === "K")
        this.queenPath.push([this.row, movePath]);
      else if (square.color !== queenColor) {
        this.queenPath.push([this.row, movePath]);
        break;
      } else break;
    }
  }

  #availablePaths() {
    this.queenPath = [];
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

  getAttackSquares() {
    this.#availablePaths();
    return this.queenPath;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    const queen = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = queen;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.__board__.switchTurn();
  }
  move(toRow, toCol) {
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
    return this.queenPath;
  }
}
