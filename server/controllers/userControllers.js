const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



let secretOrKey = process.env.SECRET_OR_KEY;

//load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//user register
exports.userRegister = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'email already exists';
      res.status(400).json(errors);
    } else {
      // grab the avatar from email account
      const avatar = gravatar.url(req.body.email, {
        s: 200, //size
        d: 'mm', //default avatar
      });

      //user role
      req.body.role = 'USER';
      //create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        avatar,
      });

      //hash the password before saving
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //save newUser to db
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

//user login
exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find user by email
  User.findOne({ email }).then((user) => {
    // check if user doesn't exist
    if (!user) {
      errors.email = 'user not found';
      return res.status(404).json(errors);
    }
    //if user exist => check the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //user Matched
        //create jwt payload
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        };
        //sign token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'password incorrect';
        res.status(400).json(errors);
      }
    });
  });
};

//get current user after authentication
exports.CurrentUser = (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};

// admin access => delete user
exports.AdminDeleteUser = (req, res) => {
  Profile.findOneAndRemove({ _id: String(req.params.profile_id) }).then(() => {
    User.findOneAndRemove({ _id: String(req.params.user_id) }).then(() => {
      res.json({ success: true });
    });
  });
};

// admin access => delete post
exports.AdminDeletePost = (req, res) => {
  Post.findOneAndRemove({ _id: String(req.params.post_id) }).then(() => {
    res.json({ success: true });
  });
};
