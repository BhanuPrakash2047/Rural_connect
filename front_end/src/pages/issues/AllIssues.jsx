import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIssues } from "../../utils/issuesUtil.js"; // Import fetch function
import { Link } from "react-router-dom";

const AllIssues = () => {
  const dispatch = useDispatch();
  const { allIssues, loading, error } = useSelector((state) => state.issues); // Get issues from Redux store

  useEffect(() => {
    dispatch(fetchAllIssues()); // Fetch all issues when component mounts
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">📋 All Reported Issues</h2>

      {/* Loading State */}
      {loading && <p className="text-blue-500 text-center">Loading issues...</p>}

      {/* Error State */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Issues List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
          {allIssues.length > 0 ? (
            allIssues.map((issue) => (
              
              <div
                key={issue.id}
                className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-green-500 hover:shadow-xl transition-all"
              >
                <Link to ={`/issues/issue/${issue.id}`}>
                <h3 className="text-xl font-semibold text-green-700">{issue.title}</h3>
                <p className="text-gray-700 text-sm mt-2">{issue.description}</p>
                <p className="text-sm text-gray-500 mt-2">📍 {issue.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Category: {issue.category}</span>
                  <span className="text-sm font-semibold text-blue-500">{issue.status}</span>
                </div>
                </Link>
              </div>
              
            ))
          ) : (
            <p className="text-center text-gray-500">No issues found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
