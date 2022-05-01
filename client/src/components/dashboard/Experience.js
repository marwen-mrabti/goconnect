import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { DeleteExperience } from '../../redux/actions/profileActions';

function Experience({ experiences }) {
  const dispatch = useDispatch();

  const handleOnDelete = (id) => {
    dispatch(DeleteExperience(id));
  };

  return (
    <div className="experience text-black">
      <h4 className="mb-3 text-success">Experience credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>company</th>
            <th>title</th>
            <th>years</th>
            <th></th>
          </tr>
          {experiences.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleOnDelete(exp._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}

export default Experience;
