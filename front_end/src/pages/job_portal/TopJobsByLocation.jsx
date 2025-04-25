import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopJobsByLocation, clearJobsList } from '../../redux_store/JobReduxSlice';
import { Link } from 'react-router-dom';
import JobCard from './JobCard'; // Assuming you have a JobCard component

const TopJobsByLocationPage = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [location, setLocation] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearJobsList());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      dispatch(getTopJobsByLocation(location));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#14532D] mb-6">Top Jobs by Location</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {jobs.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Top Jobs in {location}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      ) : !loading && location && (
        <div className="p-4 text-center text-gray-600">
          No top jobs found in {location}. Try another location or check back later.
        </div>
      )}

      {!location && !loading && (
        <div className="p-4 text-center text-gray-600">
          Enter a location to find top-rated jobs in that area.
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link to="/jobs" className="text-green-700 hover:underline">
          View all jobs
        </Link>
      </div>
    </div>
  );
};

export default TopJobsByLocationPage;