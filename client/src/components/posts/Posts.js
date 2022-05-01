import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllPosts } from '../../redux/actions/postActions';
import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';
import PostForm from './PostForm';

function Posts() {
  const dispatch = useDispatch();

  //loading posts
  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);

  const { posts, loading } = useSelector((state) => state.post);

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {posts === null || loading ? <Spinner /> : <PostFeed posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
