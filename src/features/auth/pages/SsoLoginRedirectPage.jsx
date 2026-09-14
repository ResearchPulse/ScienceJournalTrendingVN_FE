import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { startSsoAuthorization } from '../services/centralSso';

export default function SsoLoginRedirectPage() {
  const location = useLocation();
  const startedRef = useRef(false);
  const [configurationError, setConfigurationError] = useState('');
  const fromLocation = location.state?.from;
  const returnTo = typeof fromLocation === 'string'
    ? fromLocation
    : (fromLocation?.pathname || '/') + (fromLocation?.search || '') + (fromLocation?.hash || '');

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    startSsoAuthorization(returnTo).catch((error) => {
      setConfigurationError(error?.message || 'Không thể khởi động phiên đăng nhập SSO');
    });
  }, [returnTo]);

  return (
    <main style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>
      {configurationError ? (
        <div style={{ textAlign: 'center', padding: '24px', color: '#dc2626' }}>
          <p style={{ fontWeight: 600, fontSize: '18px' }}>Lỗi xác thực SSO</p>
          <p>{configurationError}</p>
          <button
            type="button"
            style={{ marginTop: '16px', padding: '8px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            onClick={() => {
              startedRef.current = false;
              setConfigurationError('');
              startSsoAuthorization(returnTo).catch((err) => setConfigurationError(err?.message || 'Không thể khởi động phiên đăng nhập SSO'));
            }}
          >
            Thử lại
          </button>
        </div>
      ) : (
        <p>Đang chuyển tới ResearchPulse SSO...</p>
      )}
    </main>
  );
}
