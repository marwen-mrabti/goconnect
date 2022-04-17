const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//import routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//DB config
const db = require('./config/keys').MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(`couldn't connect to db => ${err.message}`));

//create server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));
