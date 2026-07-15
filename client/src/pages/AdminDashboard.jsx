import { useEffect, useState } from "react";
import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import ComplaintCard from "../components/ComplaintCard";
import CreateNotice from "../components/CreateNotice";
import NoticeCard from "../components/NoticeCard";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);

  const [search, setSearch] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    fetchComplaints();
    fetchNotices();
  }, []);

 const fetchComplaints = async () => {
  try {
    const res = await API.get("/complaints/all");

    const updatedComplaints = res.data.complaints.map((complaint) => {

      const createdDate = new Date(complaint.createdAt);
      const today = new Date();

      const diffDays =
        (today - createdDate) / (1000 * 60 * 60 * 24);

      return {
        ...complaint,
        overdue:
          diffDays >=7 &&
          complaint.status !== "Resolved",
      };
    });

    setComplaints(updatedComplaints);

  } catch (error) {
    console.log(error);
  }
};

  const fetchNotices = async () => {
    try {
      const res = await API.get("/notices");
      setNotices(res.data.notices);
    } catch (error) {
      console.log(error);
    }
  };
  const createNotice = async (data) => {
  try {
    await API.post("/notices", data);
    fetchNotices();
  } catch (error) {
    console.log(error);
  }
};
  const deleteNotice = async (id) => {
  try {
    await API.delete(`/notices/${id}`);
    fetchNotices();
  } catch (error) {
    console.log(error);
  }
};

  // Update Complaint Status & Priority
   const updateComplaint = async (
  id,
  status,
  priority,
  assignedTo
) => {
  try {
    await API.put(`/complaints/status/${id}`, {
      status,
      priority,
      assignedTo,
    });

    fetchComplaints();
  } catch (error) {
    console.log(error);
  }
};

  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const overdue = complaints.filter(
  (c) => c.overdue
).length;

  // =====================
// Search & Filter Logic
// =====================
const filteredComplaints = complaints.filter((complaint) => {

  const matchesSearch =
    complaint.title.toLowerCase().includes(search.toLowerCase()) ||
    complaint.description.toLowerCase().includes(search.toLowerCase()) ||
    complaint.resident?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    categoryFilter === "All" ||
    complaint.category === categoryFilter;

  const matchesStatus =
    statusFilter === "All" ||
    complaint.status === statusFilter;

  const matchesPriority =
    priorityFilter === "All" ||
    complaint.priority === priorityFilter;

  return (
    matchesSearch &&
    matchesCategory &&
    matchesStatus &&
    matchesPriority
  );
});

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        <DashboardCard
          title="Total Complaints"
          value={total}
          bgColor="bg-white"
          textColor="text-gray-800"
        />

        <DashboardCard
          title="Pending"
          value={pending}
          bgColor="bg-yellow-100"
          textColor="text-yellow-700"
        />

        <DashboardCard
          title="In Progress"
          value={progress}
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />

        <DashboardCard
          title="Resolved"
          value={resolved}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />

        <DashboardCard
        title="Overdue"
        value={overdue}
        bgColor="bg-red-100"
        textColor="text-red-700"
        />

      </div>

      {/* ================= Complaints by Category ================= */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Complaints by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            <DashboardCard
            title="Electrical"
            value={complaints.filter(c => c.category === "Electrical").length}
            bgColor="bg-yellow-100"
            textColor="text-yellow-700"
            />

            <DashboardCard
            title="Plumbing"
            value={complaints.filter(c => c.category === "Plumbing").length}
            bgColor="bg-blue-100"
            textColor="text-blue-700"
            />

            <DashboardCard
            title="Cleaning"
            value={complaints.filter(c => c.category === "Cleaning").length}
            bgColor="bg-green-100"
            textColor="text-green-700"
            />

            <DashboardCard
            title="Security"
            value={complaints.filter(c => c.category === "Security").length}
            bgColor="bg-purple-100"
            textColor="text-purple-700"
            />

            <DashboardCard
            title="Other"
            value={complaints.filter(c => c.category === "Other").length}
            bgColor="bg-gray-100"
            textColor="text-gray-700"
            />

        </div>

        </div>


      {/* Complaint List */}

      <div className="space-y-6">

        {complaints.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No complaints available.
          </div>

        ) : (

          filteredComplaints.map((complaint) => (

            <ComplaintCard
              key={complaint._id}
              title={complaint.title}
              description={complaint.description}
              resident={complaint.resident?.name}
              flat={complaint.resident?.flatNumber}
              status={complaint.status}
              priority={complaint.priority}
              assignedTo={complaint.assignedTo}
              overdue={complaint.overdue}
            >

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Status */}

                <div>

                  <label className="block font-semibold mb-2">
                    Update Status
                  </label>

                  <select
                    disabled={complaint.status === "Resolved"}
                    value={complaint.status}
                    onChange={(e) =>
                      updateComplaint(
                        complaint._id,
                        e.target.value,
                        complaint.priority,
                        complaint.assignedTo
                    )
                    }
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                  </select>

                </div>

                {/* Priority */}

                <div>

                  <label className="block font-semibold mb-2">
                    Update Priority
                  </label>

                  <select
                    disabled={complaint.status === "Resolved"}
                    value={complaint.priority}
                    onChange={(e) =>
                      updateComplaint(
                        complaint._id,
                        complaint.status,
                        e.target.value,
                        complaint.assignedTo
                      )
                    }
                    className="w-full border rounded-lg p-2"
                  >

                    <option value="Unassigned">
                        Unassigned
                        </option>

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                  </select>

                </div>

                {/* Assign To */}

<div>

  <label className="block font-semibold mb-2">
    Assign To
  </label>

  <select
    disabled={complaint.status === "Resolved"}
    value={complaint.assignedTo}
    onChange={(e) =>
      updateComplaint(
        complaint._id,
        complaint.status,
        complaint.priority,
        e.target.value
      )
    }
    className="w-full border rounded-lg p-2"
  >

    <option value="Unassigned">
      Unassigned
    </option>

    <option value="Electrician">
      Electrician
    </option>

    <option value="Plumber">
      Plumber
    </option>

    <option value="Cleaner">
      Cleaner
    </option>

    <option value="Security">
      Security
    </option>

    <option value="Gardener">
      Gardener
    </option>

    <option value="General Maintenance">
      General Maintenance
    </option>

  </select>

</div>

              </div>

            </ComplaintCard>

          ))

        )}

      </div>

      {/* ================= Notice Board ================= */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Society Notice Board
        </h2>

        <CreateNotice onSubmit={createNotice} />

        <div className="space-y-4 mt-8">

          {notices.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-5">
              No Notices Available
            </div>

          ) : (

            notices.map((notice) => (

              <NoticeCard
                key={notice._id}
                title={notice.title}
                description={notice.description}
                date={new Date(notice.createdAt).toLocaleDateString()}
                important={notice.important}
                showDelete={true}
                onDelete={() => deleteNotice(notice._id)}
              />

            ))

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}