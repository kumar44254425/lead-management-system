import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AddLead() {
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/leads", lead);

      toast.success("Lead Added Successfully");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to Add Lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-lg border-0">

              <div className="card-header bg-primary text-white">

                <h3 className="mb-0">
                  ➕ Add New Lead
                </h3>

              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Full Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={lead.name}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={lead.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                      />

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={lead.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Company
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={lead.company}
                        onChange={handleChange}
                        placeholder="Enter Company"
                      />

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={lead.status}
                      onChange={handleChange}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Qualified</option>
                      <option>Won</option>
                      <option>Lost</option>
                    </select>

                  </div>

                  <div className="d-flex justify-content-between">

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/dashboard")}
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Lead"}
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddLead;