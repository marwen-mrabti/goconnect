import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

function ProfileCard({ profile }) {
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
         <img
            src={profile?.user?.avatar}
            alt={profile?.handle}
            className="rounded-circle"
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile?.user?.name} </h3>
          <p className="text-black">
            {profile?.status}{' '}
            {isEmpty(profile?.company) ? null : <span> at {profile?.company}</span>}
          </p>
          <Link to={`/profile/${profile?.handle}`} className="btn btn-info">
            view profile
          </Link>
        </div>
        <div className="col-md-4  d-md-block">
          <h4>skill set</h4>
          <ul className="list-group">
            {profile?.skills?.slice(0, 4)?.map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-2 text-primary" />
                <span className='p-2'>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
