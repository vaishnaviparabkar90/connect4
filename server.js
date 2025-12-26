import http from "http";
import app from "./app.js";
import { initSocket } from "./Socket/SocketInit.js";

const server = http.createServer(app);
initSocket(server);


server.listen(3000, () => {
  console.log("Server running on port 3000");
});
