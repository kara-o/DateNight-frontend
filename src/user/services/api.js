const API_ROOT = '/api/v1';
const AUTH_ROOT = '/api/auth';

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

export const logoutUser = auth => {
  const headers = tokenHeaders(auth);
  return fetch(`${AUTH_ROOT}/sign_out`, {
    method: 'DELETE',
    headers: {
      ...jsonHeaders,
      ...headers
    }
  });
};

export const createRequest = (formData, user, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/users/${user.id}/requests`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      ...formData,
      user_id: user.id
    })
  }).then(res => res.json());
};

export const updateRequest = (formData, user, auth, requestId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/users/${user.id}/requests/${requestId}`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      ...formData
    })
  }).then(res => res.json());
};

export const cancelRequest = (user, auth, requestId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/users/${user.id}/requests/${requestId}`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      cancelled: true
    })
  }).then(res => res.json());
};

export const fetchOptions = (type, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/${type}/`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequests = (user, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/users/${user.id}/requests`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequest = (user, auth, requestId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/users/${user.id}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};
