import axios from 'axios';
import store from '../store';

export const DEFAULT_LIMIT = 25;
const API_URL = 'https://guarded-thicket-22918.herokuapp.com';

const routes = {
  LOGIN: '/login',
  APPS: '/apps',
};

/**
 * Get headers required for request
 */
const getHeaders = () => {
  const { accessToken } = store.getState().user;
  return {
    Authorization: accessToken,
  };
};

/**
 * Make login request
 * @param {object} details User login details
 * @param {string} details.email User email
 * @param {string} details.password User password
 * @param {expiry} details.expiry User token expiry
 */
export const login = async ({ email, password, expiry }) =>
  axios.post(API_URL + routes.LOGIN, {
    email,
    password,
    expiry,
  });

/**
 * Make request to get apps
 */
export const getApps = async () => axios.get(API_URL + routes.APPS, {
  headers: getHeaders(),
});

/**
 * Make request to get Users for app
 * @param {object} details App users request details
 * @param {string} details.appId App ID
 * @param {number} details.limit Number of users to return
 * @param {number} details.offset Number of users to offset users by
 */
export const getAppUsers = async ({ appId, limit, offset }) =>
  axios.get(`${API_URL}${routes.APPS}/${appId}/users`, {
    params: {
      limit,
      offset,
    },
    headers: getHeaders(),
  });

/**
 * Make update app request
 * @param {object} details App details
 * @param {string} details.appId App ID
 * @param {string} details.name New app name
 * @param {string} details.logo New logo url
 */
export const updateApp = async ({ appId, name, logo }) =>
  axios.put(
    `${API_URL}${routes.APPS}/${appId}`,
    {
      name,
      logo,
    },
    {
      headers: getHeaders(),
    },
  );
