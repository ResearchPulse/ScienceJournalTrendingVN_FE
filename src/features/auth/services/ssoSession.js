import api from '../../../shared/services/api';
import {
  consumePendingSsoRequest,
  discardPendingSsoRequest,
  ssoLogout,
} from './centralSso';
import { useAuthStore } from '../../../app/store/authStore';
import { useUserStore } from '../../../app/store/userStore';
import { createSessionInitializer, getAuthenticatedSessionFromState } from './ssoSessionContract';

const setAuthenticatedUser = (user) => {
  useUserStore.getState().setUser?.(user);
  useUserStore.getState().setEmail?.(user?.email);
  useAuthStore.getState().loginSuccess(null, user);
  return { status: 'authenticated', user };
};

const checkChildSession = async () => {
  const response = await api.get('/auth/check-auth', {
    skipBearer: true,
    skipAuthRefresh: true,
  });
  const user = response.data?.data?.user || response.data?.data || response.data?.user;
  if (!user) throw new Error('Authenticated response did not include a user');
  return setAuthenticatedUser(user);
};

const clearClientStorage = () => {
  try {
    const tokenKeys = [
      'token',
      'accessToken',
      'researchpulse_token',
      'researchpulse_guest_token',
      'user',
      'jwt',
    ];
    tokenKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  } catch {
    // Storage access might be restricted
  }
};

export const clearClientStorageAndCookies = () => {
  clearClientStorage();
  try {
    if (typeof document !== 'undefined') {
      const cookieNames = [
        'access_token',
        'refresh_token',
        'vn_access_token_dev',
        'vn_refresh_token_dev',
        'vn_sso_block_dev',
        '__Host-vn_access_token',
        '__Host-vn_refresh_token',
        '__Host-vn_sso_block',
      ];
      const domains = [
        '',
        '; domain=.hyperdatalab.org',
        '; domain=hyperdatalab.org',
        '; domain=.vn.hyperdatalab.org',
        '; domain=vn.hyperdatalab.org',
      ];
      cookieNames.forEach((name) => {
        domains.forEach((dom) => {
          document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${dom};`;
        });
      });
    }
  } catch {
    // Storage access might be restricted
  }
};

const sessionInitializer = createSessionInitializer(async () => {
    clearClientStorage();
    useAuthStore.getState().logout();
    try { return await checkChildSession(); }
    catch (error) {
      useAuthStore.getState().logout();
      if (error.response?.status === 401) return { status: 'anonymous' };
      throw error;
    }
});

export const initializeSsoSession = () => {
  const currentSession = getAuthenticatedSessionFromState(useAuthStore.getState());
  return currentSession ? Promise.resolve(currentSession) : sessionInitializer.run();
};

export const explicitSsoLogin = async () => {
  return checkChildSession();
};

export const completeSsoAuthorization = async ({ code, state }) => {
  if (!code || !state) throw new Error('Thiếu mã xác thực SSO');

  const pending = consumePendingSsoRequest(state);
  await api.post('/auth/sso/login', {
    code,
    client_id: pending.clientId,
    redirect_uri: pending.redirectUri,
    code_verifier: pending.codeVerifier,
  }, {
    skipBearer: true,
    skipAuthRefresh: true,
  });

  const session = await checkChildSession();
  return { ...session, returnTo: pending.returnTo };
};

export const logoutSsoSession = async () => {
  try {
    await api.post('/auth/logout', null, {
      skipBearer: true,
      skipAuthRefresh: true,
    });
  } catch {
    // The local child session must still be cleared on a network/API failure.
  }
  try {
    await ssoLogout();
  } catch {
    // Central SSO logout is best-effort; the child session is already cleared above.
  } finally {
    discardPendingSsoRequest();
    clearClientStorageAndCookies();
    useAuthStore.getState().logout();
    useUserStore.getState().setUser?.(null);
    useUserStore.getState().setEmail?.(null);
    sessionInitializer.reset();
  }
};
