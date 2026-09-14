import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { startSsoAuthorization } from '../services/centralSso';
import ROUTES from '../../../app/router/routePaths';
import './ResearchPulseLoginPage.css';

function BrandMark() {
  return <div className="rp-brand-mark" aria-hidden="true"><span /><span /><span /></div>;
}

export default function ResearchPulseLoginPage() {
  const location = useLocation();
  const startedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(location.state?.error || null);
  const fromLocation = location.state?.from;
  const from = fromLocation
    ? `${fromLocation.pathname || ROUTES.DASHBOARD}${fromLocation.search || ''}${fromLocation.hash || ''}`
    : ROUTES.DASHBOARD;

  const beginSsoLogin = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await startSsoAuthorization(from);
    } catch (requestError) {
      setError(requestError.message || 'Không thể mở đăng nhập SSO.');
      setIsLoading(false);
    }
  }, [from]);

  useEffect(() => {
    if (location.state?.error || startedRef.current) return;
    startedRef.current = true;
    beginSsoLogin();
  }, [beginSsoLogin, location.state?.error]);

  return (
    <main className="rp-login-page">
      <section className="rp-login-visual" aria-label="ResearchPulse Single Sign-On">
        <div className="rp-login-lottie" aria-hidden="true">
          <iframe src="https://lottie.host/embed/fbf3ad6e-a236-43f3-9a85-fcf2bcf3ede0/y6626GQZIk.lottie" title="ResearchPulse visual" loading="lazy" />
        </div>
        <header className="rp-login-brand">
          <BrandMark />
          <div><strong>RESEARCHPULSE</strong><span>Single Sign-On</span></div>
        </header>
        <div className="rp-login-copy">
          <p className="rp-eyebrow">ONE ACCOUNT. CONNECTED RESEARCH.</p>
          <h1>Một tài khoản cho toàn bộ trải nghiệm nghiên cứu.</h1>
          <p>Truy cập nhanh và an toàn vào toàn bộ không gian nghiên cứu của ResearchPulse.</p>
          <div className="rp-benefits">
            <span><b>01</b>Bảo mật tập trung cho tài khoản nghiên cứu</span>
            <span><b>02</b>Kết nối mọi công cụ ResearchPulse</span>
            <span><b>03</b>Đăng nhập SSO nhanh và nhất quán</span>
          </div>
        </div>
        <footer className="rp-login-footer"><span>© {new Date().getFullYear()} ResearchPulse</span><span>Hỗ trợ kỹ thuật</span></footer>
      </section>

      <section className="rp-login-form" aria-labelledby="rp-login-title">
        <div className="rp-login-shell">
          <div className="rp-mobile-brand"><BrandMark /><span>RESEARCHPULSE SSO</span></div>
          <div className="rp-form-heading">
            <p className="rp-eyebrow">WELCOME BACK</p>
            <h2 id="rp-login-title">Đăng nhập</h2>
            <p>Đăng nhập bằng tài khoản ResearchPulse duy nhất của bạn.</p>
          </div>

          {error && <div className="rp-sso-error" role="alert">{error}</div>}
          <div className="rp-sso-status" aria-live="polite">
            {isLoading ? 'Đang chuyển tới ResearchPulse SSO...' : 'Bạn sẽ được xác thực qua cổng SSO trung tâm.'}
          </div>
          <button type="button" className="rp-central-sso-button" onClick={beginSsoLogin} disabled={isLoading}>
            {isLoading ? 'Đang chuyển hướng...' : 'Tiếp tục với ResearchPulse SSO'}
          </button>
          <p className="rp-login-legal">ResearchPulse sử dụng một tài khoản SSO duy nhất cho toàn bộ hệ sinh thái nghiên cứu.</p>
        </div>
      </section>
    </main>
  );
}
