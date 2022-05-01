const express = require('express');
const passport = require('passport');

const profileRouter = express.Router();

//load callback functions
const {
  CreateProfile,
  CurrentProfile,
  GetProfileByHandle,
  GetProfileById,
  CreateExperience,
  CreateEducation,
  DeleteExperience,
  DeleteEducation,
  DeleteProfile,
  GetAllProfiles,
} = require('../../controllers/profileControllers');

//@route => req:post => /api/profile
//@desc => create or edit user profile
//access => private
profileRouter.post('/', passport.authenticate('jwt', { session: false }), CreateProfile);

//@route => req:get => /api/profile
//@desc => get the current user profile
//access => private
profileRouter.get('/', passport.authenticate('jwt', { session: false }), CurrentProfile);

//@route => req:get => /api/profile/all
//@desc => get all profiles
//access => public
profileRouter.get('/all', GetAllProfiles);

//@route => req:get => /api/profile/handle/:handle
//@desc => get user profile by handle
//access => public
profileRouter.get('/handle/:handle', GetProfileByHandle);

//@route => req:get => /api/profile/user/:user_id
//@desc => get user profile by user_id
//access => public
profileRouter.get('/user/:user_id', GetProfileById);

//@route => req:post => /api/profile/experience
//@desc => add experience to profile
//access => private
profileRouter.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  CreateExperience
);

//@route => req:post => /api/profile/education
//@desc => add education to profile
//access => private
profileRouter.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  CreateEducation
);

//@route => req:delete => /api/profile/experience/:exp_id
//@desc => delete experience from profile
//access => private
profileRouter.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  DeleteExperience
);

//@route => req:delete => /api/profile/education/:edu_id
//@desc => delete education from profile
//access => private
profileRouter.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  DeleteEducation
);

//@route => req:delete => /api/profile
//@desc => delete profile and user
//access => private
profileRouter.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  DeleteProfile
);

//export profile router
module.exports = profileRouter;
