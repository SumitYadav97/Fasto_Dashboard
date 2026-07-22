"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BoxArrowLeft,
  PersonCircle,
  Envelope,
  ShieldCheck,
  Pencil,
  Key,
  ExclamationTriangle
} from "react-bootstrap-icons";

export default function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });

  // Modals & Form States
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [modalError, setModalError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
          setNewName(parsed.name || "");
        }
      } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = (e) => {
    if (e) e.preventDefault();

    // 1. Clear LocalStorage
    localStorage.removeItem("login");
    localStorage.removeItem("user");

    // 2. Expire cookie for middleware
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // 3. Redirect to login root page
    router.push("/");
    router.refresh();
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setShowNameModal(false);
    setMessage({ type: "success", text: "Name updated successfully!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setModalError("");

    const storedUserData = localStorage.getItem("user");
    const storedUser = storedUserData ? JSON.parse(storedUserData) : {};

    // VERIFY CURRENT PASSWORD AGAINST LOCALSTORAGE
    if (!storedUser.password || passwords.currentPassword !== storedUser.password) {
      setModalError("Incorrect current password. Please try again or reset it.");
      return;
    }

    // UPDATE PASSWORD
    const updatedUser = { ...storedUser, password: passwords.newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setShowPasswordModal(false);
    setPasswords({ currentPassword: "", newPassword: "" });
    setModalError("");
    setMessage({ type: "success", text: "Password changed successfully!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleForgotPasswordClick = () => {
    setShowPasswordModal(false);
    setPasswords({ currentPassword: "", newPassword: "" });
    setModalError("");
    router.push("/auth/forgot-password");
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h3 className="fw-bold text-dark mb-4">Account Settings</h3>
            {message.text && (
              <div className={`alert alert-${message.type} py-2 mb-4`} role="alert">
                {message.text}
              </div>
            )}
            {/* Profile Overview */}
            <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"}
                alt="User Avatar"
                width="64"
                height="64"
                className="rounded-circle border"
                style={{ objectFit: "cover" }}
              />
              <div>
                <h5 className="fw-bold mb-1 text-dark">{user.name || "User"}</h5>
                <p className="text-muted small mb-0">{user.email || "No email available"}</p>
              </div>
            </div>
            {/* User Details */}
            <div className="mb-4">
              <h6 className="text-uppercase text-muted fw-semibold small mb-3">User Details</h6>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-2">
                <div className="d-flex align-items-center gap-3">
                  <PersonCircle size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Full Name</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted">{user.name || "N/A"}</span>
                  <button
                    onClick={() => setShowNameModal(true)}
                    className="btn btn-sm btn-outline-secondary border-0 p-1"
                    title="Edit Name"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-2">
                <div className="d-flex align-items-center gap-3">
                  <Envelope size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Email Address</span>
                </div>
                <span className="text-muted">{user.email || "N/A"}</span>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-2">
                <div className="d-flex align-items-center gap-3">
                  <ShieldCheck size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Account Status</span>
                </div>
                <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                  Active
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                <div className="d-flex align-items-center gap-3">
                  <Key size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Password</span>
                </div>
                <button
                  onClick={() => {
                    setModalError("");
                    setShowPasswordModal(true);
                  }}
                  className="btn btn-sm btn-outline-primary"
                >
                  Change Password
                </button>
              </div>
            </div>
            {/* Logout Option */}
            <div className="pt-3 border-top">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-link text-decoration-none text-danger fw-semibold d-flex align-items-center gap-2 p-2 w-100 rounded text-start"
              >
                <BoxArrowLeft size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Name Modal */}
      {showNameModal && (
        <div className="modal d-block bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Edit Name</h5>
                <button type="button" className="btn-close" onClick={() => setShowNameModal(false)}></button>
              </div>
              <form onSubmit={handleUpdateName}>
                <div className="modal-body">
                  <label className="form-label text-muted small">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light" onClick={() => setShowNameModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal d-block bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 rounded-4">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Change Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setModalError("");
                    setPasswords({ currentPassword: "", newPassword: "" });
                  }}
                ></button>
              </div>
              <form onSubmit={handleUpdatePassword}>
                <div className="modal-body">
                  {modalError && (
                    <div className="alert alert-danger py-2 d-flex align-items-center gap-2 small mb-3">
                      <ExclamationTriangle size={16} className="flex-shrink-0" />
                      <div>{modalError}</div>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label text-muted small">Current Password</label>
                    <input
                      type="password"
                      className={`form-control ${modalError ? "is-invalid" : ""}`}
                      value={passwords.currentPassword}
                      onChange={(e) => {
                        setModalError("");
                        setPasswords({ ...passwords, currentPassword: e.target.value });
                      }}
                      required
                    />
                  </div>
                  {modalError && (
                    <div className="mb-3 text-end">
                      <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="btn btn-link p-0 text-decoration-none small text-primary"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label text-muted small">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setModalError("");
                      setPasswords({ currentPassword: "", newPassword: "" });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}