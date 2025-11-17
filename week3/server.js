const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the "views" directory (where our EJS templates live)
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

// In-memory storage for guestbook messages
let entries = [];

// GET /  --> show form + messages
app.get('/', (req, res) => {
  res.render('index', { entries });
});

// POST /submit  --> handle form submit
app.post('/submit', (req, res) => {
  const name = req.body.name || 'Anonymous';
  const message = req.body.message || '';

  if (message.trim() !== '') {
    entries.unshift({
      name,
      message,
      time: new Date().toLocaleString()
    });
  }

  // redirect so the user sees the updated list
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Week 3 (EJS) app listening at http://localhost:${port}`);
});
