/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { likedIssuesByUser } from "../../utils/issuesUtil";
import IssueCard from "./IssueCard";

const LikedIssues = () => {
  const dispatch = useDispatch();
  const { likedIssues, loading, error } = useSelector((state) => state.issues);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(likedIssuesByUser());
  }, [dispatch]);

  // Ensure likedIssues is an array before filtering
  const issuesArray = Array.isArray(likedIssues) ? likedIssues : [];

  // Filter issues based on search term
  const filteredIssues = issuesArray.filter(
    (issue) =>
      issue?.issue?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue?.issue?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue?.issue?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue?.issue?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Format error message to handle if error is an object
  const getErrorMessage = (err) => {
    if (!err) return "An unknown error occurred";
    if (typeof err === 'string') return err;
    if (typeof err === 'object') {
      if (err.message) return err.message;
      return JSON.stringify(err);
    }
    return String(err);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{getErrorMessage(error)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Issues You've Liked</h1>
          <p className="mt-2 text-gray-600">
            Track and revisit the issues that matter most to you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search issues by title, description, category or location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {!Array.isArray(likedIssues) || likedIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No liked issues yet</h3>
            <p className="mt-1 text-gray-500">
              You haven't liked any issues. Browse and like issues to see them here.
            </p>
            <div className="mt-6">
              <Link
                to="/all-issues"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">No matching issues found</h3>
            <p className="mt-1 text-gray-500">
              Try changing your search term to find what you're looking for.
            </p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredIssues.map((voteItem) => {
              // Ensure we have a valid issue object before rendering
              if (!voteItem?.issue) return null;
              
              return (
                <motion.div key={voteItem?.id || `item-${Math.random()}`} variants={item}>
                  <Link to={`/issues/issue/${voteItem?.issue?.id}`}>
                    <div className="h-full">
                      <IssueCard issue={voteItem?.issue} showVotes={true} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LikedIssues;