//load models
const Profile = require('../models/Profile');
const User = require('../models/User');

//load validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// create or update user profile
exports.CreateProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //get profile fields from req.body
  const profileFields = {};

  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;

  //skills - split into an array
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(',');
  }

  //social
  profileFields.social = {};
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      //if profile exists => update profile
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        //create profile
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = 'that handle already exists';
            return res.status(400).json(errors);
          }
          //if handle is unique + valid inputs => create and save profile
          new Profile(profileFields).save().then((profile) => res.json(profile));
        });
      }
    })
    .catch((err) => res.status(400).json(err));
};

//get current user profile
exports.CurrentProfile = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar', 'role'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'there is no profile for this user';
        return res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch((err) => res.status(400).json(err));
};

//get all profiles
exports.GetAllProfiles = (req, res) => {
  let errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar', 'role'])
    .then((profiles) => {
      if (!profiles) {
        errors.noProfiles = 'there are no profiles';
        return res.status(404).json(errors);
      }
      res.status(200).json(profiles);
    })
    .catch((err) => res.status(400).json({ profile: 'there are no profiles' }));
};

//get user profile by handle
exports.GetProfileByHandle = (req, res) => {
  let errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['_id', 'name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'there is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) =>
      res.status(400).json({ profile: 'there is no profile for this user' })
    );
};

//get user profile by _id
exports.GetProfileById = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['_id','name', 'avatar'])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = 'there is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) =>
      res.status(400).json({ profile: 'there is no profile for this user' })
    );
};

// add experience to profile
exports.CreateExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  //check input validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then((profile) => {
    //--> create new experience
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    //--> add to experience array
    profile.experience.unshift(newExp);
    //save profile
    profile.save().then((profile) => res.json(profile));
  });
};

// add education to profile
exports.CreateEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  //check input validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then((profile) => {
    //--> create new education
    const newEducation = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    //--> add to education array
    profile.education.unshift(newEducation);
    //save profile
    profile.save().then((profile) => res.json(profile));
  });
};

//delete experience from profile
exports.DeleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      //get remove index
      const removeIndex = profile.experience
        .map((exp) => exp.id)
        .indexOf(req.params.exp_id);

      //splice out of array
      profile.experience.splice(removeIndex, 1);
      //save profile
      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(400).json(err));
};

//delete education from profile
exports.DeleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      //get remove index
      const removeIndex = profile.education
        .map((edu) => edu.id)
        .indexOf(req.params.edu_id);

      //splice out of array
      profile.education.splice(removeIndex, 1);
      //save profile
      profile.save().then((profile) => res.json(profile));
    })
    .catch((err) => res.status(400).json(err));
};

//delete profile and user
exports.DeleteProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  });
};
