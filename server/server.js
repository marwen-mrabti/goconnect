const express = require('express');
const mongoose = require('mongoose');

const app = express();
//middleware
//routes

//DB config
const db = require('./config/keys').MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));
//create server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));
