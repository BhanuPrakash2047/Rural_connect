import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postIssue } from "../../utils/issuesUtil.js";
import { FaMapMarkerAlt, FaFileUpload } from "react-icons/fa"; // Importing icons

const PostIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    count: 0,
    response_from_admin: null,
    response_from_user: null,
    image: null, // File upload support
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postIssue(formData);
      toast.success("🎉 Issue posted successfully!", { position: "top-center" });
      setFormData({ title: "", description: "", location: "", category: "", image: null });
    } catch (error) {
      console.error("Failed to post issue:", error);
      toast.error("❌ Failed to post issue. Try again!", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10 transition-all duration-300">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-4">📢 Report an Issue</h2>

      {/* Toast Notifications */}
      <ToastContainer autoClose={3000} />

      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        {/* Issue Title */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Issue Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
            placeholder="Enter issue title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
            placeholder="Describe the issue..."
          />
        </div>

        {/* Location */}
        <div className="flex flex-col relative">
          <label className="text-gray-700 font-semibold">Location</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Enter location"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
          >
            <option value="">Select a category</option>
            <option value="Infrastructure">🏗️ Infrastructure</option>
            <option value="Health">🏥 Health</option>
            <option value="Education">📚 Education</option>
            <option value="Environment">🌿 Environment</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold flex items-center gap-2">
            <FaFileUpload className="text-gray-600" /> Attach Image (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all duration-300"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-white border-solid rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Posting...
            </>
          ) : (
            "🚀 Submit Issue"
          )}
        </button>
      </form>
    </div>
  );
};

export default PostIssue;
