import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPost } from '../../redux/actions/postActions';
import isEmpty from '../../utils/isEmpty';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

function PostForm() {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});

  const { user } = useSelector((state) => state.auth);
  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar,
    };
    dispatch(AddPost(newPost));
  };

  // errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
    isEmpty(errs.text) && setText('');
  }, [errs]);

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          📃...share an idea or ask a question...📃
        </div>
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              share
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
