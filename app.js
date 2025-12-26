import express from "express";

const app = express();

app.use(express.static("public")); // serve static files

app.use((req, res) => {
  res.sendFile("index.html", { root: "public" });
});

export default app;
