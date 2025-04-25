/* eslint-disable no-unused-vars */
import { useState } from "react";
import { getIssueByTitle, respondToAdminRequest } from "../../utils/issuesUtil.js";
import { FaUserTie } from "react-icons/fa";

const CheckIssueStatus = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDetails, setIssueDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch issue by title
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await getIssueByTitle(issueTitle);
      setIssueDetails(data);
    } catch (err) {
      setError("Issue not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle user response to admin request
  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (!responseMessage.trim()) return;

    try {
      await respondToAdminRequest(issueDetails.id, responseMessage);
      setIssueDetails((prev) => ({
        ...prev,
        response_from_user: responseMessage
      }));
      setResponseMessage("");
    } catch (err) {
      console.error("Error sending response:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">🔍 Check Issue Status</h2>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Enter issue title..."
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all">
          Search
        </button>
      </form>

      {/* Loading & Error Handling */}
      {loading && <p className="text-blue-500 text-center">Fetching issue details...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display Issue Details */}
      {issueDetails && (
        <div className="p-6 bg-gray-50 rounded-md shadow-md">
          <h3 className="text-2xl font-bold text-green-700">{issueDetails.title}</h3>
          <p className="text-gray-600 mt-2">{issueDetails.description}</p>
          <p className="text-sm text-gray-500 mt-2">📍 {issueDetails.location}</p>

          <div className="mt-5 p-4 bg-gray-100 rounded-md shadow-sm">
            <p className="text-gray-700"><strong>👤 Created By:</strong> {issueDetails.user.idno}</p>
            <p className="text-gray-700"><strong>📅 Created On:</strong> {new Date(issueDetails.createdAt).toLocaleString()}</p>
            <p className="text-gray-700">
              <strong>🛠 Last Updated:</strong> {issueDetails.updatedAt ? new Date(issueDetails.updatedAt).toLocaleString() : "Not Updated Yet"}
            </p>
            <p className="text-gray-700"><strong>📌 Status:</strong> {issueDetails.status}</p>
            <p className="text-gray-700"><strong>📌 Status_Description_From_Admin:</strong> {issueDetails.status_discription}</p>

            {/* Admin Assigned */}
            {issueDetails.assignedAdmin && (
              <div className="mt-3 p-3 bg-blue-100 rounded-md">
                <h3 className="text-lg font-bold text-blue-700">👮 Assigned Admin</h3>
                <p className="text-gray-700"><FaUserTie className="inline-block" /> {issueDetails.assignedAdmin.name}</p>
                <p className="text-gray-700">📧 {issueDetails.assignedAdmin.email}</p>
              </div>
            )}

            {/* Admin Request for More Details */}
            {issueDetails.response_from_admin && (
              <p className="mt-3 text-sm bg-yellow-100 p-2 rounded-md"><strong>📢 Admin Request:</strong> {issueDetails.response_from_admin}</p>
            )}

            {/* User Response Form (Only Show If Admin Requested Details) */}
            {issueDetails.response_from_admin && !issueDetails.response_from_user && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-700">📝 Respond to Admin</h3>
                <form onSubmit={handleResponseSubmit} className="mt-3">
                  <textarea
                    className="w-full p-3 border rounded-md focus:ring focus:ring-green-300"
                    placeholder="Write your response..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                  >
                    Submit Response
                  </button>
                </form>
              </div>
            )}

            {/* User's Response (if given) */}
            {issueDetails.response_from_user && (
              <p className="mt-3 text-sm bg-green-100 p-2 rounded-md"><strong>🗣️ User Response:</strong> {issueDetails.response_from_user}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckIssueStatus;
