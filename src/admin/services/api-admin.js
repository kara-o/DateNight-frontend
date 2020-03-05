const API_ROOT = `${process.env.BASE_URL}/api/v1`;
const AUTH_ROOT = `${process.env.REACT_APP_BASE_URL}/admin_auth`;

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

export const logoutAdmin = userData => {
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

export const toggleRequestFulfilled = (userData, requestId, fulfilled) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({ fulfilled })
  }).then(res => res.json());
};

export const fetchItineraryPackages = userData => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/itinerary_packages`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchItineraryPackage = (userData, itinPackageId) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/itinerary_packages/${itinPackageId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchItineraryPackageItems = (userData, itinPackagedId) => {
  const headers = tokenHeaders(userData);
  return fetch(
    `${API_ROOT}/itinerary_packages/${itinPackagedId}/itinerary_package_items`,
    {
      method: 'GET',
      headers: { ...jsonHeaders, ...headers }
    }
  ).then(res => res.json());
};

export const createItineraryPackage = (formData, userData) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/itinerary_packages`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(formData)
  }).then(res => res.json());
};

export const updateItineraryPackage = (itinPackageId, formData, userData) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/itinerary_packages/${itinPackageId}`, {
    method: 'PUT',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(formData)
  }).then(res => res.json());
};

export const createItineraryPackageItem = (
  itinPackageId,
  formData,
  userData
) => {
  const headers = tokenHeaders(userData);
  return fetch(
    `${API_ROOT}/itinerary_packages/${itinPackageId}/itinerary_package_items`,
    {
      method: 'POST',
      headers: { ...jsonHeaders, ...headers },
      body: JSON.stringify(formData)
    }
  ).then(res => res.json());
};

export const applyItineraryPackage = (requestId, itinPackageId, userData) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/requests/${requestId}/itinerary_packages`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({ itinerary_package_id: itinPackageId })
  }).then(res => res.json());
};

export const sendTextMessages = (userData, requestId) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/texts`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      request_id: requestId
    })
  });
};

export const deletePkgItem = (userData, pkgId, pkgItemId) => {
  const headers = tokenHeaders(userData);
  return fetch(
    `${API_ROOT}/itinerary_packages/${pkgId}/itinerary_package_items/${pkgItemId}`,
    {
      method: 'DELETE',
      headers: { ...jsonHeaders, ...headers }
    }
  );
};

export const addItinItem = (userData, itinInfo, requestId) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/requests/${requestId}/itinerary_items`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(itinInfo)
  }).then(res => res.json());
};

export const deleteItinItem = (userData, itemId) => {
  const headers = tokenHeaders(userData);
  return fetch(`${API_ROOT}/itinerary_items/${itemId}`, {
    method: 'DELETE',
    headers: { ...jsonHeaders, ...headers }
  });
};

export const scrapeNames = (userData, time) => {
  console.log(time);
  const headers = tokenHeaders(userData);
  return fetch(`${process.env.REACT_APP_BASE_URL}/scrapes`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      time: time
    })
  }).then(res => res.json());
};

export const scrapeSinglePage = (userData, info) => {
  const headers = tokenHeaders(userData);
  return fetch(`${process.env.BASE_URL}/scrapes/single_page`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      link: info.link
    })
  }).then(res => res.json());
};
