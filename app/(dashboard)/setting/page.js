"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BoxArrowLeft, PersonCircle, Envelope, ShieldCheck } from "react-bootstrap-icons";

export default function setting() {
  const [user, setUser] = useState({ name: "", email: "" });
  const router = useRouter();
  useEffect(() => {
    // Load logged-in user details from localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        setUser(JSON.parse(storedUserData));
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    // Clear login state and session data
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            {/* Header Title */}
            <h3 className="fw-bold text-dark mb-4">Account Settings</h3>
            {/* Profile Overview Section */}
            <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
              <img
                src={`https://i.pravatar.cc/100?u=${encodeURIComponent(user.name || "User")}`}
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
            {/* Detailed User Info List */}
            <div className="mb-4">
              <h6 className="text-uppercase text-muted fw-semibold small mb-3">User Details</h6>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-2">
                <div className="d-flex align-items-center gap-3">
                  <PersonCircle size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Full Name</span>
                </div>
                <span className="text-muted">{user.name || "N/A"}</span>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-2">
                <div className="d-flex align-items-center gap-3">
                  <Envelope size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Email Address</span>
                </div>
                <span className="text-muted">{user.email || "N/A"}</span>
              </div>
              <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                <div className="d-flex align-items-center gap-3">
                  <ShieldCheck size={20} className="text-secondary" />
                  <span className="fw-medium text-dark">Account Status</span>
                </div>
                <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Active</span>
              </div>
            </div>
            {/* Logout Link Option */}
            <div className="pt-2 border-top">
              <a
                href="#"
                onClick={handleLogout}
                className="sidebar-link logout-link mt-2 d-flex align-items-center gap-2 text-decoration-none p-2 rounded hover-bg"
                style={{ cursor: "pointer" }}
              >
                <span className="icon-wrapper text-danger d-flex align-items-center">
                  <BoxArrowLeft size={20} />
                </span>
                <span className="link-text text-danger fw-semibold">Logout</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}