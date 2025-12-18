import React, { useEffect } from "react";
import { useNavigate } from "../components/Router";
import "./OAuth2Redirect.css"; // 🔥 CSS 연결

const OAuth2Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");

    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      fetch(
        // "http://ec2-3-36-238-226.ap-northeast-2.compute.amazonaws.com:8888/api/user/profile",
        "https://d34u094mtoqiq.cloudfront.net/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const userData = {
            email: data.email,
            name: data.name,
            role: data.role,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          window.location.href = "/dashboard";
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="oauth-container">
      <div className="oauth-box">
        <div className="loader"></div>
        <p className="loading-text">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuth2Redirect;
