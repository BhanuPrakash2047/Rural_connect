import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../../redux_store/JobReduxSlice.js'

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.jobs);
  
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    companyName: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: name === 'salary' ? parseInt(value, 10) || '' : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(jobData));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#14532D] mb-6">Create New Job Listing</h1>
      
      {success && (
        <div className="bg-green-100 border-l-4 border-[#16A34A] p-4 mb-4">
          <p className="text-[#16A34A]">{message}</p>
        </div>
      )}
      
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
            value={jobData?.title}
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
            value={jobData?.companyName}
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
        
        <button
          type="submit"
          disabled={loading}
          className="bg-[#16A34A] text-white py-2 px-6 rounded hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJobPage;