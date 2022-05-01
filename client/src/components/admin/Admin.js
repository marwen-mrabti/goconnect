import React from 'react';

import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="admin">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center text-primary mb-4">welcome Admin</h3>
            <div className="btn-group d-center mt-5 mb-4" role="group">
              <Link to="/admin/users-handler" className="btn btn-light p-3">
                <i className="fas fa-user-circle text-info mr-2"></i> users handler
              </Link>
              <Link to="/admin/posts-handler" className="btn btn-light p-3">
                <i className="fas fa-file text-info mr-2"></i>
                posts handler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
