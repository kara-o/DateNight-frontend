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
  console.log(requestData);
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      request: { ...requestData, user_id: userId }
    })
  }).then(res => res.json());
};

const fetchOptions = (type, token) => {
  return fetch(`${API_ROOT}/${type}/`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

const createSelection = (requestId, optionId, optionType, token) => {
  return (
    fetch(`${API_ROOT}/users/${requestId}/${optionType}s_requests`),
    {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        request_id: requestId,
        [`${optionType}_id`]: optionId
      })
    }.then(res => res.json())
  );
};

export const api = {
  createUser,
  login,
  createRequest,
  createSelection,
  fetchOptions
};
