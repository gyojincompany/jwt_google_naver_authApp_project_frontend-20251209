import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(
      // "http://ec2-3-36-238-226.ap-northeast-2.compute.amazonaws.com:8888/api/auth/login",
      "https://d34u094mtoqiq.cloudfront.net/api/auth/login",
      {
        // const response = await fetch("http://localhost:8888/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem(
      "user",
      JSON.stringify({ email: data.email, name: data.name, role: data.role })
    );
    setUser({ email: data.email, name: data.name, role: data.role });
    return data;
  };

  const signup = async (email, password, name) => {
    const response = await fetch(
      "https://d34u094mtoqiq.cloudfront.net/api/auth/signup",
      // "http://ec2-3-36-238-226.ap-northeast-2.compute.amazonaws.com:8888/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.email || error.error || "Signup failed");
    }

    return await response.json();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      logout();
      throw new Error("Unauthorized");
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, fetchWithAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
