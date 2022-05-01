import React from 'react';
import PostItem from './PostItem';

function PostFeed({ posts }) {
  return (
    <div className="post-feed mb-5">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      <br />
    </div>
  );
}

export default PostFeed;
