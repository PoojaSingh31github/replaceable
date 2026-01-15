import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      const errMsg = "Passwords do not match";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      const errMsg = "Password must be at least 6 characters";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    // Validate full name
    if (!formData.fullName.trim()) {
      const errMsg = "Full name is required";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const errMsg = "Please enter a valid email address";
      setError(errMsg);
      toast.error(errMsg);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.fullName
      );

      if (result.success) {
        toast.success("Registration successful! Redirecting to login...");
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      } else {
        // Error message is already cleaned up in AuthContext
        const errMsg = result.error || "Registration failed";
        setError(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      const errMsg = err.message || "An error occurred during registration";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-logo">
            Replace<span className="text-crimson">able</span>.ai
          </h1>
          <p className="login-subtitle">Admin Registration</p>
        </div>

        {success ? (
          <div className="login-success">
            <span>Registration successful! Redirecting to login...</span>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className={`form-input ${error && formData.email && error.includes('email') ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@replaceable.ai"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>
            Already have an account?{" "}
            <Link to="/admin/login" className="login-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
