import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobById, updateJob, clearJobState } from '../../redux_store/JobReduxSlice.js';

const UpdateJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job, loading, error, success } = useSelector((state) => state.jobs);
  
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    companyName: '',
    salary: ''
  });
  
  useEffect(() => {
    dispatch(getJobById(jobId));
    
    return () => {
      dispatch(clearJobState());
    };
  }, [dispatch, jobId]);
  
  useEffect(() => {
    if (job) {
      setJobData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        companyName: job.companyName || '',
        salary: job.salary || ''
      });
    }
  }, [job]);
  
  useEffect(() => {
    if (success) {
      // Navigate back to job details after successful update
      navigate(`/jobs/job/${jobId}`);
    }
  }, [success, navigate, jobId]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: name === 'salary' ? parseInt(value, 10) || '' : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob({ jobId, jobData }));
  };
  
  if (loading && !job) {
    return (
      <div className="text-center p-16">
        <div className="animate-spin h-10 w-10 border-4 border-[#16A34A] border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-[#16A34A]">Loading job details...</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#14532D] mb-6">Update Job Listing</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-[#14532D] font-medium mb-1">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>
        
        <div>
          <label htmlFor="companyName" className="block text-[#14532D] font-medium mb-1">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={jobData.companyName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-[#14532D] font-medium mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>
        
        <div>
          <label htmlFor="salary" className="block text-[#14532D] font-medium mb-1">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-[#14532D] font-medium mb-1">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
          ></textarea>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#16A34A] text-white py-2 px-6 rounded hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Job'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate(`/jobs/${jobId}`)}
            className="bg-[#F3F4F6] text-gray-700 py-2 px-6 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobPage;