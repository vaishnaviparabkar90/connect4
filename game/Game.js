export default class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.board = Array.from({ length: 6 }, () =>
      Array(7).fill(0)
    );

    this.players = {
      1: null,
      2: null,
    };

    this.turn = 1; 
    this.status = "WAITING"; 
    this.winner = null; 
this.lastMove = {
        row: null,  
        col: null,
};
    this.createdAt = Date.now();
    this.lastMoveAt = Date.now();
  }
  /* ---------------- PLAYER  ---------------- */
  addPlayer(playerNumber, player) {
    this.players[playerNumber] = player;

    if (this.players[1] && this.players[2]) {
      this.status = "PLAYING";
    }
  }

  /* ---------------- MOVE LOGIC ---------------- */

  isValidMove(column) {
    if (column < 0 || column > 6) return false;
    return this.board[0][column] === 0;
  }

makeMove(playerNumber, column) {
  if (this.status !== "PLAYING") return false;
  if (this.turn !== playerNumber) return false;
  if (!this.isValidMove(column)) return false;

  let placedRow = -1;

  // drop disc from bottom
  for (let row = 5; row >= 0; row--) {
    if (this.board[row][column] === 0) {
      this.board[row][column] = playerNumber;
      placedRow = row;
      this.lastMove = { row, col: column };
      this.lastMoveAt = Date.now();
      break;
    }
  }

  // check win using optimized last-move logic
  if (this.checkWinFromLastMove(playerNumber, placedRow, column)) {
    this.status = "FINISHED";
    this.winner = playerNumber;
    return true;
  }

  // check draw
  if (this.checkDraw()) {
    this.status = "FINISHED";
    this.winner = "DRAW";
    return true;
  }

  // switch turn
  this.turn = this.turn === 1 ? 2 : 1;
  return true;
}
checkWinFromLastMove(player, row, col) {
  const directions = [
    [0, 1],   
    [1, 0],   
    [1, 1],   
    [1, -1]  
  ];

  for (const [dr, dc] of directions) {
    let count = 1; // include last placed disc

    count += this.countInDirection(player, row, col, dr, dc);
    count += this.countInDirection(player, row, col, -dr, -dc);

    if (count >= 4) return true;
  }

  return false;
}

// checks for a draw
checkDraw() {
    return this.board[0].every(cell => cell !== 0);
}
// counts consecutive discs in one direction
countInDirection(player, row, col, dr, dc) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;

  while (
    r >= 0 && r < 6 &&
    c >= 0 && c < 7 &&
    this.board[r][c] === player
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}
  serialize() {
    return {
      gameId: this.gameId,
      board: this.board,
      turn: this.turn,
      status: this.status,
      winner: this.winner,
    };
  }
}
