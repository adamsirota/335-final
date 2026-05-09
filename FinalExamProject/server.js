require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index'));
app.use('/arrivals', require('./routes/arrivals'));
app.use('/favorites', require('./routes/favorites'));

app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found.' });
});

app.listen(PORT, () => {
  console.log(`MTA Transit Tracker running at http://localhost:${PORT}`);
});
