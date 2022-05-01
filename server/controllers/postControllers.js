//load models
const Post = require('../models/Post');
const Profile = require('../models/Profile');

//load validation
const validatePostInput = require('../validation/post');

//create post
exports.CreatePost = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //--> create new post
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });
  //-->save new post
  newPost
    .save()
    .then((post) => res.json(post))
    .catch((err) => res.status(500).json(errors));
};

//get all posts
exports.GetAllPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ noPostsFound: 'no posts found' }));
};

//get post by id
exports.GetPostById = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
};

//delete post
exports.DeletePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: 'user not authorized' });
        }
        //if user check => delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
  });
};

//like Post
exports.LikePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check if the user already liked the post
        const isLiked = post.likes.filter((like) => like.user.toString() === req.user.id);
        if (isLiked.length > 0) {
          return res.status(400).json({ alreadyLiked: 'user already liked this post' });
        }
        //else add user id to likes array
        post.likes.unshift({ user: req.user.id });
        //save to database
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
  });
};

//Unlike Post
exports.UnlikePost = (req, res) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check if the user already liked the post
        const isLiked = post.likes.filter((like) => like.user.toString() === req.user.id);
        if (isLiked.length === 0) {
          return res
            .status(400)
            .json({ alreadyUnlike: 'user already unliked this post' });
        }

        //get the remove index
        const removeIndex = post.likes
          .map((like) => like.user.toString())
          .indexOf(req.user.id);
        //remove user id from likes array
        post.likes.splice(removeIndex, 1);
        //save to database
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
  });
};

//add comment to post
exports.AddComment = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then((post) => {
      //create new comment
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };

      //add to comments array
      post.comments.unshift(newComment);
      //save to database
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
};

//delete comment
exports.DeleteComment = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      //check if comment exist
      const isComment = post.comments.filter(
        (comment) => comment._id.toString() === req.params.comment_id
      );
      if (isComment.length === 0) {
        return res.status(404).json({ noComment: 'comment does not exist' });
      }

      //get the remove index
      const removeIndex = post.comments
        .map((comment) => comment._id.toString)
        .indexOf(req.params.comment_id);
      //remove comment from comments array
      post.comments.splice(removeIndex, 1);
      //save to database
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ noPostFound: 'no post found for this id' }));
};
