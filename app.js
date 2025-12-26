import express from "express";

const app = express();
app.use(express.static("public")); // serve index.html
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

export default app;
