import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SSO_PORTAL_URL = (
  import.meta.env.VITE_SSO_PORTAL_URL?.trim()
    || (import.meta.env.DEV ? 'http://localhost:3000' : '')
).replace(/\/+$/, '');

export default function SsoPortalRedirectPage() {
  const location = useLocation();
  const [configurationError, setConfigurationError] = useState('');

  useEffect(() => {
    if (!SSO_PORTAL_URL) {
      setConfigurationError('SSO production configuration is missing');
      return;
    }

    const portalUrl = new URL(SSO_PORTAL_URL);
    portalUrl.pathname = location.pathname;
    portalUrl.search = location.search;
    portalUrl.hash = location.hash;
    window.location.replace(portalUrl.toString());
  }, [location.hash, location.pathname, location.search]);

  return (
    <main style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>
      {configurationError && <p>{configurationError}</p>}
      <p>Đang chuyển tới ResearchPulse SSO...</p>
    </main>
  );
}
