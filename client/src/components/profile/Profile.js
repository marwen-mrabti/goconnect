import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetProfileByHandler } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';

function Profile() {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  let { profile_handle } = useParams();

  useEffect(() => {
    dispatch(GetProfileByHandler(profile_handle));
  }, [dispatch, profile_handle]);

  const { profile, loading } = useSelector((state) => state.profile);
  useEffect(() => {
    if (profile === null || loading) {
      setUserProfile({});
    } else {
      setUserProfile(profile);
    }
  }, [profile, loading]);

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {profile === null || loading ? (
              <Spinner />
            ) : (
              Object.keys(userProfile).length && (
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <Link to="/profiles" className="btn btn-light mt-2 mb-3">
                        <i className="fas fa-arrow-left text-info mr-2" />
                        go back
                      </Link>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                  <ProfileHeader userProfile={userProfile} />
                  <ProfileAbout userProfile={userProfile} />
                  <ProfileCreds
                    experience={userProfile.experience}
                    education={userProfile.education}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Profile;
