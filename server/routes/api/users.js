const express = require('express');
const passport = require('passport');

//load callback functions
const {
  userRegister,
  userLogin,
  CurrentUser,
  AdminDeletePost,
  AdminDeleteUser,
} = require('../../controllers/userControllers');

const usersRouter = express.Router();

//roles
const { ROLES, inRole } = require('../../security/Roles');

//@route => req:delete => /api/users/admin/delete_user/:user_id
//@desc => delete a user
//access => private => admin level access
usersRouter.delete(
  '/admin/delete_user/:user_id/:profile_id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  AdminDeleteUser
);

//@route => req:delete => /api/users/admin/delete_post/:post_id
//@desc => delete post
//access => private => admin level access
usersRouter.delete(
  '/admin/delete_post/:post_id',
  passport.authenticate('jwt', { session: false }),
  inRole(ROLES.ADMIN),
  AdminDeletePost
);

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
