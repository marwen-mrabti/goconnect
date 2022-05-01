import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//actions
import { DeleteAccount, GetCurrentProfile } from '../../redux/actions/profileActions';

//components
import Spinner from '../common/Spinner';
import Education from './Education';
import Experience from './Experience';
import ProfileAddOns from './ProfileAddOns';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCurrentProfile());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  //handlers
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(DeleteAccount());
  };

  //dashboard content ==>
  let dashboardContent;
  //check if user have profile data
  if (profile && Object.keys(profile).length > 0) {
    dashboardContent = (
      <div>
        <p className="lead text-muted">
          welcome to the Guild <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
        </p>
        <ProfileAddOns />
        {profile.experience.length && <Experience experiences={profile.experience} />}
        {profile.education.length && <Education education={profile.education} />}

        <div className="mb-5">
          <button className="btn btn-danger" onClick={onDelete}>
            delete my account
          </button>
        </div>
        <br />
      </div>
    );
  } else {
    //logged in user that doesn't have a profile
    dashboardContent = (
      <div>
        <p className="lead text-muted">welcome to the Guild {user.name}</p>
        <p style={{ color: 'black' }}>
          you haven't yet setup a profile, please add some info
        </p>
        <Link to="/create-profile" className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {!profile || loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
