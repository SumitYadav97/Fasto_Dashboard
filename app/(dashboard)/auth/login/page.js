"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BoxArrowInRight } from "react-bootstrap-icons";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");

    const isValidSavedUser = storedEmail && storedPassword && formData.email === storedEmail && formData.password === storedPassword;
    const isValidAdmin = formData.email === "admin@example.com" && formData.password === "password123";

    if (isValidSavedUser || isValidAdmin) {
      localStorage.setItem("login", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email address or password.");
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="card w-100 p-4 p-sm-5 border-0 rounded-4 shadow-lg" style={{ maxWidth: "440px", backgroundColor: "#ffffff" }}>

        {/* Title Branding */}
        <div className="text-center mb-4">
          <div
            className="mx-auto rounded-3 d-flex align-items-center justify-content-center text-white fw-bold fs-2 shadow-sm mb-3"
            style={{ width: "48px", height: "48px", backgroundColor: "#50E98D" }}
          >
            F
          </div>
          <h2 className="fw-extrabold text-dark tracking-tight mb-1" style={{ fontSize: "1.75rem" }}>
            Welcome back
          </h2>
          <p className="text-muted small">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="fw-semibold text-decoration-none" style={{ color: "#4f46e5" }}>
              Sign up free
            </Link>
          </p>
        </div>
        {/* Error Display */}
        {error && (
          <div className="alert alert-danger rounded-3 py-2 px-3 small border-0 mb-4 d-flex align-items-center" role="alert">
            <span className="fw-bold me-1">Error:</span> {error}
          </div>
        )}
        {/* Input Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary small mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-3 py-2.5 px-3"
              style={{ fontSize: "0.9rem" }}
              placeholder="admin@example.com"
            />
          </div>
          <div className="mb-4">
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
              style={{ fontSize: "0.9rem" }}
              placeholder="••••••••"
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              disabled={loading}
              className="btn text-white fw-semibold rounded-3 py-2.5 shadow"
              style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5", fontSize: "0.95rem" }}
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <BoxArrowInRight size={18} />
                  Sign in
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}