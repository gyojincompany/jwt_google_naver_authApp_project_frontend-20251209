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
    window.location.href = `http://localhost:8888/oauth2/authorization/${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <User className="icon-white" />
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
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
            <svg className="oauth-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v..."
              ></path>
            </svg>
            Google
          </button>

          <button
            onClick={() => handleOAuthLogin("naver")}
            className="oauth-btn"
          >
            <div className="naver-square"></div>
            Naver
          </button>
        </div>

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="signup-btn">
            Sign up
          </button>
        </p>

        <div className="test-accounts">
          <p className="test-title">Test Accounts:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
