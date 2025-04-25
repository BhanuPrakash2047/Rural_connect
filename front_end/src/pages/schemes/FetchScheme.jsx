import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchemeDetails } from '../../redux_store/schemeSlice.js';
import AddComment from './AddComment';
// import EligibilityChecker from './CheckEligibility.jsx';

const SchemeDetails = () => {
  const { id } = useParams();
  const schemeId=id;
  const dispatch = useDispatch();
  const { selectedScheme, loading, error } = useSelector((state) => state.schemes);
  // console.log("thisis selected scheme criteirsa"+selectedScheme.schemeSpecificCriterias);
  useEffect(() => {
    dispatch(fetchSchemeDetails(id));
  }, [dispatch, id]);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  if (!selectedScheme || !selectedScheme.scheme) {
    return <div className="text-center p-4">No scheme found</div>;
  }
  console.log(selectedScheme.applicationProcesses);

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
    <div>
      {/* Basic Scheme Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">{selectedScheme.scheme.schemeName}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">State:</span> {selectedScheme.scheme.state}</p>
            <p><span className="font-semibold">Category:</span> {selectedScheme.scheme.category}</p>
            <p><span className="font-semibold">Benefit Type:</span> {selectedScheme.scheme.benefitType}</p>
            <p><span className="font-semibold">DBT Scheme:</span> {selectedScheme.scheme.dbtScheme}</p>
          </div>
          <div>
            <p><span className="font-semibold">Age Range:</span> {selectedScheme.scheme.start_age} - {selectedScheme.scheme.end_age} years</p>
            <p><span className="font-semibold">Gender:</span> {selectedScheme.scheme.gender}</p>
            <p><span className="font-semibold">Caste:</span> {selectedScheme.scheme.caste}</p>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Eligibility Criteria</h2>
        <ul className="list-disc pl-5">
          {selectedScheme.eligibilities?.map((eligibility, index) => (
            <li key={index} className="mb-2">{eligibility.eligibilities}</li>
          ))}
        </ul>
      </div>

      {/* Document Requirements */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Required Documents</h2>
        <ul className="list-disc pl-5">
          {selectedScheme.documentRequirements?.map((doc, index) => (
            <li key={index} className="mb-2">{doc.documentName}</li>
          ))}
        </ul>
      </div>

      {/* Application Process */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Application Process</h2>
        <ol className="list-decimal pl-5">
          {selectedScheme.applicationProcesses?.map((step, index) => (
            <li key={index} className="mb-2 text-black">{step.steps}</li>
          ))}
        </ol>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Frequently Asked Questions</h2>
        {selectedScheme.faqs?.map((faq, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium mb-2">{faq.faqKey}</p>
            <p className="text-gray-600">{faq.faqValue}</p>
          </div>
        ))}
      </div>

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Criterias</h2>
        <ul className="list-disc pl-5">
          {selectedScheme.schemeSpecificCriterias?.map((eligibility, index) => (
            <li key={index} className="mb-2">{eligibility.criteria}</li>
          ))}
        </ul>
      </div>



      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Comments</h2>
        {selectedScheme.comments?.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 py-3">
            <p className="text-sm text-gray-500">
              {comment.user.name} - {new Date(comment.creationDate).toLocaleDateString()}
            </p>
            <p className="mt-1">{comment.comment}</p>
          </div>
        ))}
      </div>
      <AddComment schemeId={id} />
      
      {/* <EligibilityChecker schemeId={id} /> */}
      <button className="absolute top-5 right-5 px-4 py-2 bg-amber-600 text-white rounded shadow-lg hover:bg-amber-700 transition duration-300">
  <Link to={`/schemes/check-eligibiltity/${schemeId}`}> Check For Eligibility</Link>
</button>

    </div>
    </div>
    );
}

export default SchemeDetails;