

function getAvailableRow(board, col) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === 0) return row;
  }
  return -1;
}

function checkWin(board, player) {
  const ROWS = 6;
  const COLS = 7;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;

      // Horizontal 
      if (
        c + 3 < COLS &&
        board[r][c + 1] === player &&
        board[r][c + 2] === player &&
        board[r][c + 3] === player
      ) return true;

      // Vertical 
      if (
        r + 3 < ROWS &&
        board[r + 1][c] === player &&
        board[r + 2][c] === player &&
        board[r + 3][c] === player
      ) return true;

      // Diagonal \
      if (
        r + 3 < ROWS && c + 3 < COLS &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      ) return true;

      // Diagonal /
      if (
        r + 3 < ROWS && c - 3 >= 0 &&
        board[r + 1][c - 1] === player &&
        board[r + 2][c - 2] === player &&
        board[r + 3][c - 3] === player
      ) return true;
    }
  }
  return false;
}


export function getBotMove(board) {
  const BOT = 2;
  const PLAYER = 1;
  const validColumns = [];

  // Collect all  columns
  for (let col = 0; col < 7; col++) {
    if (board[0][col] === 0) {
      validColumns.push(col);
    }
  }

  //  WIN 
  for (const col of validColumns) {
    const row = getAvailableRow(board, col);
    if (row === -1) continue;

    board[row][col] = BOT;
    if (checkWin(board, BOT)) {
      board[row][col] = 0;
      return col;
    }
    board[row][col] = 0;
  }

  // BLOCK opponent's win
  for (const col of validColumns) {
    const row = getAvailableRow(board, col);
    if (row === -1) continue;

    board[row][col] = PLAYER;
    if (checkWin(board, PLAYER)) {
      board[row][col] = 0;
      return col;
    }
    board[row][col] = 0;
  }

  // center column
  if (validColumns.includes(3)) return 3;

  //choose column closest to center
  validColumns.sort(
    (a, b) => Math.abs(3 - a) - Math.abs(3 - b)
  );

  return validColumns[0];
}
