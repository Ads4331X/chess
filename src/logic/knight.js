export default class Knight {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.knightPath = [];
  }

  #isValid(check) {
    return check <= 7 && check >= 0;
  }

  #verticalPaths() {
    const verticalUpRow = this.row + 2;
    const verticalDownRow = this.row - 2;
    const verticalLeftCol = this.col - 1;
    const verticalRightCol = this.col + 1;

    const knightColor = this.board[this.row][this.col][0];

    // top left path
    if (this.#isValid(verticalUpRow) && this.#isValid(verticalLeftCol)) {
      const square = this.board[verticalUpRow][verticalLeftCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([verticalUpRow, verticalLeftCol]);
    }

    // top right path
    if (this.#isValid(verticalUpRow) && this.#isValid(verticalRightCol)) {
      const square = this.board[verticalUpRow][verticalRightCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([verticalUpRow, verticalRightCol]);
    }

    // bottom left path
    if (this.#isValid(verticalDownRow) && this.#isValid(verticalLeftCol)) {
      const square = this.board[verticalDownRow][verticalLeftCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([verticalDownRow, verticalLeftCol]);
    }

    // bottom right path
    if (this.#isValid(verticalDownRow) && this.#isValid(verticalRightCol)) {
      const square = this.board[verticalDownRow][verticalRightCol];

      if (square === null || square.color !== knightColor) {
        this.knightPath.push([verticalDownRow, verticalRightCol]);
      }
    }
  }

  #horizontalPaths() {
    const horizontalLeftCol = this.col - 2;
    const horizontalRightCol = this.col + 2;
    const horizontalUpRow = this.row + 1;
    const horizontalDownRow = this.row - 1;

    const knightColor = this.color;

    // left top path
    if (this.#isValid(horizontalLeftCol) && this.#isValid(horizontalUpRow)) {
      const square = this.board[horizontalUpRow][horizontalLeftCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([horizontalUpRow, horizontalLeftCol]);
    }

    // right top path
    if (this.#isValid(horizontalRightCol) && this.#isValid(horizontalUpRow)) {
      const square = this.board[horizontalUpRow][horizontalRightCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([horizontalUpRow, horizontalRightCol]);
    }

    // right bottom path
    if (this.#isValid(horizontalRightCol) && this.#isValid(horizontalDownRow)) {
      const square = this.board[horizontalDownRow][horizontalRightCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([horizontalDownRow, horizontalRightCol]);
    }

    // left bottom path
    if (this.#isValid(horizontalLeftCol) && this.#isValid(horizontalDownRow)) {
      const square = this.board[horizontalDownRow][horizontalLeftCol];
      if (square === null || square.color !== knightColor)
        this.knightPath.push([horizontalDownRow, horizontalLeftCol]);
    }
  }

  #availablePath() {
    this.knightPath = [];
    // vertical movement
    this.#verticalPaths();
    // horizontal movement
    this.#horizontalPaths();
  }

  show() {
    this.#availablePath();
    this.movableSet = new Set(
      this.knightPath.map(([row, col]) => `${row},${col}`),
    );
    // console.log(this.movableSet);

    return this.knightPath;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    const knight = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = knight;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
    this.board.__board__.switchTurn();
  }
  move(toRow, toCol) {
    this.#availablePath();
    this.movableSet = new Set(
      this.knightPath.map(([row, col]) => `${row},${col}`),
    );

    if (this.movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
