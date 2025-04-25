/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { commentedIssuesByUser } from "../../utils/issuesUtil";
import IssueCard from "./IssueCard";

const CommentedIssues = () => {
  const dispatch = useDispatch();
  const { commentedIssues, loading, error } = useSelector((state) => state.issues);
  const [searchTerm, setSearchTerm] = useState("");
  const [uniqueIssues, setUniqueIssues] = useState([]);

  useEffect(() => {
    dispatch(commentedIssuesByUser());
  }, [dispatch]);

  useEffect(() => {
    // Process comments to get unique issues with their comment counts
    if (commentedIssues?.length > 0) {
      const issueMap = new Map();
      
      commentedIssues?.forEach(comment => {
        if (!issueMap.has(comment.issue.id)) {
          issueMap.set(comment.issue.id, {
            issue: comment.issue,
            commentCount: 1,
            lastCommentDate: new Date(comment?.time).toISOString()
          });
        } else {
          const existingIssue = issueMap.get(comment.issue.id);
          existingIssue.commentCount += 1;
          
          // Update last comment date if this comment is newer
          const currentCommentDate = new Date(comment.time);
          const existingCommentDate = new Date(existingIssue.lastCommentDate);
          
          if (currentCommentDate > existingCommentDate) {
            existingIssue.lastCommentDate = new Date(comment.time).toISOString();
          }
        }
      });
      
      setUniqueIssues(Array.from(issueMap.values()));
    }
  }, [commentedIssues]);

  // Filter issues based on search term
  const filteredIssues = uniqueIssues.filter(
    (item) =>
      item?.issue?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.issue?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.issue?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.issue?.location?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p>{typeof error === 'object' ? JSON.stringify(error) : error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Issues You've Commented On</h1>
          <p className="mt-2 text-gray-600">
            Follow up on discussions you've participated in
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

        {uniqueIssues?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No commented issues yet</h3>
            <p className="mt-1 text-gray-500">
              You haven't commented on any issues. Participate in discussions to see them here.
            </p>
            <div className="mt-6">
              <Link
                to="/issues/all-issues"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        ) : filteredIssues?.length === 0 ? (
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
            {filteredIssues.map((item) => (
              <motion.div key={item?.issue?.id} variants={item}>
                <Link to ={`/issues/issue/${item.issue.id}`}>
                <div className="h-full">
                    <IssueCard 
                      issue={item?.issue} 
                      showVotes={true} 
                      commentCount={item?.commentCount}
                      lastCommentDate={item?.lastCommentDate}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommentedIssues;