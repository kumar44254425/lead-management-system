import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form);

      toast.success("Registration Successful");

      navigate("/");
    } catch (err) {
     toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="text-center mb-4">

          <h1>📝</h1>

          <h2 className="fw-bold">
            Create Account
          </h2>

          <p className="text-muted">
            Register to manage your leads
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

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
              placeholder="Create Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <hr />

        <p className="text-center">

          Already have an account?

          <Link
            to="/"
            className="ms-2 text-decoration-none fw-bold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;