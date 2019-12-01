const API_ROOT = 'http://localhost:3000/api/v1';
const AUTH_ROOT = 'http://localhost:3000/auth';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const tokenHeaders = userData => {
  return {
    ['access-token']: userData.accessToken,
    ['token-type']: 'Bearer',
    client: userData.client,
    expiry: userData.expiry,
    uid: userData.uid
  };
};

export const createUser = userData => {
  return fetch(AUTH_ROOT, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(userData)
  }).then(res => res.json());
};

export const login = userData => {
  return fetch(`${AUTH_ROOT}/sign_in`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(userData)
  });
};

export const logout = userData => {
  const headers = tokenHeaders(userData);
  return fetch(`${AUTH_ROOT}/sign_out`, {
    method: 'DELETE',
    headers: {
      ...jsonHeaders,
      ...headers
    }
  });
};

export const createRequest = (formData, userData) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/users/${userData.user.id}/requests`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      ...formData,
      user_id: userData.user.id
    })
  }).then(res => res.json());
};

export const fetchOptions = (type, userData) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/${type}/`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequests = userData => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/users/${userData.user.id}/requests`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequest = (token, userId, requestId) => {
  return fetch(`${API_ROOT}/users/${userId}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, Authorization: `Bearer ${token}` }
  }).then(res => res.json());
};
