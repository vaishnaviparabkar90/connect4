import express from "express";

const app = express();
app.use(express.static("public")); // serve index.html
app.get("/", (req, res) => {
  res.send("Hello world");
});

export default app;
