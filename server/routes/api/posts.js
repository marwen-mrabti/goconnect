const express = require('express');
const passport = require('passport');

const PostRouter = express.Router();

//load callback functions
const {
  CreatePost,
  GetAllPosts,
  GetPostById,
  DeletePost,
  LikePost,
  UnlikePost,
  AddComment,
  DeleteComment,
} = require('../../controllers/postControllers');

//@route => req:post => /api/posts
//@desc => create post
//access => private
PostRouter.post('/', passport.authenticate('jwt', { session: false }), CreatePost);

//@route => req:get => /api/posts
//@desc => get all posts
//access => public
PostRouter.get('/', GetAllPosts);

//@route => req:get => /api/posts/:id
//@desc => get post by id
//access => public
PostRouter.get('/:id', GetPostById);

//@route => req:delete => /api/posts/:id
//@desc => delete post
//access => private
PostRouter.delete('/:id', passport.authenticate('jwt', { session: false }), DeletePost);

//@route => req:post => /api/posts/like/:id
//@desc => like post
//access => private
PostRouter.post('/like/:id', passport.authenticate('jwt', { session: false }), LikePost);

//@route => req:post => /api/posts/unlike/:id
//@desc => unlike post
//access => private
PostRouter.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  UnlikePost
);

//@route => req:post => /api/posts/comment/:id
//@desc => add comment to post
//access => private
PostRouter.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  AddComment
);

//@route => req:delete => /api/posts/comment/:id/:comment_id
//@desc => delete comment
//access => private
PostRouter.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  DeleteComment
);

//export post router
module.exports = PostRouter;
