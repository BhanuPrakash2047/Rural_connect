/* eslint-disable react/prop-types */
// import from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const IssueCard = ({ issue, showVotes = false, commentCount, lastCommentDate }) => {
  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Invalid date"+error;
    }
  };

  // Truncate description
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full border-l-4 border-green-500 flex flex-col"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              issue.status
            )}`}
          >
            {issue.status}
          </span>
          {showVotes && (
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{issue.count || 0}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(issue.description, 150)}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {issue.category}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {issue.location}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center text-sm text-gray-500">
        <div>
          <span className="font-medium">Created:</span> {formatDate(issue.createdAt)}
        </div>
        
        {commentCount && (
          <div className="flex items-center">
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{commentCount}</span>
          </div>
        )}
        
        {lastCommentDate && (
          <div>
            <span className="font-medium">Last comment:</span> {formatDate(lastCommentDate)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default IssueCard;