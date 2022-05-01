import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//router
import { Link, useNavigate } from 'react-router-dom';

//actions
import { userLogout } from '../../redux/actions/authActions';
import { ClearCurrentProfile } from '../../redux/actions/profileActions';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  //handlers
  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout(navigate));
    dispatch(ClearCurrentProfile());
  };

  //nav links
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          post feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          dashboard
        </Link>
      </li>

      <li className="nav-item">
        <a href="#/" className="nav-link" onClick={handleOnLogout}>
          <img
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
            src={user.avatar}
            alt={user.name}
            title="you must have a gravatar connected to your email to display your image"
          />
          logout
        </a>
      </li>
    </ul>
  );

  const adminLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          posts feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin" className="nav-link">
          admin
        </Link>
      </li>
      <li className="nav-item">
        <a href="#/" className="nav-link" onClick={handleOnLogout}>
          <img
            className="rounded-circle"
            style={{ width: '25px', marginRight: '5px' }}
            src={user.avatar}
            alt={user.name}
            title="you must have a gravatar connected to your email to display your image"
          />
          logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-0">
      <div className="container">
        <div className="logo-wrapper">
          <Link className="navbar-brand" to="/feed">
            <h3 className="logo">GOConnect</h3>
          </Link>
        </div>
        <button
          className="navbar-toggler mx-4"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="nav-elements collapse navbar-collapse mx-4" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Guild members
              </Link>
            </li>
          </ul>
          {!isAuthenticated && guestLinks}
          {isAuthenticated && user.role === 'USER' && authLinks}
          {isAuthenticated && user.role === 'ADMIN' && adminLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
