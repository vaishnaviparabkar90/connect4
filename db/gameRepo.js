
import { pool } from "./db.js";

export async function saveFinishedGame(game) {
  await pool.query(
    `
    INSERT INTO games (game_id, player1, player2, winner, finished_at)
    VALUES ($1, $2, $3, $4, now())
    `,
    [
      game.gameId,
      game.players[1]?.username,
      game.players[2]?.username,
      game.winner
    ]
  );
}

export async function updateLeaderboard(username) {
  await pool.query(
    `
    INSERT INTO leaderboard (username, wins)
    VALUES ($1, 1)
    ON CONFLICT (username)
    DO UPDATE SET wins = leaderboard.wins + 1
    `,
    [username]
  );
}
export async function getLeaderboard() {
  const { rows } = await pool.query(
    `
    SELECT username, wins
    FROM leaderboard
    ORDER BY wins DESC
    LIMIT 10
    `
  );
  return rows;
}
