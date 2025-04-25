import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopIssues } from "../../utils/issuesUtil"; // Import API function
import { Link } from "react-router-dom";

const TopIssues = () => {
  const [city, setCity] = useState(""); // Input state for city
  const dispatch = useDispatch();
  const { topIssues, loading, error } = useSelector((state) => state.issues); // Get top issues from Redux

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      dispatch(fetchTopIssues(city)); // Dispatch API call
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">📍 Top Issues in Your City</h2>

      {/* City Input */}
      <form onSubmit={handleSearch} className="flex gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Enter city name (e.g., New York)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 transition-all"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-blue-500 text-center">Fetching issues...</p>}

      {/* Error State */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Issues List */}
      {!loading && !error && topIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-blue-500 hover:shadow-xl transition-all"
            >
                          <Link to ={`/issues/issue/${issue.id}`}>

              <h3 className="text-xl font-semibold text-blue-700">{issue.title}</h3>
              <p className="text-gray-700 text-sm mt-2">{issue.description}</p>
              <p className="text-sm text-gray-500 mt-2">📍 {issue.location}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">Category: {issue.category}</span>
                <span className="text-sm font-semibold text-green-500">{issue.status}</span>
              </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No issues found for this city.</p>
      )}
    </div>
  );
};

export default TopIssues;
