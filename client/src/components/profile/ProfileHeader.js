import React from 'react';
import isEmpty from '../../utils/isEmpty';

function ProfileHeader({ userProfile }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={userProfile.user.avatar}
                alt={userProfile.user.name}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center"> {userProfile.user.name} </h1>
            <p className="lead text-center">
              {userProfile.status}
              {isEmpty(userProfile.company) ? null : (
                <span> at {userProfile.company}</span>
              )}
            </p>

            {isEmpty(userProfile.location) ? null : <p> at {userProfile.location}</p>}

            <p>
              {isEmpty(userProfile.website) ? null : (
                <a className="text-white p-2" href={userProfile.website} target="blank">
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}
              {isEmpty(userProfile.githubUsername) ? null : (
                <a
                  className="text-white p-2"
                  href={`https://github.com/${userProfile.githubUsername}`}
                  target="blank"
                >
                  <i className="fab fa-github fa-2x"></i>
                </a>
              )}
              {isEmpty(userProfile.social && userProfile.social.twitter) ? null : (
                <a
                  className="text-white p-2"
                  href={userProfile.social.twitter}
                  target="blank"
                >
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}

              {isEmpty(userProfile.social && userProfile.social.facebook) ? null : (
                <a
                  className="text-white p-2"
                  href={userProfile.social.facebook}
                  target="blank"
                >
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

              {isEmpty(userProfile.social && userProfile.social.linkedin) ? null : (
                <a
                  className="text-white p-2"
                  href={userProfile.social.linkedin}
                  target="blank"
                >
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}

              {isEmpty(userProfile.social && userProfile.social.youtube) ? null : (
                <a
                  className="text-white p-2"
                  href={userProfile.social.youtube}
                  target="blank"
                >
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
