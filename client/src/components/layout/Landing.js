import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//router
import { Link, useNavigate } from 'react-router-dom';

function Landing() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Guild Connector</h1>
              <p className="lead">
                Join the Guild, share posts and get help from other members
              </p>
              <hr />
              <div className=" mb-2 mr-2">
                <Link to="/register" className="btn signup-btn btn-lg btn-info mr-4">
                  Sign Up
                </Link>
              </div>
              <div className="ml-2">
                <Link to="/login" className="btn login-btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
