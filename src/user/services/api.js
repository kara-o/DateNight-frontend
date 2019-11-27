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

const createRequest = (
  requestData,
  userId,
  token,
  cuisines,
  neighborhoods,
  prices
) => {
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    method: 'POST',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      request: {
        date: requestData.date,
        start_time: requestData.start_time,
        end_time: requestData.end_time,
        size: requestData.size,
        user_id: userId,
        cuisines_requests_attributes: cuisines,
        neighborhoods_requests_attributes: neighborhoods,
        prices_requests_attributes: prices
      }
    })
  }).then(res => res.json());
};

const fetchOptions = (type, token) => {
  return fetch(`${API_ROOT}/${type}/`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

const fetchRequests = (userId, token) => {
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

const fetchRequest = (token, userId, requestId) => {
  return fetch(`${API_ROOT}/users/${userId}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

export const api = {
  createUser,
  login,
  createRequest,
  fetchOptions,
  fetchRequests,
  fetchRequest
};
