const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const entry = `Username: ${username}, HashedPassword: ${hashedPassword}\n`;
    fs.appendFileSync('logins.txt', entry);
    res.send('Login info received and hashed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving login');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
