import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPasword2] = useState('');
  const [errors, setErrors] = useState({});

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2,
    };

    dispatch(userRegister(newUser, navigate));
  };

  //errors handling
  const { errs } = useSelector((state) => state.errors);
  useEffect(() => {
    setErrors(errs);
  }, [errs]);

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-5 text-center text-primary">Sign Up</h1>
            <p className="lead text-center">Create your GOConnect account</p>
            <form noValidate onSubmit={handleOnSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
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
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={(e) => setPasword2(e.target.value)}
                error={errors.password2}
              />
              <input
                type="submit"
                className="btn btn-info btn-block mt-1"
                onSubmit={handleOnSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
