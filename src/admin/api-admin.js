const API_ROOT = `http://localhost:3000/api/v1`;
const AUTH_ROOT = 'http://localhost:3000/admin_auth';

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

export const fetchRequests = userData => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/requests`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequest = (userData, requestId) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};
