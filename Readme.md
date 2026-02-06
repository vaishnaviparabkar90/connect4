## Live Version Avaliable AT
```
https://connect4-p15g.onrender.com/


```


## Connect 4 – Real-Time Multiplayer Game
A real-time Connect 4 game built using Node.js, Socket.IO, and Postgres (Supabase).
Supports Player vs Player, Player vs Bot, reconnection handling, and a leaderboard.

### ✨ Features

🔴 Real-time gameplay using WebSockets

🤖 Smart bot (blocks wins & tries to win)

⏳ Matchmaking with bot fallback

🏆 Persistent leaderboard (Postgres)

📊 Game state managed in-memory

🌐 Simple HTML/CSS/JS frontend

## 🛠 Tech Stack

Backend
```
Node.js

Socket.IO

PostgreSQL (Supabase)

UUID

```


Frontend
```

React Js 
```

## 🚀 Getting Started
1️⃣ Clone the repository
``
git clone https://github.com/vaishnaviparabkar90/connect4/
cd Backend
``

2️⃣ Install dependencies
```
npm install
```

3️⃣ Setup environment variables

Create a .env file in the backend root:
```
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/postgres
PORT=3000
```

4️⃣ Run the backend server
```
npm run dev

(or)

node server.js
```

Server will start at:
```
http://localhost:3000
```
5️⃣ Run the frontend

Open index.html directly in the browser
(or serve using Live Server / simple HTTP server)

## How to Play

- Enter username

- Click Join Queue

- Game starts when:

- Another player joins OR

- Bot is assigned after timeout

- Click a column to drop a disc

- View winner & leaderboard


## 👩‍💻 Author
Vaishnavi Parabkar

