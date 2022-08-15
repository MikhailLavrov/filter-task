const GET_DATA_URL = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200';
const GET_TOKEN_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';

const setLocalStorage = (accessToken) => {
  localStorage.setItem('Bearer', accessToken);
};

const getLocalStorage = () => {
  return localStorage.getItem('Bearer');
};

const getAccessToken = () => {
  fetch(GET_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=NhVdSLuZzGuK9A2VTaYobkrHtAvnAwEe&client_secret=ZAHRlkckNqSA3nn6',
  })
  .then((response) => response.json())
  .then((response) => response.access_token)
  .then((access_token) => setLocalStorage(access_token))
};

const getApiRequest = () => {
  fetch(GET_DATA_URL, {
    headers: {
      'Authorization': `Bearer ${getLocalStorage()}`,
    },
  })
  .then((response) => response.json())
};

getAccessToken();
getApiRequest();
