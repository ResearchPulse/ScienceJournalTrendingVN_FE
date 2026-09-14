import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeSsoSession } from '../services/ssoSession';

export default function SsoCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    initializeSsoSession()
      .then((result) => {
        if (!cancelled && result.status === 'authenticated') navigate('/', { replace: true });
        else if (!cancelled) navigate('/login', { replace: true, state: { error: 'Phiên SSO không hợp lệ.' } });
      })
      .catch((requestError) => {
        if (!cancelled) {
          navigate('/login', { replace: true, state: { error: requestError.response?.data?.message || requestError.message || 'Không thể xác nhận phiên SSO.' } });
        }
      });
    return () => { cancelled = true; };
  }, [navigate]);

  return null;
}
