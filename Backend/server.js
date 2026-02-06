import "dotenv/config";
import cors from "cors";
import http from "http";
import app from "./app.js";
import { initSocket } from "./Socket/SocketInit.js";
app.use(
  cors({
    origin: "*",
  })
);

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
