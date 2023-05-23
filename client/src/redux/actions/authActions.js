import axios from 'axios';
import { message } from 'antd';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//authAction => register user
export const userRegister = (userData, navigate) => async (dispatch) => {
  try {
    await axios.post('https://goconnect-v02.onrender.com/api/users/register', userData);
    message.success('you are registered');
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 500);
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//authAction => login --> get user token
export const userLogin = (userData, navigate) => async (dispatch) => {
  try {
    //post user data to the api
    const res = await axios.post('https://goconnect-v02.onrender.com/api/users/login', userData);
    const { token } = res.data;
    //save the token to local storage
    localStorage.setItem('jwtToken', token);
    //set token to auth header
    setAuthToken(token);
    //decode token to get user data
    const decoded = jwt_decode(token);
    //dispatch action
    dispatch({ type: 'SET_CURRENT_USER', payload: decoded });
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('you are logged in');
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 500);
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded,
  };
};

//user logout
export const userLogout = (navigate) => async (dispatch) => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');
  //remove auth header from future request
  setAuthToken(false);

  //redirect to login
  message.warning('you are logged-out');
  setTimeout(() => {
    navigate('/login', { replace: true });
  }, 500);
  //set user to {} ==> isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//admin ==> delete user
export const DeleteUser = (user_id, profile_id) => async (dispatch) => {
  try {
    if (window.confirm('are you sure? this can not be undone!!')) {
      await axios.delete(`https://goconnect-v02.onrender.com/api/users/admin/delete_user/${user_id}/${profile_id}`);
      message.success('user has been deleted successfully');
    }
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//admin ==> delete user
export const AdminDeletePost = (post_id) => async (dispatch) => {
  try {
    if (window.confirm('are you sure? this can not be undone!!')) {
      await axios.delete(`https://goconnect-v02.onrender.com/api/users/admin/delete_post/${post_id}`);
      message.success('post has been deleted successfully');
    }
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};
