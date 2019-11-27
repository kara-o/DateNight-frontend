const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const fetchRequests = token => {
  return fetch(`${API_ROOT}/requests`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};
