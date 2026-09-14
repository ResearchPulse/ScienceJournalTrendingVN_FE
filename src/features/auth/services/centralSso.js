import axios from 'axios';

export const SSO_API_URL = import.meta.env.VITE_SSO_API_URL || 'http://localhost:3001';

const ssoApi = axios.create({
  baseURL: SSO_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const ssoLogin = (email, password) => ssoApi.post('/api/v1/auth/login', { email, password });
export const ssoRegister = (payload) => ssoApi.post('/api/v1/auth/register', payload);
export const ssoMe = () => ssoApi.get('/api/v1/auth/me');
export const ssoLogout = () => ssoApi.post('/api/v1/auth/logout');
export const startGoogleSso = () => window.location.assign(`${SSO_API_URL}/api/v1/auth/social/google/start`);
