import React, { useState } from "react";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "../components/Router";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password, name);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-icon-box">
          <UserPlus className="h-8 w-8 text-white" />
        </div>

        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Sign up to get started</p>

        {error && (
          <div className="signup-alert signup-alert-error">{error}</div>
        )}

        {success && (
          <div className="signup-alert signup-alert-success">
            Account created successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="signup-label">Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                className="signup-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="signup-label">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                className="signup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="signup-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                className="signup-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength="6"
                required
              />
            </div>
            <p className="signup-hint">Must be at least 6 characters</p>
          </div>

          {/* Button */}
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="signup-bottom">
          Already have an account?{" "}
          <button
            className="signup-bottom-btn"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
