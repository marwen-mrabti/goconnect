const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({});

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;
