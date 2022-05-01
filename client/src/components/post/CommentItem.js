import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteComment } from '../../redux/actions/postActions';

function CommentItem({ comment, postId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //handlers
  const handleOnDelete = (postId, commentId) => {
    dispatch(DeleteComment(postId, commentId));
  };

  return (
    <div className="card card-body mb-4">
      <div className="row">
        <div className="col-md-2">
          <img
            className="rounded-circle d-md-block"
            style={{ width: '5rem' }}
            src={comment.avatar}
            alt={comment.name}
          />

          <br />
          <p className="text-secondary mx-2"> {comment.name} </p>
        </div>
        <div className="col-md-10">
          <p className="lead text-black">{comment.text}</p>
          {comment.user === user.id && (
            <button
              type="button"
              className="btn btn-danger mr-1"
              onClick={() => handleOnDelete(postId, comment._id)}
            >
              <i className="fas fa-trash" />
            </button>
          )}
        </div>
      </div>
      <br />
    </div>
  );
}

export default CommentItem;
