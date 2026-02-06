import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Connect 4 Backend</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          a {
            color: #38bdf8;
            font-size: 18px;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div>
          <h2>🎮 Connect 4 – Backend Server</h2>
          <p>This is the backend service for the game.</p>
          <p>
            👉 <a href="https://gameofconnect4.netlify.app" target="_blank">
              Play the game here
            </a>
          </p>
        </div>
      </body>
    </html>
  `);
});

export default app;
