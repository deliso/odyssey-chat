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


app.post("/", async (req, res) => {
  try {
    const message = req.body.newMessage;
    console.log(req.body.newMessage); 
    const newMessage = await client.query(`INSERT INTO ${tableName} (message) VALUES ($1) RETURNING *`, [message]);
    res.json(newMessage.rows[0]); 
  } catch (err) {
    console.error(err.message);
  }
})

app.delete("/", async (req, res) => {
  try {
    const deleteChat = await client.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY`);
    res.json('Chat was deleted'); 
  } catch (err) {
    console.error(err.message);
  }
})