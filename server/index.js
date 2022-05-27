const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

function generateRandomSentence () { 
  let sentences= [
      'So, surrender to sleep at last. What a misery, keeping watch through the night, wide awake -- you’ll soon come up from under all your troubles.',
      'Nobody -- that’s my name. Nobody -- so my mother and father call me, all my friends.',
      'Her gifts were mixed with good and evil both.',
      'Man is the vainest of all creatures that have their being upon earth.',
      'There is a time for making speeches, and a time for going to bed.',
      'For there is nothing better in this world than that man and wife should be of one mind in a house.',
      'Quick, dear boy, come in, let me look at you, look to my heart’s content -- under my own roof, the rover home at last.',
      'But I will gladly advise him -- I’ll hide nothing--',
      'I swear by the greatest, grimmest oath that binds the happy gods.',
      'My every impulse bends to what is right. Not iron, trust me, the heart with my breast. I am all compassion.',
  ];
  let maxSentences = sentences.length;
  let index = Math.floor(Math.random() * (maxSentences - 1));
  return sentences[index];
}

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
    const computerRandomText = generateRandomSentence();

    console.log(req.body.newMessage); 
    if(message !== undefined) {
      const newMessage = await client.query(`INSERT INTO ${tableName} (message, timestamp, user_id) VALUES ($1, $2, $3) RETURNING *`, [message, new Date(), 'user']);
      res.json(newMessage.rows[0]); 
    } else {
      const computerMessage = await client.query(`INSERT INTO ${tableName} (message, timestamp, user_id) VALUES ($1, $2, $3) RETURNING *`, [computerRandomText, new Date(), 'computer']);
      res.json(computerMessage.rows[0]); 
    }
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