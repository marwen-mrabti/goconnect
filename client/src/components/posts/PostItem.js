import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeletePost, LikePost, UnlikePost } from '../../redux/actions/postActions';

function PostItem({ post, showActions }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //handlers
  const handleOnDelete = (id) => {
    dispatch(DeletePost(id));
  };

  const handleOnLike = (id) => {
    dispatch(LikePost(id));
  };

  const handleOnUnlike = (id) => {
    dispatch(UnlikePost(id));
  };

  return (
    <div className="card card-body border-end-0 mb-2">
      <div className="row">
        <div className="col-md-3">
          <Link to={`/profile`}>
            <img
              src={post.avatar}
              alt={post.name}
              className="rounded-circle d-md-block"
              style={{ width: '4rem' }}
            />
            <p className="text-black mt-1 mx-2">{post.name} </p>
          </Link>
        </div>
        <div className="col-md-9">
          <p className="lead text-black">{post.text}</p>
          {showActions && (
            <span>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={() => handleOnLike(post._id)}
              >
                <i
                  className={`${
                    !(post.likes.filter((like) => like.user === user.id).length > 0)
                      ? 'text-secondary'
                      : 'text-info'
                  } fas fa-thumbs-up`}
                />
              </button>

              <span className="badge badge-dark text-black-50">{post.likes.length} </span>
              <button
                type="button"
                className="btn btn-light me-1"
                onClick={() => handleOnUnlike(post._id)}
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>

              <Link to={`/post/${post._id}`} className="btn btn-info me-2">
                Comments
                <i className="fas fa-arrow-right ms-2 text-success" />
              </Link>

              {post.user === user.id && (
                <button
                  type="button"
                  className="btn btn-danger mr-1"
                  onClick={() => handleOnDelete(post._id)}
                >
                  <i className="fas fa-trash" />
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
PostItem.defaultProps = {
  showActions: true,
};
export default PostItem;
