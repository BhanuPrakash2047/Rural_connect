import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobsByTitle, clearJobsList } from '../../redux_store/JobReduxSlice';
import { Link } from 'react-router-dom';

const SearchJobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearJobsList());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (jobTitle.trim()) {
      dispatch(searchJobsByTitle(jobTitle));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#14532D] mb-6">Search Jobs by Title</h1>
      
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title..."
          className="flex-grow p-2 border border-[#DCFCE7] rounded focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#16A34A] text-white py-2 px-6 rounded hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="border border-[#F3F4F6] rounded-lg p-4 hover:shadow-md transition duration-300 bg-[#F3F4F6]"
            >
              <h2 className="text-xl font-semibold text-[#16A34A]">{job.title}</h2>
              <div className="mt-2 text-gray-600">
                <p><span className="font-medium text-[#14532D]">Company:</span> {job.companyName}</p>
                <p><span className="font-medium text-[#14532D]">Location:</span> {job.location}</p>
                <p><span className="font-medium text-[#14532D]">Salary:</span> ${job.salary}</p>
              </div>
              <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p>
              <div className="mt-4">
                <Link 
                  to={`/jobs/job/${job.id}`}
                  className="inline-block bg-[#DCFCE7] text-[#16A34A] py-1 px-4 rounded hover:bg-[#16A34A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className="text-center p-8 text-gray-500">
          {jobTitle ? 'No jobs found matching this title' : 'Enter a job title to search'}
        </div>
      )}
      
      {loading && (
        <div className="text-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-[#16A34A] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-[#16A34A]">Loading jobs...</p>
        </div>
      )}
    </div>
  );
};

export default SearchJobsPage;