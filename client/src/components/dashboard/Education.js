import React from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { DeleteEducation } from '../../redux/actions/profileActions';

function Education({ education }) {
  const dispatch = useDispatch();

  const handleOnDelete = (id) => {
    dispatch(DeleteEducation(id));
  };

  return (
    <div className="education text-black mt-4">
      <h4 className="mb-3 text-success">Education credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>school</th>
            <th>degree</th>
            <th>years</th>
            <th></th>
          </tr>
          {education.map((edc) => (
            <tr key={edc._id}>
              <td>{edc.school}</td>
              <td>{edc.degree}</td>
              <td>
                <Moment format="YYYY/MM/DD">{edc.from}</Moment> -{' '}
                {edc.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{edc.to}</Moment>}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleOnDelete(edc._id)}
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

export default Education;
