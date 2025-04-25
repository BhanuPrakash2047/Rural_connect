import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getJobApplications, getJobById, clearApplications } from '../../redux_store/JobReduxSlice';

const JobApplicationsPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applications, job, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (jobId) {
      dispatch(getJobById(jobId));
      dispatch(getJobApplications(jobId));
    }

    return () => {
      dispatch(clearApplications());
    };
  }, [dispatch, jobId]);

  // Add debugging logs
  useEffect(() => {
    console.log("Applications:", applications);
    console.log("Job:", job);
    console.log("Error:", error);
  }, [applications, job, error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  // Make sure error is displayed as a string
  if (error) {
    const errorMessage = typeof error === 'object' ? JSON.stringify(error) : error;
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
        <div className="mt-4">
          <Link to="/jobs" className="text-green-700 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
        <div className="p-4 text-center text-gray-600">
          Job not found
        </div>
        <div className="mt-4 text-center">
          <Link to="/jobs" className="text-green-700 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <div className="mb-6">
        <Link to={`/jobs/job/${jobId}`} className="text-green-700 hover:underline">
          &larr; Back to Job Details
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-[#14532D] mb-2">{job?.title || 'Job Title'}</h1>
      <h2 className="text-lg text-gray-600 mb-6">
        {job?.companyName || 'Company'} - {job?.location || 'Location'}
      </h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Applications ({applications?.length || 0})</h3>
        
        {!applications || applications.length === 0 ? (
          <div className="p-4 text-center text-gray-600 bg-gray-100 rounded-md">
            No applications yet for this job.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Applicant</th>
                  <th className="py-3 px-4 border-b text-left">Status</th>
                  <th className="py-3 px-4 border-b text-left">Applied On</th>
                  <th className="py-3 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application,index) => {
                  // Skip items with missing data
                  if (!application || !application.applicant) {
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
                    <tr key={application.id || index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b">
                        {application.applicant.fname || ''} {application.applicant.lname || ''}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                            application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                            application.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'}`}
                        >
                          {application.status || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formattedDate}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <Link 
                          to={`/applications/${application.id}`} 
                          className="text-blue-600 hover:underline mr-3"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsPage;