import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data.leads);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err) {
      toast.success("Lead Deleted Successfully");
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const won = leads.filter((l) => l.status === "Won").length;
  const lost = leads.filter((l) => l.status === "Lost").length;

  const badgeClass = (status) => {
    switch (status) {
      case "New":
        return "badge badge-new";
      case "Contacted":
        return "badge badge-contacted";
      case "Qualified":
        return "badge badge-qualified";
      case "Won":
        return "badge badge-won";
      case "Lost":
        return "badge badge-lost";
      default:
        return "badge bg-secondary";
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

      <div className="container mt-4">

        <h2 className="mb-4 fw-bold">
          Dashboard
        </h2>

        {/* Statistics Cards */}

        <div className="row g-4">

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-primary shadow">
              <h5>Total</h5>
              <h2>{total}</h2>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-info shadow">
              <h5>Contacted</h5>
              <h2>{contacted}</h2>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-secondary shadow">
              <h5>New</h5>
              <h2>{newLeads}</h2>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-warning shadow">
              <h5>Qualified</h5>
              <h2>{qualified}</h2>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-success shadow">
              <h5>Won</h5>
              <h2>{won}</h2>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="dashboard-card bg-danger shadow">
              <h5>Lost</h5>
              <h2>{lost}</h2>
            </div>
          </div>

        </div>

        {/* Search Card */}

        <div className="search-card mt-4">

          <div className="row">

            <div className="col-md-8">

              <input
                className="form-control"
                placeholder="🔍 Search by Name, Email or Company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="col-md-4">

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Won</option>
                <option>Lost</option>
              </select>

            </div>

          </div>

        </div>

        {/* Leads Table */}

        <div className="table-responsive mt-4">

          <table className="table table-hover align-middle">

            <thead>

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredLeads.length === 0 ? (

                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No Leads Found
                  </td>
                </tr>

              ) : (

                filteredLeads.map((lead, index) => (

                  <tr key={lead._id}>

                    <td>{index + 1}</td>

                    <td>{lead.name}</td>

                    <td>{lead.email}</td>

                    <td>{lead.phone}</td>

                    <td>{lead.company}</td>

                    <td>
                      <span className={badgeClass(lead.status)}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="text-center">

                      <Link
                        className="btn btn-warning btn-sm me-2"
                        to={`/edit/${lead._id}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteLead(lead._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Dashboard;