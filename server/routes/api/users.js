const express = require('express');
const passport = require('passport');

//load callback functions
const {
  userRegister,
  userLogin,
  CurrentUser,
} = require('../../controllers/userControllers');

const usersRouter = express.Router();

//@route => req:post => /api/users/register
//@desc => register a user
//access => public
usersRouter.post('/register', userRegister);

//@route => req:post => /api/users/login
//@desc => user login => returning JWT (json web token)
//access => public
usersRouter.post('/login', userLogin);

//@route => req:post => /api/users/current
//@desc => return current user
//access => private =>require token of authentication
usersRouter.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  CurrentUser
);

//export router
module.exports = usersRouter;
