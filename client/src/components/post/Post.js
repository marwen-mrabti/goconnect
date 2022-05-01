import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetPost } from '../../redux/actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentFeed from './CommentFeed';
import CommentForm from './CommentForm';

function Post() {
  const dispatch = useDispatch();
  let { post_id } = useParams();

  const [commentPost, setCommentPost] = useState(false);

  useEffect(() => {
    dispatch(GetPost(post_id));
  }, [dispatch, post_id]);
  const { post, loading } = useSelector((state) => state.post);

  //post content
  let postContent;
  if (post === null || loading || Object.keys(post) === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <div className="mb-2 ">
          <button
            className="btn btn-info btn-sm float-end "
            onClick={() => setCommentPost((prev) => !prev)}
          >
            add comment
          </button>
        </div>
        <PostItem post={post} showActions={false} />

        {commentPost && <CommentForm postId={post_id} />}
        {post.comments && <CommentFeed postId={post_id} comments={post.comments} />}
      </div>
    );
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light btn-sm mt-1 mb-3">
              <i className="fas fa-arrow-left text-info mr-2" />
              back to post feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
