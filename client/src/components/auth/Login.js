import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(userLogin(user, navigate));
  };

  //errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
  }, [errs]);

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center text-primary">Log In</h1>
            <p className="lead text-center">Sign in to your GoConnect account</p>
            <form onSubmit={handleOnSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                onSubmit={handleOnSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
