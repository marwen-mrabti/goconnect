import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//actions
import { GetAllProfiles } from '../../redux/actions/profileActions';
import { DeleteUser } from '../../redux/actions/authActions';

//components
import Spinner from '../common/Spinner';

function AdminUserHandler() {
  const dispatch = useDispatch();
  const [profilesList, setProfilesList] = useState([]);

  useEffect(() => {
    dispatch(GetAllProfiles());
  }, [dispatch]);
  const { profiles, loading } = useSelector((state) => state.profile);

  const handleOnDelete = (user_id, profile_id) => {
    dispatch(DeleteUser(user_id, profile_id));
    dispatch(GetAllProfiles());
  };

  useEffect(() => {
    if (profiles === null || loading) {
      setProfilesList([]);
    } else {
      setProfilesList(profiles);
    }
  }, [profiles, loading]);

  return (
    <div className="admin text-black">
      <Link to="/admin" className="text-warning">
        go back
      </Link>
      {profiles === null || loading ? (
        <Spinner />
      ) : profilesList.length <= 1 ? (
        <h3>no users</h3>
      ) : (
        <table className="table">
          <thead>
            <tr className="text-center text-success">
              <th></th>
              <th>user</th>
              <th>status</th>
              <th>company</th>
              <th></th>
            </tr>
            {profilesList.map((profile) => {
              return (
                profile.user.role !== 'ADMIN' && (
                  <tr key={profile._id} className="text-center text-light">
                    <td>
                      <img
                        src={profile.user.avatar}
                        alt={profile.handle}
                        className="rounded-circle"
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{profile.user.name}</td>
                    <td>{profile.status}</td>
                    <td>{profile.company ? profile.company : 'freelancer'}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleOnDelete(profile.user._id, profile._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </thead>
        </table>
      )}
    </div>
  );
}

export default AdminUserHandler;
