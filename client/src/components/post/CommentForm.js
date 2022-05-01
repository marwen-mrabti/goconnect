import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment } from '../../redux/actions/postActions';
import isEmpty from '../../utils/isEmpty';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function CommentForm({ postId }) {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const { user } = useSelector((state) => state.auth);
  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    dispatch(AddComment(postId, newComment));
  };

  // errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
    isEmpty(errs.text) && setText('');
  }, [errs]);

  return (
    <div className="post-form mb-4">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment</div>
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="reply to post"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              comment
            </button>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CommentForm;
