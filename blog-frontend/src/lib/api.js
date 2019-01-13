import axios from 'axios';
import queryString from 'query-string';

// const apiUrl = 'http://localhost:3000';
const apiUrl = 'http://localhost:4000';

// DEV
// export const getPostList = ({ tag, page }) => axios.get(`${apiUrl}/api/posts/get.json?${queryString.stringify({ tag, page })}`);
// export const getPost = id => axios.get(`${apiUrl}/api/posts/${id}.json`);
// export const writePost = ({ title, body, tags }) => axios.get(`${apiUrl}/api/posts/post.json`, { title, body, tags });

// PROD
export const getPostList = ({ tag, page }) =>
  axios.get(`${apiUrl}/api/posts/?${queryString.stringify({ tag, page })}`);
export const getPost = id => axios.get(`${apiUrl}/api/posts/${id}`);
export const writePost = ({ title, body, tags }) =>
  axios.post(`${apiUrl}/api/posts`, { title, body, tags });
export const editPost = ({ id, title, body, tags }) =>
  axios.patch(`${apiUrl}/api/posts/${id}`, { title, body, tags });
export const removePost = id => axios.delete(`${apiUrl}/api/posts/${id}`);

export const login = password =>
  axios.post(`${apiUrl}/api/auth/login`, { password });
export const checkLogin = () => axios.get(`${apiUrl}/api/auth/check`);
export const logout = () => axios.post(`${apiUrl}/api/auth/logout`);
