const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const createUser = userData => {
  return fetch(`${API_ROOT}/users/`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userData)
  }).then(res => res.json());
};

const getUsers = () => {
  return fetch(`${API_ROOT}/users/`).then(res => res.json());
};

export const api = {
  users: {
    createUser,
    getUsers
  }
};
