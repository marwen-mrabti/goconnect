const express = require('express')
const passport = require('passport')

const PostRouter = express.Router()

//load callback functions

//@route => req:post => /api/profile
//@desc => create or edit user profile
//access => private


//export post router
module.exports=PostRouter