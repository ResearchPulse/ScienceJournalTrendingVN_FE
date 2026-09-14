import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  completeSsoAuthorization,
} from '../services/ssoSession';
import { discardPendingSsoRequest } from '../services/centralSso';

export default function SsoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const providerError = searchParams.get('error_description') || searchParams.get('error');

    if (providerError) {
      discardPendingSsoRequest();
      navigate('/login', { replace: true, state: { error: providerError } });
      return;
    }

    completeSsoAuthorization({ code, state })
      .then((result) => {
        navigate(result.returnTo || '/', { replace: true });
      })
      .catch((requestError) => {
        navigate('/login', {
          replace: true,
          state: {
            error: requestError.response?.data?.message
              || requestError.message
              || 'Không thể xác nhận phiên SSO.',
          },
        });
      });
  }, [navigate, searchParams]);

  return (
    <main
      className="d-flex min-vh-100 align-items-center justify-content-center"
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 500,
        color: '#475569',
      }}
    >
      {'Đang xác nhận phiên SSO...'}
    </main>
  );
}
