import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="text-center mb-4">

          <h1>🚀</h1>

          <h2 className="fw-bold">
            Lead Management System
          </h2>

          <p className="text-muted">
            Welcome Back
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <hr />

        <p className="text-center">

          Don't have an account?

          <Link
            to="/register"
            className="ms-2 text-decoration-none fw-bold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;