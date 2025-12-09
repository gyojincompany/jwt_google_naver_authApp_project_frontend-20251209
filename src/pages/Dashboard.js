import React, { useState, useEffect } from "react";
import { User, Shield, Camera } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, fetchWithAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:8888/api/user/profile"
        );
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Here's your dashboard overview</p>
        </div>

        <div className="dashboard-grid">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="card-header">
              <div className="icon-box blue-box">
                <User className="icon-size" />
              </div>
              <div>
                <h3>Profile Information</h3>
                <p>Your account details</p>
              </div>
            </div>

            {profile && (
              <div className="info-list">
                <div className="info-row">
                  <span>Name:</span>
                  <span>{profile.name}</span>
                </div>

                <div className="info-row">
                  <span>Email:</span>
                  <span>{profile.email}</span>
                </div>

                <div className="info-row">
                  <span>Role:</span>
                  <span className="role-chip">
                    {profile.role}
                    {profile.role === "ADMIN" && (
                      <Shield className="role-icon" />
                    )}
                  </span>
                </div>

                <div className="info-row">
                  <span>Provider:</span>
                  <span>{profile.provider}</span>
                </div>

                <div className="info-row">
                  <span>Member Since:</span>
                  <span>
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="stats-card">
            <div className="card-header white-box">
              <Camera className="icon-size" />
              <div>
                <h3>Quick Stats</h3>
                <p>Your activity summary</p>
              </div>
            </div>

            <div className="stats-list">
              <div className="stats-item">
                <div className="stats-value">Active</div>
                <div className="stats-label">Account Status</div>
              </div>

              <div className="stats-item">
                <div className="stats-value">{profile?.role}</div>
                <div className="stats-label">Access Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Notice */}
        {user?.role === "ADMIN" && (
          <div className="admin-banner">
            <Shield className="admin-icon" />
            <div>
              <h3>Admin Access</h3>
              <p>
                You have administrator privileges. Visit the Admin Panel to
                manage users.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
