import React from 'react';
import Moment from 'react-moment';

function ProfileCreds({ experience, education }) {
  return (
    <div className="row">
      {experience.length > 0 && (
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experience.map((exp, index) => (
              <li key={index} className="list-group-item text-black">
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                  {exp.to === null ? (
                    ' Now'
                  ) : (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  )}
                </p>
                <p className="text-black">
                  <strong>Position:</strong> {exp.title}
                </p>
                <p className="text-black">
                  {exp.location === '' ? null : (
                    <span>
                      <strong>location:</strong> {exp.location}
                    </span>
                  )}
                </p>
                <p>
                  {exp.description === '' ? null : (
                    <span>
                      <strong>Description:</strong> {exp.description}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {education.length > 0 && (
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {education.map((edc, index) => (
              <li key={index} className="list-group-item">
                <h4>{edc.school}</h4>
                <p>
                  <Moment format="YYYY/MM/DD">{edc.from}</Moment> -{' '}
                  {edc.to === null ? (
                    ' Now'
                  ) : (
                    <Moment format="YYYY/MM/DD">{edc.to}</Moment>
                  )}
                </p>

                <p>
                  <strong>Degree: </strong>
                  {edc.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edc.fieldOfStudy}
                </p>
                <p>
                  {edc.description === '' ? null : (
                    <span>
                      <strong>Description:</strong> {edc.description}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileCreds;
