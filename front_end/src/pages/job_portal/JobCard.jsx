// import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const JobCard = ({ job }) => {
  // Format the date to a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days since posting
  const getDaysSincePosting = (dateString) => {
    const posted = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="border border-[#DCFCE7] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white">
      <div className="p-5">
        <div className="mb-3 flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#14532D] truncate">
            <Link to={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>
          <span className="bg-[#DCFCE7] text-[#16A34A] text-xs px-2 py-1 rounded-full">
            {getDaysSincePosting(job.createdAt) <= 3 ? 'New' : null}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-[#16A34A] font-medium">{job.companyName}</p>
          <p className="text-gray-600 text-sm">{job.location}</p>
          <p className="text-gray-700 mt-1">
            <span className="font-medium">Salary:</span> ${job.salary}
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 line-clamp-2 text-sm">
            {job.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted: {formatDate(job.createdAt)}</span>
          <Link 
            to={`/jobs/job/${job.id}`}
            className="text-[#16A34A] hover:text-[#14532D] font-medium hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};

export default JobCard;