import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "../components/Router";
import "./Login.css"; // 🔥 CSS 파일 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://ec2-3-36-238-226.ap-northeast-2.compute.amazonaws.com:8888/oauth2/authorization/${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <User className="icon-white" />
          </div>
          <h2 className="login-title">다시 오신 것을 환영합니다!</h2>
          <p className="login-subtitle">계정에 로그인하세요.</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="input-label">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="oauth-grid">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="oauth-btn"
          >
            <img
              src="/images/google.png"
              alt="Google Logo"
              className="oauth-icon-img"
            />
            Google
          </button>

          {/* Naver Login */}
          <button
            onClick={() => handleOAuthLogin("naver")}
            className="oauth-btn"
          >
            <img
              src="/images/naver.png"
              alt="Naver Logo"
              className="oauth-icon-img"
            />
            Naver
          </button>
        </div>

        <p className="signup-text">
          계정이 없으신가요?{" "}
          <button onClick={() => navigate("/signup")} className="signup-btn">
            회원가입
          </button>
        </p>

        <div className="test-accounts">
          <p className="test-title">테스트 관리자 및 일반 유저 계정:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
