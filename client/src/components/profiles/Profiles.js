import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProfiles } from '../../redux/actions/profileActions';

//components
import Spinner from '../common/Spinner';
import ProfileCard from './ProfileCard';

function Profiles() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProfiles());
  }, [dispatch]);
  
  const { profiles, loading } = useSelector((state) => state.profile);

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5">
            <h1 className="display-4 text-center text-primary">Guild members</h1>
            <p className="lead text-center">Browse and connect with a guild members</p>
            {profiles === null || loading ? (
              <Spinner />
            ) : !profiles.length ? (
              <h3>no profiles</h3>
            ) : (
              profiles.map((profile) => (
               !profile.handle ?null: <ProfileCard key={profile.handle} profile={profile} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
