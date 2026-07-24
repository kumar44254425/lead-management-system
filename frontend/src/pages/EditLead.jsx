import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
  });

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const res = await API.get(`/leads/${id}`);
      setLead(res.data.lead);
    } catch (err) {
      alert("Unable to load lead");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const updateLead = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
      await API.put(`/leads/${id}`, lead);

      toast.success("Lead Updated Successfully");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loader">
          <div className="spinner-border text-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card shadow-lg border-0">

              <div className="card-header bg-warning">

                <h3 className="mb-0 text-dark">
                  ✏️ Edit Lead
                </h3>

              </div>

              <div className="card-body">

                <form onSubmit={updateLead}>

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
                        required
                      />

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Phone
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={lead.phone}
                        onChange={handleChange}
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
                      className="btn btn-warning"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Update Lead"}
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

export default EditLead;