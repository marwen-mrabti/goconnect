import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//auth
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

//actions
import { setCurrentUser, userLogout } from './redux/actions/authActions';
import { ClearCurrentProfile } from './redux/actions/profileActions';

//components ==> utilities
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

//components ==> layout
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Profiles from './components/profiles/Profiles';

//components ==> authentication
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//admin
import Admin from './components/admin/Admin';
import AdminUserHandler from './components/admin/AdminUserHandler';

//components ==> dashboard
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddEducation from './components/profile/AddEducation';
import AddExperience from './components/profile/AddExperience';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import AdminPostHandler from './components/admin/AdminPostHandler';

function App() {
  const dispatch = useDispatch();

  //check for token
  useEffect(() => {
    if (localStorage.jwtToken) {
      //set auth token header auth
      setAuthToken(localStorage.jwtToken);
      //decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      //set user and isAuthenticated
      dispatch(setCurrentUser(decoded));

      //check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //logout user
        dispatch(userLogout());
        //clear profile
        dispatch(ClearCurrentProfile());
      }
    }
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profiles" element={<Profiles />} />
          <Route exact path={`/profile/:profile_handle`} element={<Profile />} />

          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add-experience"
            element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add-education"
            element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/feed"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/post/:post_id"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/admin/users-handler"
            element={
              <AdminRoute>
                <AdminUserHandler />
              </AdminRoute>
            }
          />
          <Route
            exact
            path="/admin/posts-handler"
            element={
              <AdminRoute>
                <AdminPostHandler />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
