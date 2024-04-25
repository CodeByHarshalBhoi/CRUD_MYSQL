const express = require("express");
const router = express.Router();
const conn = require("../db/conn");

//register user data
router.post("/create", (req, res) => {
  const { name, email, age, mobile, work, address, desc } = req.body;
  if (!name || !email || !age || !mobile || !work || !address || !desc) {
    res.status(400).json("please fill all data");
  }

  try {
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (result.length) {
        res.status(400).json("This data is already exist");
      } else {
        conn.query(
          "INSERT INTO users SET ?",
          { name, email, age, mobile, work, address, desc },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json(req.body);
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(400).json("error");
  }
  console.log(req.body);
});

//get User Data
router.get("/getuser", (req, res) => {
  conn.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(400).json("No Data Available");
    } else {
      res.status(200).json(result);
    }
  });
});

//user delete api

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  conn.query("DELETE FROM users WHERE id =?", id, (err, result) => {
    if (err) {
      res.status(400).json("Error With This is no user available");
    } else {
      res.status(200).json(result);
    }
  });
});

//get seprate data
router.get("/getdata/:id", (req, res) => {
  const { id } = req.params;
  conn.query("SELECT * FROM users WHERE id= ?", id, (err, result) => {
    if (err) {
      res.status(400).json("Some Error");
    } else {
      res.status(200).json(result);
    }
  });
});

//update users api
router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  conn.query("UPDATE users SET ? WHERE id=?", [data, id], (err, result) => {
    if (err) {
      res.status(400).json("Error occurred");
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
