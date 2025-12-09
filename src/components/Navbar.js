import React, { useState } from "react";
import { Camera, LogOut, User, Shield, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "./Router";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* LOGO */}
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <Camera className="h-8 w-8" color="white" />
            <span>Auth Test App</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="navbar-menu">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="navbar-btn"
                >
                  Dashboard
                </button>

                {user.role === "ADMIN" && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="navbar-admin"
                  >
                    Admin Panel
                  </button>
                )}

                <div className="navbar-user-info">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                  {user.role === "ADMIN" && (
                    <Shield className="h-4 w-4" color="#facc15" />
                  )}
                </div>

                <button onClick={handleLogout} className="navbar-logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="navbar-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="navbar-btn"
                  style={{
                    background: "white",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="navbar-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {user ? (
            <>
              <div className="mobile-user-info">
                <div className="mobile-user-info-inner">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                  {user.role === "ADMIN" && (
                    <Shield className="h-4 w-4" color="#facc15" />
                  )}
                </div>
              </div>

              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                Dashboard
              </button>

              {user.role === "ADMIN" && (
                <button
                  className="mobile-menu-item"
                  onClick={() => {
                    navigate("/admin");
                    setMobileMenuOpen(false);
                  }}
                >
                  Admin Panel
                </button>
              )}

              <button onClick={handleLogout} className="mobile-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </button>

              <button
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
