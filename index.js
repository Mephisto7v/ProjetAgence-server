const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "Mfcmv74!",
    database: "projetbdd"
});

app.post("/api/insertBien", (req, res) => {
    console.log(req.body)
    const sqlInsert = "INSERT INTO logement VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    // db.query(sqlInsert,  (err, result) => {
    //     res.send(err);
    // })
})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});