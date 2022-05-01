import axios from 'axios';
import { message } from 'antd';

//add post
export const AddPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({ type: 'ADD_POST', payload: res.data });
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('post was added successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//get all posts
export const GetAllPosts = () => async (dispatch) => {
  dispatch({ type: 'POST_LOADING' });
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: 'GET_POSTS', payload: res.data });
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_POSTS',
      payload: null,
    });
  }
};

//get post by id
export const GetPost = (id) => async (dispatch) => {
  dispatch({ type: 'POST_LOADING' });
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({ type: 'GET_POST', payload: res.data });
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_POST',
      payload: null,
    });
  }
};

//delete post
export const DeletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({ type: 'DELETE_POST', payload: id });
    message.success('post has been deleted successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//like post
export const LikePost = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${id}`);
    dispatch(GetAllPosts());
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//unlike post
export const UnlikePost = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${id}`);
    dispatch(GetAllPosts());
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//add comment to a post
export const AddComment = (post_id, commentData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${post_id}`, commentData);
    dispatch({ type: 'GET_POST', payload: res.data });
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('comment was added successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};

//delete comment
export const DeleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({ type: 'GET_POST', payload: res.data });
    dispatch({ type: 'CLEAR_ERRORS', payload: {} });
    message.success('comment has been deleted successfully');
  } catch (error) {
    message.error('something went wrong');
    dispatch({
      type: 'GET_ERRORS',
      payload: error.response.data,
    });
  }
};
