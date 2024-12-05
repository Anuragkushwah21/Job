import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { Id } = useParams();
  const [formData, setFormData] = useState({
     
    title: "",
    description: "",
    category: "",
    country: "",
    keySkill: "",
    location: "",
    jobType: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
  });

  // Fetch jobs posted by the employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/employerJobs");
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  // Delete job function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return; // Exit if user cancels
    }
    try {
      await axios.delete(`/api/delete/${id}`);
      // Update job list after successful deletion
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete the job.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/update/${Id}`, formData);
      toast.success(response.data.message || "Job updated successfully!");
      onClose(); // Close modal on success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update job. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Jobs Posted By You
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-lg font-bold mb-2">{job.title}</h5>
                <p className="text-sm mb-2">
                  <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                  {job.location}
                </p>
                <p className="text-sm mb-2">
                  <i className="far fa-clock text-blue-600 mr-2"></i>
                  {job.jobType}
                </p>
                <p className="text-sm mb-2">
                  <i className="far fa-money-bill-alt text-blue-600 mr-2"></i>₹{" "}
                  {job.fixedSalary || `${job.salaryFrom} - ${job.salaryTo}`}
                </p>
                <p className="text-sm">
                  <i className="far fa-calendar-alt text-blue-600 mr-2"></i>
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    className="btn btn-danger text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
                    onClick={() => handleDelete(job._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <div>
                    <button
                     onClick={() => openModal(job._id)}
                      className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button>
                      <Link
                        to={`/job/me/` + job._id}
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No jobs posted yet.
            </div>
          )}
        </div>
      </div>

      {/* updatedJob */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="text-lg font-semibold">Update Job's</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}

            <div className="container mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block font-bold text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    // value={title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Your Title"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    // value={description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Your Description"
                  />
                </div>

                {/* <div className="mb-4">
                      <label className="block font-bold text-gray-700">
                        Category
                      </label>
                      <select
                        className="form-control"
                        // value={category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {selectedCategory.map((cat, index) => (
                          <option key={index} value={cat.categoryName}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                    </div> */}

                <div className="mb-4">
                  <label className="block font-bold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    // value={country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Your Country"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-gray-700">
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    // value={jobType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Choose The Job Type</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-gray-700">
                    Key Skills
                  </label>
                  <input
                    type="text"
                    name="city"
                    // value={keySkill}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Your City"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-bold text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    // value={location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Your Location"
                  />
                </div>

                {/* Salary */}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Create Job
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyJobs;
