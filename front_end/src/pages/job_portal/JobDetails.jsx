/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById, applyForJob, flagJob, deleteJob } from '../../redux_store/JobReduxSlice';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job, loading, error, success, message } = useSelector((state) => state.jobs);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isEmployer, setIsEmployer] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    dispatch(getJobById(jobId));
    
    // // Check user roles from localStorage
    // const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    // setIsEmployer(roles.includes('ROLE_EMPLOYER'));
    // setIsAdmin(roles.includes('ROLE_ADMIN'));
    
    // // Check if current user is the job creator
    // const username = localStorage.getItem('username');
    // if (job && job.employer && job.employer.idno === username) {
    //   setIsEmployer(true);
    // }
  }, [dispatch, jobId]);

  const handleApply = () => {
    dispatch(applyForJob(jobId));
  };

  const handleFlag = () => {
    dispatch(flagJob(jobId));
  };

  const handleDelete = () => {
    dispatch(deleteJob(jobId));
    // Redirect after successful deletion
    if (success) {
      navigate('/jobs');
    }
  };

  const handleEdit = () => {
    navigate(`/jobs/edit/${jobId}`);
  };

  if (loading) {
    return (
      <div className="text-center p-16">
        <div className="animate-spin h-10 w-10 border-4 border-[#16A34A] border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-[#16A34A]">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto my-8 p-6 bg-red-100 border-l-4 border-red-500 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => navigate('/jobs')}
          className="mt-4 bg-[#16A34A] text-white py-2 px-4 rounded hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center p-16">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      {success && message && (
        <div className="bg-green-100 border-l-4 border-[#16A34A] p-4 mb-4">
          <p className="text-[#16A34A]">{message}</p>
        </div>
      )}
      
      <div className="border-b border-[#DCFCE7] pb-4 mb-4">
        <h1 className="text-2xl font-bold text-[#14532D]">{job?.title}</h1>
        <p className="text-xl text-[#16A34A] mt-1">{job?.companyName}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#14532D] mb-2">Job Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Location:</span> {job?.location}</p>
            <p><span className="font-medium">Salary:</span> ${job?.salary}</p>
            <p><span className="font-medium">Posted:</span> {new Date(job?.createdAt).toLocaleDateString()}</p>
            {job?.updatedAt && (
              <p><span className="font-medium">Last Updated:</span> {new Date(job?.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-[#14532D] mb-2">Employer Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Company:</span> {job?.companyName}</p>
            {job?.employer && (
              <>
                <p><span className="font-medium">Contact:</span> {job?.employer?.fname} {job?.employer?.lname}</p>
                <p><span className="font-medium">Email:</span> {job?.employer?.email}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#14532D] mb-2">Job Description</h2>
        <div className="bg-[#F3F4F6] p-4 rounded whitespace-pre-line">
          {job?.description}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="space-x-3">
          {isEmployer && (
            <button
              onClick={handleApply}
              className="bg-[#16A34A] text-white py-2 px-6 rounded hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300"
            >
              Apply for Job
            </button>
          )}
          
          <button
            onClick={handleFlag}
            className="border border-[#DCFCE7] text-[#14532D] py-2 px-4 rounded hover:bg-[#DCFCE7] focus:outline-none focus:ring-2 focus:ring-[#16A34A] transition duration-300"
          >
            Flag as Inappropriate
          </button>
        </div>
        
        {(isEmployer || isAdmin) && (
          <div className="space-x-3">
            <button
              onClick={handleEdit}
              className="bg-[#DCFCE7] text-[#16A34A] py-2 px-4 rounded hover:bg-[#16A34A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300"
            >
              Edit Job
            </button>
            
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="bg-red-100 text-red-600 py-2 px-4 rounded hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              Delete Job
            </button>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#14532D] mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="bg-[#F3F4F6] text-gray-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;