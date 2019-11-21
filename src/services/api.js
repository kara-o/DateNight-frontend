const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const createUser = userData => {
  return fetch(`${API_ROOT}/users/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ user: userData })
  }).then(res => res.json());
};

const getUsers = () => {
  return fetch(`${API_ROOT}/users/`).then(res => res.json());
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

const login = userData => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user: userData
    })
  }).then(res => res.json());
};

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  users: {
    createUser,
    getUsers
  }
};