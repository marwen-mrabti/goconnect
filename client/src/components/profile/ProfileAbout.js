import React from 'react';
import isEmpty from '../../utils/isEmpty';

function ProfileAbout({ userProfile }) {

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{userProfile.user.name}'s Bio</h3>
          <p className="lead text-center text-black">
            {isEmpty(userProfile.bio) ? (
              <span>{userProfile.user.name} doesn't have a bio </span>
            ) : (
              <span> {userProfile.bio}</span>
            )}
          </p>
          <hr className="text-black" />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center ">
              {userProfile.skills.map((skill, index) => (
                <div key={index} className="text-black p-3">
                  <i className="fa fa-check" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAbout;
