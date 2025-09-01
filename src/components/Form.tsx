import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

interface FormProps {
  route: string;
  method: "login" | "register";
}

const Form: React.FC<FormProps> = ({ route, method }) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined, general: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(route, formData);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
      setLoading(false);
      // On success, redirect or show success message
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErrors({ general: "Login failed. Please check your credentials." });
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">{name}</h2>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label
          className="login-form-label"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="login-form-input"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        {errors.username && (
          <div className="login-form-error">{errors.username}</div>
        )}

        <label
          className="login-form-label"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="login-form-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {errors.password && (
          <div className="login-form-error">{errors.password}</div>
        )}

        {errors.general && (
          <div className="login-form-error">{errors.general}</div>
        )}

        <button
          className="login-form-button"
          type="submit"
          disabled={loading}
        >
          {method === "login" ? "Login" : "Register"}
          {/* {loading ? "Logging in..." : "Login"} */}
        </button>
      </form>
    </div>
  );
};

export default Form;
