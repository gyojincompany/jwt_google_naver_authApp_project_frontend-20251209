import React, { useState, useEffect } from "react";
import { User, Shield, Camera } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "../components/Router";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { user, fetchWithAuth } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          fetchWithAuth("http://localhost:8888/api/admin/users"),
          fetchWithAuth("http://localhost:8888/api/admin/dashboard"),
        ]);

        setUsers(await usersResponse.json());
        setStats(await statsResponse.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await fetchWithAuth(`http://localhost:8888/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-wrapper">
        <div className="admin-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <div className="admin-header-title">
            <Shield className="admin-header-icon" />
            <h1>Admin Panel</h1>
          </div>
          <p className="admin-header-subtext">
            Manage users and system settings
          </p>
        </div>

        {stats && (
          <div className="admin-stats-grid">
            <div className="admin-card">
              <div className="admin-card-inner">
                <div>
                  <p className="admin-card-label">Total Users</p>
                  <p className="admin-card-value">{stats.totalUsers}</p>
                </div>
                <div className="admin-icon-box blue">
                  <User />
                </div>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-inner">
                <div>
                  <p className="admin-card-label">Admin</p>
                  <p className="admin-card-value">{stats.admin}</p>
                </div>
                <div className="admin-icon-box yellow">
                  <Shield />
                </div>
              </div>
            </div>

            <div className="admin-card gradient">
              <div className="admin-card-inner white">
                <div>
                  <p className="admin-card-label white">System Status</p>
                  <p className="admin-card-value white">Active</p>
                </div>
                <div className="admin-icon-box white-border">
                  <Camera />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="admin-user-table-wrapper">
          <div className="admin-user-table-header">
            <h2>User Management</h2>
          </div>

          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Provider</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="admin-user-info">
                        <div className="admin-avatar">
                          <User />
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>

                    <td>{u.email}</td>

                    <td>
                      <span
                        className={
                          u.role === "ADMIN"
                            ? "admin-role admin-role-admin"
                            : "admin-role admin-role-user"
                        }
                      >
                        {u.role}
                      </span>
                    </td>

                    <td>
                      <span className="admin-provider">{u.provider}</span>
                    </td>

                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="admin-delete-btn"
                        disabled={u.id === user?.id}
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
