const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();


app.use(cors());
app.use(express.json())

app.listen(5001, () => {
  console.log('Server running on port 5001');
})

const client = new Pool({
  user: "sergiomorales",
  host: "localhost",
  database: "sergiomorales",
  port: "5432"
});

const tableName = 'messages';


app.get("/", async (req, res) => {
  try {
    const allMessages = await client.query(`SELECT * FROM ${tableName}`);
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
  }
})