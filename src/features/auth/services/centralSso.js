import axios from 'axios';

const isDevelopmentBuild = import.meta.env.DEV;

const configuredOrDevelopmentFallback = (value, fallback) => (
  value?.trim() || (isDevelopmentBuild ? fallback : '')
);

export const SSO_API_URL = configuredOrDevelopmentFallback(
  import.meta.env.VITE_SSO_ISSUER_URL || import.meta.env.VITE_SSO_API_URL,
  'http://localhost:3001',
);
export const SSO_CLIENT_ID = configuredOrDevelopmentFallback(
  import.meta.env.VITE_SSO_CLIENT_ID,
  'demo-client-app',
);
const SSO_REQUEST_STORAGE_KEY = 'researchpulse.sso.pkce';

const ssoApi = axios.create({
  baseURL: SSO_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const ssoLogin = (email, password) => ssoApi.post('/api/v1/auth/login', { email, password });
export const ssoRegister = (payload) => ssoApi.post('/api/v1/auth/register', payload);
export const ssoMe = () => ssoApi.get('/api/v1/auth/me');
export const ssoLogout = () => ssoApi.post('/api/v1/auth/logout');
export const startGoogleSso = () => {
  assertSsoConfiguration();
  window.location.assign(`${SSO_API_URL}/api/v1/auth/social/google/start`);
};

const toBase64Url = (bytes) => {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return window.btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

const randomValue = () => {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
};

const createCodeChallenge = async (verifier) => {
  const digest = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier),
  );
  return toBase64Url(new Uint8Array(digest));
};

const normalizeReturnTo = (returnTo) => (
  typeof returnTo === 'string' && returnTo.startsWith('/') && !returnTo.startsWith('//')
    ? returnTo
    : '/'
);

export const getSsoRedirectUri = () => (
  configuredOrDevelopmentFallback(
    import.meta.env.VITE_SSO_REDIRECT_URI,
    `${window.location.origin}/auth/callback`,
  )
);

const assertSsoConfiguration = () => {
  if (!SSO_API_URL || !SSO_CLIENT_ID || !getSsoRedirectUri()) {
    throw new Error('SSO production configuration is missing');
  }
};

export const startSsoAuthorization = async (returnTo = '/') => {
  assertSsoConfiguration();
  const state = randomValue();
  const codeVerifier = randomValue();
  const codeChallenge = await createCodeChallenge(codeVerifier);
  const redirectUri = getSsoRedirectUri();

  sessionStorage.setItem(SSO_REQUEST_STORAGE_KEY, JSON.stringify({
    state,
    codeVerifier,
    redirectUri,
    clientId: SSO_CLIENT_ID,
    returnTo: normalizeReturnTo(returnTo),
    createdAt: Date.now(),
  }));

  const authorizeUrl = new URL('/api/v1/oidc/authorize', SSO_API_URL);
  authorizeUrl.search = new URLSearchParams({
    client_id: SSO_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }).toString();

  window.location.assign(authorizeUrl.toString());
  return authorizeUrl.toString();
};

export const consumePendingSsoRequest = (state) => {
  const raw = sessionStorage.getItem(SSO_REQUEST_STORAGE_KEY);
  sessionStorage.removeItem(SSO_REQUEST_STORAGE_KEY);

  if (!raw) throw new Error('Không tìm thấy phiên đăng nhập SSO đang chờ');

  let pending;
  try {
    pending = JSON.parse(raw);
  } catch {
    throw new Error('Phiên đăng nhập SSO không hợp lệ');
  }

  const maxAge = 10 * 60 * 1000;
  if (
    pending.state !== state
    || !pending.codeVerifier
    || !Number.isFinite(pending.createdAt)
    || Date.now() - pending.createdAt > maxAge
  ) {
    throw new Error('Phiên đăng nhập SSO đã hết hạn hoặc không hợp lệ');
  }

  return pending;
};

export const discardPendingSsoRequest = () => {
  sessionStorage.removeItem(SSO_REQUEST_STORAGE_KEY);
};
