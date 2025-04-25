/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkEligibility } from '../../redux_store/schemeSlice';
import {
  genderEnums,
  casteEnums,
  residenceEnums,
  booleanEnums,
  employmentStatusEnums,
  occupationEnums,
  stateEnums,
  categoryEnums
} from '../../assets/CategoryEnums.js';
import { useParams } from 'react-router-dom';

// Step components
const PersonalInfoStep = ({ formData, setFormData, nextStep }) => {
  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            value={formData.gender || ''}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            {genderEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            value={formData.state || ''}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select State</option>
            {stateEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Caste</label>
          <select
            value={formData.caste || ''}
            onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Caste</option>
            {casteEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const DemographicInfoStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const [showDisabilityPercentage, setShowDisabilityPercentage] = useState(
    formData.differentlyAbled === 'YES'
  );

  const handleDifferentlyAbledChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, differentlyAbled: value });
    setShowDisabilityPercentage(value === 'YES');
  };

  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Demographic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Residence</label>
          <select
            value={formData.residence || ''}
            onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Residence</option>
            {residenceEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Minority</label>
          <select
            value={formData.minority || ''}
            onChange={(e) => setFormData({ ...formData, minority: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Option</option>
            {booleanEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Differently Abled</label>
          <select
            value={formData.differentlyAbled || ''}
            onChange={handleDifferentlyAbledChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Option</option>
            {booleanEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {showDisabilityPercentage && (
          <div>
            <label className="block text-sm font-medium mb-1">Disability Percentage</label>
            <input
              type="number"
              value={formData.disabilityPercentage || ''}
              onChange={(e) =>
                setFormData({ ...formData, disabilityPercentage: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
              min="0"
              max="100"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Below Poverty Line</label>
          <select
            value={formData.belowPovertyLine || ''}
            onChange={(e) => setFormData({ ...formData, belowPovertyLine: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Option</option>
            {booleanEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const EmploymentInfoStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Employment Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Government Employee</label>
          <select
            value={formData.governmentEmployee || ''}
            onChange={(e) => setFormData({ ...formData, governmentEmployee: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Option</option>
            {booleanEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Employment Status</label>
          <select
            value={formData.employmentStatus || ''}
            onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            {employmentStatusEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Student</label>
          <select
            value={formData.student || ''}
            onChange={(e) => setFormData({ ...formData, student: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Option</option>
            {booleanEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Occupation</label>
          <select
            value={formData.occupation || ''}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Occupation</option>
            {occupationEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categoryEnums.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const SchemeSpecificStep = ({ formData, setFormData, submitForm, prevStep }) => {
  const [criterias, setCriterias] = useState(formData.schemeSpecificCriterias || {});
  const { selectedScheme } = useSelector((state) => state.schemes);
  console.log("this is ")
  console.log(selectedScheme.schemeSpecificCriterias)

      // Ensure selectedScheme exists before accessing properties
      if (!selectedScheme || !Array.isArray(selectedScheme.schemeSpecificCriterias)) {
        return null; // Handle cases where data is not available
    }

    // Manipulating objects in the array
    const updatedCriteria = selectedScheme.schemeSpecificCriterias.map(criteria => ({
        ...criteria, // Keep existing properties
        id:criteria.criteria,
        label:criteria.criteria
    }));


  
  // In a real app, you would fetch scheme-specific criterias for the selected scheme
  // This is a placeholder - you should replace with actual data fetching


  const handleCriteriaChange = (id, value) => {
    const updatedCriterias = { ...criterias, [id]: value === 'YES' };
    setCriterias(updatedCriterias);
    setFormData({ ...formData, schemeSpecificCriterias: updatedCriterias });
  };

  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Scheme-Specific Requirements</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please answer the following questions specific to this scheme:
      </p>
      <div className="space-y-4">
        {updatedCriteria.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <select
              value={criterias[field.id] ? 'YES' : criterias[field.id] === false ? 'NO' : ''}
              onChange={(e) => handleCriteriaChange(field.id, e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Option</option>
              {booleanEnums.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={submitForm}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Check Eligibility
        </button>
      </div>
    </div>
  );
};

const EligibilityResult = ({ result, resetForm }) => {
  const { eligible, reasons } = result || { eligible: false, reasons: [] };

  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Eligibility Results</h2>
      <div className={`p-4 mb-4 rounded-lg ${eligible ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center">
          {eligible ? (
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          <h3 className={`font-bold ${eligible ? 'text-green-600' : 'text-red-600'}`}>
            {eligible ? 'You are eligible for this scheme!' : 'You are not eligible for this scheme'}
          </h3>
        </div>
      </div>

      {!eligible && reasons && reasons.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Reasons:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {reasons.map((reason, index) => (
              <li key={index} className="text-gray-700">{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Check Another Scheme
        </button>
      </div>
    </div>
  );
};

const EligibilityChecker = () => {
    const { schemeId } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    caste: '',
    residence: '',
    minority: '',
    differentlyAbled: '',
    disabilityPercentage: '',
    belowPovertyLine: '',
    governmentEmployee: '',
    employmentStatus: '',
    student: '',
    occupation: '',
    category: '',
    schemeSpecificCriterias: {}
  });

  const { eligibility, loading, error } = useSelector((state) => state.schemes);
  useEffect(() => {
    if (eligibility && !loading && !error) {
        setStep(5);
    }
}, [eligibility, loading, error]);


  const dispatch = useDispatch();


  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      age: '',
      gender: '',
      state: '',
      caste: '',
      residence: '',
      minority: '',
      differentlyAbled: '',
      disabilityPercentage: '',
      belowPovertyLine: '',
      governmentEmployee: '',
      employmentStatus: '',
      student: '',
      occupation: '',
      category: '',
      schemeSpecificCriterias: {}
    });
  };


  const submitForm = async () => {
    try {
        await dispatch(checkEligibility({ schemeId, userData: formData })); 
        console.log("Form submitted:", formData);
        setStep(5); // Ensure transition to the eligibility results step
    } catch (error) {
        console.error("Error checking eligibility:", error);
    }
};
  // Progress indicator
  const renderProgressBar = () => {
    const totalSteps = 5; // Including results step
    const percentage = ((step - 1) / (totalSteps - 1)) * 100;

    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Step {Math.min(step, 4)} of 4</span>
          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Display loading state
  if (step === 5 && loading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center">
        {renderProgressBar()}
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your eligibility...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (step === 5 && error) {
    return (
      <div className="p-4">
        {renderProgressBar()}
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {renderProgressBar()}
      
      {step === 1 && (
        <PersonalInfoStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      
      {step === 2 && (
        <DemographicInfoStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 3 && (
        <EmploymentInfoStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      
      {step === 4 && (
        <SchemeSpecificStep
          formData={formData}
          setFormData={setFormData}
          submitForm={submitForm}
          prevStep={prevStep}
          schemeId={schemeId}
        />
      )}
      
      {step === 5 && (
        <EligibilityResult
          result={eligibility}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};

export default EligibilityChecker;