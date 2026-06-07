require("dotenv").config();

const express = require("express");
const app = express();
const noteRoutes = require("./routes/notesRoutes");

const port = process.env.PORT;

app.use(express.json());

app.use("/api", noteRoutes);

app.get("/", (req, res) => {
  res.send(`Welcome to my backyard`);
});

app.listen(port, () => {
  console.log(`Server is open at: http://localhost:${port}`);
});
