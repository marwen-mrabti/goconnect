import axios from 'axios';
import { message } from 'antd';

//create profile
export const CreateUserProfile = (profileData, navigate) => async (dispatch) => {
  try {
    await axios.post('api/profile', profileData);
    message.success('profile was added successfully');
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

//get all profiles
export const GetAllProfiles = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_LOADING' });
  try {
    const res = await axios.get('/api/profile/all');
    dispatch({ type: 'GET_PROFILES', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILES',
      payload: null,
    });
  }
};

//get profile
export const GetCurrentProfile = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_LOADING' });

  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: 'GET_PROFILE', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILE',
      payload: {},
    });
  }
};

//get profile by handler
export const GetProfileByHandler = (handle) => async (dispatch) => {
  dispatch({ type: 'PROFILE_LOADING' });

  try {
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({ type: 'GET_PROFILE', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'GET_PROFILE',
      payload: {},
    });
  }
};

// clear profile in logout
export const ClearCurrentProfile = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CURRENT_PROFILE' });
};



//add experience
export const AddUserExperience = (expData, navigate) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', expData);
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('experience has been added successfully');
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

//delete experience
export const DeleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/:${exp_id}`);
    dispatch({ type: 'GET_PROFILE', payload: res.data });
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('experience has been deleted successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//add education
export const AddUserEducation = (edcData, navigate) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', edcData);
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('education has been added successfully');
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

//delete education
export const DeleteEducation = (edc_id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/:${edc_id}`);
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    dispatch({ type: 'GET_PROFILE', payload: res.data });
    message.success('education has been deleted successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//delete profile
export const DeleteAccount = () => async (dispatch) => {
  try {
    if (window.confirm('are you sure? this can not be undone!!')) {
      await axios.delete('/api/profile');
      dispatch({ type: 'SET_CURRENT_USER', payload: {} });
    }
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};
