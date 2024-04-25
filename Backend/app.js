const express = require("express");
const app = express();
const PORT = 8000;
const mysql = require("mysql2");
const cors = require("cors");
const router = require("./routes/router")

require("dotenv").config()

app.use(express.json());
app.use(cors());

app.use(router);

app.get("/", (req, res) => {
  res.send("Server Start");
});

app.listen(PORT, () => {
  console.log(`Server Is Running On ${PORT} port Number`);
});
