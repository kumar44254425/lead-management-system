import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow">
      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/dashboard"
        >
          🚀 Lead Management System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item me-3 text-white">
              Welcome 👋
            </li>

            <li className="nav-item me-2">
              <Link
                to="/dashboard"
                className="btn btn-light"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item me-2">
              <Link
                to="/add"
                className="btn btn-success"
              >
                + Add Lead
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;