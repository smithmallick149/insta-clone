const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');


//database connection
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});
mongoose.connection.on('error', (err) => {
  console.log('err connectiong to database', err);
});


// middleware
const app = express();

const PORT = process.env.PORT || 5000;

//
require('./models/user');
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


//server point
app.listen(PORT, () => {
  console.log('server is running on ', PORT);
});
