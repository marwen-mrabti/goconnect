import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//actions

//components
import Spinner from '../common/Spinner';
import Moment from 'react-moment';
import { GetAllPosts } from '../../redux/actions/postActions';
import { AdminDeletePost } from '../../redux/actions/authActions';

function AdminPostHandler() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllPosts());
  }, [dispatch]);

  const handleOnDelete = (id) => {
    dispatch(AdminDeletePost(id));
    dispatch(GetAllPosts());
  };
  const { posts, loading } = useSelector((state) => state.post);

  return (
    <div className="admin text-black">
      <Link to="/admin" className="text-warning">
        go back
      </Link>
      {posts === null || loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <h3>no Posts</h3>
      ) : (
        <table className="table">
          <thead>
            <tr className="text-center text-success">
              <th>user</th>
              <th>post-body</th>
              <th>date</th>
              <th></th>
            </tr>
            {posts.map((post) => (
              <tr key={post._id} className="text-center text-light">
                <td>
                  <img
                    src={post.avatar}
                    alt={post.name}
                    className="rounded-circle"
                    style={{ width: '50px' }}
                  />
                </td>
                <td>{post.text}</td>
                <td>
                  <Moment format="YYYY/MM/DD">{post.date}</Moment>
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOnDelete(post._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      )}
    </div>
  );
}

export default AdminPostHandler;
