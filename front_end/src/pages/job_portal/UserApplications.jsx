/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserApplications } from '../../redux_store/JobReduxSlice';

const UserApplicationsPage = () => {
  const dispatch = useDispatch();
  const { userApplications, loading, error, success, message } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getUserApplications());
  }, [dispatch]);

  // Add debugging logs
  useEffect(() => {
    console.log("User Applications:", userApplications);
    console.log("Error:", error);
    console.log("Message:", message);
  }, [userApplications, error, message]);

//   const handleWithdraw = (jobId) => {
//     if (window.confirm('Are you sure you want to withdraw this application?')) {
//       dispatch(withdrawApplication(jobId));
//     }
//   };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }
  
  if(!userApplications) {
    return (
      <div className="flex justify-center items-center h-64">
        <strong>Loading...</strong>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold text-[#14532D] mb-6">My Applications</h1>
      
      {error && (
        <div className="p-4 mb-6 bg-red-100 text-red-700 rounded-md">
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </div>
      )}
      
      {success && (
        <div className="p-4 mb-6 bg-green-100 text-green-700 rounded-md">
          {typeof message === 'object' ? JSON.stringify(message) : message}
        </div>
      )}
      
      {userApplications.length === 0 ? (
        <div className="p-4 text-center text-gray-600 bg-gray-100 rounded-md">
          <p>You haven't applied to any jobs yet.</p>
          <Link to="/jobs" className="mt-2 inline-block text-green-700 hover:underline">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {userApplications.map((application, index) => {
            // Skip rendering if application or job data is missing
            if (!application || !application.job) {
              console.error("Missing application data:", application);
              return null;
            }
            
            // Safely format the date
            let formattedDate = '';
            try {
              formattedDate = application.appliedAt ? 
                new Date(application.appliedAt).toLocaleDateString() : 
                'Unknown date';
            } catch (e) {
              console.error("Date formatting error:", e);
              formattedDate = 'Invalid date';
            }
            
            return (
              <div 
                key={application.id || index} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      <Link to={`/jobs/job/${application.job?.id || ''}`} className="text-blue-600 hover:underline">
                        {application.job?.title || 'Untitled Job'}
                      </Link>
                    </h2>
                    <div className="text-gray-600">
                      {application.job?.companyName || 'Company'} - {application.job?.location || 'Location'}
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Applied on: {formattedDate}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                      ${application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        application.status === 'WITHDRAWN' ? 'bg-gray-100 text-gray-800' :
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {application.status || 'UNKNOWN'}
                    </span>
                  </div>
                </div>
                
                {/* {application.status === 'PENDING' && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleWithdraw(application.job?.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Withdraw Application
                    </button>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserApplicationsPage;