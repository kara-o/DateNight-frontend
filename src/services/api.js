const API_ROOT = `http://localhost:3000/api/v1`;

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

const login = userData => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user: userData
    })
  }).then(res => res.json());
};

const createRequest = (requestData, userId, token) => {
  console.log('here in createRequest!');
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      request: requestData
    })
  }).then(res => res.json());
};

export const api = { createUser, login, createRequest };
