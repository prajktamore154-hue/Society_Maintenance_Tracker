import { useEffect, useState } from "react";
import API from "../services/api";
import NoticeCard from "../components/NoticeCard";

export default function ResidentDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  const [complaints, setComplaints] = useState([]);

  const [notices, setNotices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
    fetchNotices();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data.complaints);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);

      if (image) {
        data.append("image", image);
      }

      const res = await API.post("/complaints", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);

      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
      });

      setImage(null);

      fetchComplaints();

    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Resident Dashboard
      </h1>

        {/* ================= Society Notices ================= */}

<div className="bg-white rounded-xl shadow-md p-6 mb-8">

  <h2 className="text-2xl font-bold text-blue-700 mb-5">
    📢 Society Notices
  </h2>

  {notices.length === 0 ? (

    <p className="text-gray-500">
      No notices available.
    </p>

  ) : (

    <div className="space-y-4">

      {notices.map((notice) => (

        <NoticeCard
          key={notice._id}
          title={notice.title}
          description={notice.description}
          date={new Date(notice.createdAt).toLocaleDateString()}
          important={notice.important}
        />

      ))}

    </div>

  )}

</div>


      {/* Complaint Form */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-5">
          Create Complaint
        </h2>

        {message && (
          <div className="mb-4 bg-blue-100 text-blue-700 p-3 rounded">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            className="w-full border rounded-lg p-3"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            rows="4"
            className="w-full border rounded-lg p-3"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="w-full border rounded-lg p-3"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Electrical">
              Electrical
            </option>

            <option value="Plumbing">
              Plumbing
            </option>

            <option value="Cleaning">
              Cleaning
            </option>

            <option value="Security">
              Security
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {/* Image */}

          <div>

            <label className="block font-semibold mb-2">
              Upload Complaint Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Submit Complaint
          </button>

        </form>

      </div>

      {/* Complaint List */}

      <div>

        <h2 className="text-2xl font-semibold mb-4">
          My Complaints
        </h2>

        {complaints.length === 0 ? (

          <div className="bg-white p-5 rounded-lg shadow">
            No complaints found.
          </div>

        ) : (

          <div className="space-y-5">

            {complaints.map((complaint) => (

              <div
                key={complaint._id}
                className="bg-white p-5 rounded-lg shadow"
              >

                <h3 className="text-2xl font-bold">
                  {complaint.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {complaint.description}
                </p>

                <p className="mt-3">
                  <strong>Category:</strong>{" "}
                  {complaint.category}
                </p>


                <p>

                  <strong>Status:</strong>{" "}

                  <span
                    className={`font-bold ${
                      complaint.status === "Resolved"
                        ? "text-green-600"
                        : complaint.status ===
                          "In Progress"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {complaint.status}
                  </span>

                </p>

                {complaint.assignedTo &&
 complaint.assignedTo !== "Unassigned" && (
  <p>
    <strong>Assigned To:</strong>{" "}
    <span className="text-blue-600 font-semibold">
      {complaint.assignedTo}
    </span>
  </p>
)}

<hr className="my-5" />

<h4 className="font-bold text-blue-700 mb-3">
  📜 Complaint History
</h4>

<div className="space-y-3">

  {complaint.history?.map((item) => (

    <div
      key={item._id}
      className="border-l-4 border-blue-500 pl-4"
    >

      <p className="font-semibold">
        {item.action}
      </p>

      <p className="text-sm text-gray-500">
        {new Date(item.timestamp).toLocaleString()}
      </p>

    </div>

  ))}

</div>


                {complaint.image && (

                  <div className="mt-4">

                    <img
                      src={`http://localhost:5000/uploads/${complaint.image}`}
                      alt="Complaint"
                      className="w-48 rounded-lg border"
                    />

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}