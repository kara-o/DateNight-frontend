const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export const createUser = userData => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userData)
  }).then(res => res.json());
};

export const login = userData => {
  return fetch(`${API_ROOT}/auth/sign_in`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(userData)
  });
};

export const logout = userData => {
  return fetch(`${API_ROOT}/auth/sign_out`, {
    method: 'DELETE',
    headers: {
      ...headers,
      ['access-token']: userData.accessToken,
      uid: userData.uid,
      client: userData.client
    }
  });
};

export const createRequest = (
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

export const fetchOptions = (type, token) => {
  return fetch(`${API_ROOT}/${type}/`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

export const fetchRequests = (userId, token) => {
  return fetch(`${API_ROOT}/users/${userId}/requests`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};

export const fetchRequest = (token, userId, requestId) => {
  return fetch(`${API_ROOT}/users/${userId}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};
