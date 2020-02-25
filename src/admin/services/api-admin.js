const API_ROOT = `http://localhost:3000/api/v1`;
const AUTH_ROOT = 'http://localhost:3000/admin_auth';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

const tokenHeaders = auth => {
  return {
    ['access-token']: auth.accessToken,
    ['token-type']: 'Bearer',
    client: auth.client,
    expiry: auth.expiry,
    uid: auth.uid
  };
};

export const login = userData => {
  return fetch(`${AUTH_ROOT}/sign_in`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(userData)
  });
};

export const logoutAdmin = auth => {
  const headers = tokenHeaders(auth);
  return fetch(`${AUTH_ROOT}/sign_out`, {
    method: 'DELETE',
    headers: {
      ...jsonHeaders,
      ...headers
    }
  });
};

export const fetchRequests = auth => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/requests`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchRequest = (auth, requestId) => {
  const headers = tokenHeaders(auth);
  console.log(auth);
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const toggleRequestFulfilled = (auth, requestId, fulfilled) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/requests/${requestId}`, {
    method: 'PATCH',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({ fulfilled })
  }).then(res => res.json());
};

export const fetchItineraryPackages = auth => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/itinerary_packages`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchItineraryPackage = (auth, itinPackageId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/itinerary_packages/${itinPackageId}`, {
    method: 'GET',
    headers: { ...jsonHeaders, ...headers }
  }).then(res => res.json());
};

export const fetchItineraryPackageItems = (auth, itinPackagedId) => {
  const headers = tokenHeaders(auth);
  return fetch(
    `${API_ROOT}/itinerary_packages/${itinPackagedId}/itinerary_package_items`,
    {
      method: 'GET',
      headers: { ...jsonHeaders, ...headers }
    }
  ).then(res => res.json());
};

export const createItineraryPackage = (formData, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/itinerary_packages`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(formData)
  }).then(res => res.json());
};

export const updateItineraryPackage = (itinPackageId, formData, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/itinerary_packages/${itinPackageId}`, {
    method: 'PUT',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(formData)
  }).then(res => res.json());
};

export const createItineraryPackageItem = (itinPackageId, formData, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(
    `${API_ROOT}/itinerary_packages/${itinPackageId}/itinerary_package_items`,
    {
      method: 'POST',
      headers: { ...jsonHeaders, ...headers },
      body: JSON.stringify(formData)
    }
  ).then(res => res.json());
};

export const applyItineraryPackage = (requestId, itinPackageId, auth) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/requests/${requestId}/itinerary_packages`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({ itinerary_package_id: itinPackageId })
  }).then(res => res.json());
};

export const sendTextMessages = (auth, requestId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/texts`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      request_id: requestId
    })
  });
};

export const deletePkgItem = (auth, pkgId, pkgItemId) => {
  const headers = tokenHeaders(auth);
  return fetch(
    `${API_ROOT}/itinerary_packages/${pkgId}/itinerary_package_items/${pkgItemId}`,
    {
      method: 'DELETE',
      headers: { ...jsonHeaders, ...headers }
    }
  );
};

export const addItinItem = (auth, itinInfo, requestId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/requests/${requestId}/itinerary_items`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify(itinInfo)
  }).then(res => res.json());
};

export const deleteItinItem = (auth, itemId) => {
  const headers = tokenHeaders(auth);
  return fetch(`${API_ROOT}/itinerary_items/${itemId}`, {
    method: 'DELETE',
    headers: { ...jsonHeaders, ...headers }
  });
};

export const scrapeNames = (auth, time) => {
  console.log(time);
  const headers = tokenHeaders(auth);
  return fetch(`http://localhost:3000/scrapes`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      time: time
    })
  }).then(res => res.json());
};

export const scrapeSinglePage = (auth, info) => {
  const headers = tokenHeaders(auth);
  return fetch(`http://localhost:3000/scrapes/single_page`, {
    method: 'POST',
    headers: { ...jsonHeaders, ...headers },
    body: JSON.stringify({
      link: info.link
    })
  }).then(res => res.json());
};
