import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SocialAuthButton from '../components/SocialAuthButton';
import useAuth from '../hooks/useAuth';
import ROUTES from '../../../app/router/routePaths';
import './ResearchPulseLoginPage.css';

function BrandMark() { return <div className="rp-brand-mark" aria-hidden="true"><span /><span /><span /></div>; }

export default function ResearchPulseLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(location.state?.error || null);
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleLoginSubmit = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(payload.email, payload.password, payload.remember_login);
      navigate(from, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Đăng nhập không thành công.');
    } finally { setIsLoading(false); }
  };

  return <main className="rp-login-page">
    <section className="rp-login-visual" aria-label="ResearchPulse Single Sign-On">
      <div className="rp-login-lottie" aria-hidden="true"><iframe src="https://lottie.host/embed/fbf3ad6e-a236-43f3-9a85-fcf2bcf3ede0/y6626GQZIk.lottie" title="ResearchPulse visual" loading="lazy" /></div>
      <header className="rp-login-brand"><BrandMark /><div><strong>RESEARCHPULSE</strong><span>Single Sign-On</span></div></header>
      <div className="rp-login-copy"><p className="rp-eyebrow">ONE ACCOUNT. CONNECTED RESEARCH.</p><h1>Một tài khoản cho toàn bộ trải nghiệm nghiên cứu.</h1><p>Truy cập nhanh và an toàn vào toàn bộ không gian nghiên cứu của ResearchPulse.</p><div className="rp-benefits"><span><b>01</b>Bảo mật tập trung cho tài khoản nghiên cứu</span><span><b>02</b>Kết nối mọi công cụ ResearchPulse</span><span><b>03</b>Đăng nhập SSO nhanh và nhất quán</span></div></div>
      <footer className="rp-login-footer"><span>© {new Date().getFullYear()} ResearchPulse</span><span>Hỗ trợ kỹ thuật</span></footer>
    </section>
    <section className="rp-login-form" aria-labelledby="rp-login-title"><div className="rp-login-shell"><div className="rp-mobile-brand"><BrandMark /><span>RESEARCHPULSE SSO</span></div><div className="rp-form-heading"><p className="rp-eyebrow">WELCOME BACK</p><h2 id="rp-login-title">Đăng nhập</h2><p>Đăng nhập để tiếp tục vào không gian nghiên cứu ResearchPulse.</p></div><SocialAuthButton label="Tiếp tục với Google SSO" onClick={() => loginWithGoogle()} disabled={isLoading} /><div className="rp-divider"><span>hoặc đăng nhập bằng tài khoản</span></div><LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} apiError={error} /><p className="rp-login-help">Chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký ngay</Link></p><p className="rp-login-legal">Bằng việc tiếp tục, bạn đồng ý với quy định sử dụng và chính sách bảo mật của ResearchPulse.</p></div></section>
  </main>;
}
