import React, { useState, useEffect } from "react";
import { User, Shield, Camera } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, fetchWithAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchWithAuth(
          "https://d34u094mtoqiq.cloudfront.net/api/user/profile"
          // "http://ec2-3-36-238-226.ap-northeast-2.compute.amazonaws.com:8888/api/user/profile"
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
          <h1>{user?.name}님, 다시 오신 것을 환영합니다! 👋</h1>
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
                <h3>프로필 정보</h3>
                <p>계정 상세 정보</p>
              </div>
            </div>

            {profile && (
              <div className="info-list">
                <div className="info-row">
                  <span>이름:</span>
                  <span>{profile.name}</span>
                </div>

                <div className="info-row">
                  <span>이메일:</span>
                  <span>{profile.email}</span>
                </div>

                <div className="info-row">
                  <span>역할:</span>
                  <span className="role-chip">
                    {profile.role}
                    {profile.role === "ADMIN" && (
                      <Shield className="role-icon" />
                    )}
                  </span>
                </div>

                <div className="info-row">
                  <span>가입 방식:</span>
                  <span>{profile.provider}</span>
                </div>

                <div className="info-row">
                  <span>가입일:</span>
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
                <p>활동 요약</p>
              </div>
            </div>

            <div className="stats-list">
              <div className="stats-item">
                <div className="stats-value">활성</div>
                <div className="stats-label">계정 상태</div>
              </div>

              <div className="stats-item">
                <div className="stats-value">{profile?.role}</div>
                <div className="stats-label">접근 권한</div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Notice */}
        {user?.role === "ADMIN" && (
          <div className="admin-banner">
            <Shield className="admin-icon" />
            <div>
              <h3>관리자 권한</h3>
              <p>
                관리자 권한을 가지고 있습니다. 사용자 관리를 위해 관리자
                페이지를 방문하세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
