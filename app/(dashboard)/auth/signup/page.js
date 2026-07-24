"use client";
import React, { useState } from "react";
import Link from "next/link"; // Imported Next.js Link component
import { PersonPlusFill } from "react-bootstrap-icons";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side validation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Simulating minor network delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      /* 
        Saves user credentials directly to local storage. 
        You can check these variables on your LoginPage dynamically if needed!
      */
      localStorage.setItem("registeredEmail", formData.email);
      localStorage.setItem("registeredPassword", formData.password);
      localStorage.setItem("registeredName", formData.fullName);

      // Redirect seamlessly to the login layout page route
      window.location.href = "/auth/login";
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-screen d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card w-100 p-4 p-sm-5 border-0 rounded-4 shadow-lg" style={{ maxWidth: "440px", backgroundColor: "#ffffff" }}>

        {/* Header Branding */}
        <div className="text-center mb-4">
          <img src="/fasto.png" alt="Fasto Logo" width="42" height="42" />

          <h2 className="fw-extrabold text-dark tracking-tight mb-1" style={{ fontSize: "1.75rem" }}>
            Create an account
          </h2>
          <p className="text-muted small">
            Already have an account?{" "}
            {/* Swapped standard anchor tag with Next.js Link component */}
            <Link href="/auth/login" className="fw-semibold text-decoration-none" style={{ color: "#43DC80" }}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="alert alert-danger rounded-3 py-2 px-3 small border-0 mb-4 d-flex align-items-center" role="alert">
            <span className="fw-bold me-1">Error:</span> {error}
          </div>
        )}

        {/* Core Sign Up Form */}
        <form onSubmit={handleSubmit}>

          {/* Full Name Field */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-semibold text-secondary small mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="form-control rounded-3 py-2.5 px-3"
              style={{ fontSize: "0.9rem", borderColor: "#dee2e6" }}
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary small mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-3 py-2.5 px-3"
              style={{ fontSize: "0.9rem", borderColor: "#dee2e6" }}
              placeholder="admin@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold text-secondary small mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="form-control rounded-3 py-2.5 px-3"
              style={{ fontSize: "0.9rem", borderColor: "#dee2e6" }}
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary small mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control rounded-3 py-2.5 px-3"
              style={{ fontSize: "0.9rem", borderColor: "#dee2e6" }}
              placeholder="••••••••"
            />
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="form-check d-flex align-items-center small mb-4 m-0">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="form-check-input"
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="terms" className="form-check-label text-muted ms-2 user-select-none" style={{ cursor: "pointer" }}>
              I agree to the <a href="#" className="text-decoration-none" style={{ color: "#43DC80" }}>Terms & Conditions</a>
            </label>
          </div>

          {/* Submit Action Button */}
          <div className="d-grid">
            <button
              type="submit"
              disabled={loading}
              className="btn text-white fw-semibold rounded-3 py-2.5 shadow"
              style={{
                backgroundColor: "#43DC80",
                borderColor: "#43DC80",
                fontSize: "0.95rem",
                opacity: loading ? 0.75 : 1
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Creating Account...
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <PersonPlusFill size={18} />
                  Sign up
                </div>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}