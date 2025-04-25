import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postScheme } from "../../redux_store/schemeSlice.js";
import {
  categoryEnums,
  genderEnums,
  casteEnums,
  residenceEnums,
  benefitTypeEnums,
  employmentStatusEnums,
  occupationEnums,
  stateEnums,
  booleanEnums,
} from "../../assets/CategoryEnums.js";

const AddScheme = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.schemes);
  const [step, setStep] = useState(1);
  
  // Initialize dynamic field arrays
  const [benefits, setBenefits] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [documentRequirements, setDocumentRequirements] = useState([""]);
  const [eligibilities, setEligibilities] = useState([""]);
  const [applicationProcessSteps, setApplicationProcessSteps] = useState([""]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [sourceReferences, setSourceReferences] = useState([""]);
  const [schemeSpecificCriterias,setschemeSpecificCriterias] = useState([""]);
  
  const [schemeData, setSchemeData] = useState({
    schemeName: "",
    state: null,
    gender: null,
    start_age: null,
    end_age: null,
    caste: null,
    residence: null,
    minority: null,
    differentlyAbled: null,
    benefitType: null,
    dbtScheme:null,
    start_disabilityPercentage:null,
    end_disabilityPercentage: null,
    belowPovertyLine: null,
    governmentEmployee: null,
    employmentStatus: null,
    student: null,
    occupation: null,
    category: null,
  });

  const handleChange = (e) => {
    setSchemeData({ ...schemeData, [e.target.name]: e.target.value });
  };

  // Handlers for dynamic field arrays
  const handleArrayFieldChange = (setter, index, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  
  const handleAddArrayField = (setter, defaultValue = "") => {
    setter(prev => [...prev, defaultValue]);
  };
  
  const handleRemoveArrayField = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };
  
  // Special handler for FAQ objects
  const handleFaqChange = (index, field, value) => {
    setFaqs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine all the data for submission
    const completeSchemeData = {
      ...schemeData,
      benefits: benefits.length > 0 ? benefits.join(" ") : "",
      exclusions: exclusions.length > 0 ? exclusions.join(" ") : "",
      documentRequirements: documentRequirements.filter(item => item.trim() !== ""),
      eligibilities: eligibilities.filter(item => item.trim() !== ""),
      applicationProcessSteps: applicationProcessSteps.filter(item => item.trim() !== ""),
      faqs: faqs.filter(item => item.question.trim() !== "" || item.answer.trim() !== ""),
      sourceReferences: sourceReferences.filter(item => item.trim() !== ""),
      schemeSpecificCriterias: schemeSpecificCriterias.filter(item => item.trim() !== ""),

    };
    console.log(completeSchemeData)
    
    dispatch(postScheme({ 
      schemeData: completeSchemeData
    }));
    
    // Reset the form
    
  };

  // Helper for creating form fields
  const renderField = (label, name, type = "text", options = null) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">{label}:</label>
        {type === "select" ? (
          <select
            name={name}
            value={schemeData[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={schemeData[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            value={schemeData[name]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
      </div>
    );
  };
  
  // Helper for dynamic array fields
  const renderDynamicFields = (label, items, setItems, placeholder = "") => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">{label}:</label>
        {items.map((item, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={item}
              placeholder={placeholder}
              onChange={(e) => handleArrayFieldChange(setItems, index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayField(setItems, index)}
              className="px-3 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
              disabled={items.length === 1 && index === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayField(setItems)}
          className="mt-2 flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add another {label.toLowerCase()}
        </button>
      </div>
    );
  };
  
  // Helper for FAQ fields
  const renderFaqFields = () => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Frequently Asked Questions:</label>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-1">Question:</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter question"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-1">Answer:</label>
              <textarea
                value={faq.answer}
                onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="2"
                placeholder="Enter answer"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveArrayField(setFaqs, index)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
              disabled={faqs.length === 1 && index === 0}
            >
              Remove this FAQ
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayField(setFaqs, { question: "", answer: "" })}
          className="mt-2 flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add another FAQ
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Add a New Government Scheme
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="flex-1 h-1 bg-gray-200">
            <div 
              className="h-full bg-green-600" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <div className="mx-4 text-sm text-gray-500">Step {step} of 5</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Basic Information</h3>
            {renderField("Scheme Name", "schemeName")}
            {renderField("State", "state", "select", stateEnums)}
            {renderField("Category", "category", "select", categoryEnums)}
            {renderField("Benefit Type", "benefitType", "select", benefitTypeEnums)}
            {renderField("Is this a DBT Scheme", "dbtScheme", "select", booleanEnums)}
          </div>
        )}

        {/* Step 2: Demographic Criteria */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Demographic Criteria</h3>
            {renderField("Gender", "gender", "select", genderEnums)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {renderField("Start Age", "start_age", "number")}
              </div>
              <div>
                {renderField("End Age", "end_age", "number")}
              </div>
            </div>
            {renderField("Caste", "caste", "select", casteEnums)}
            {renderField("Residence", "residence", "select", residenceEnums)}
            {renderField("Minority", "minority", "select", booleanEnums)}
            {renderField("Below Poverty Line", "belowPovertyLine", "select", booleanEnums)}
          </div>
        )}

        {/* Step 3: Special Conditions */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Special Conditions</h3>
            {renderField("Differently Abled", "differentlyAbled", "select", booleanEnums)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                {renderField("Start Disability Percentage", "start_disabilityPercentage", "number")}
              </div>
              <div>
                {renderField("End Disability Percentage", "end_disabilityPercentage", "number")}
              </div>
            </div>
            {renderField("Government Employee", "governmentEmployee", "select", booleanEnums)}
            {renderField("Employment Status", "employmentStatus", "select", employmentStatusEnums)}
            {renderField("Student", "student", "select", booleanEnums)}
            {renderField("Occupation", "occupation", "select", occupationEnums)}
          </div>
        )}

        {/* Step 4: Benefits and Requirements */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Benefits and Requirements</h3>
            {renderDynamicFields("Benefits", benefits, setBenefits, "Enter a benefit")}
            {renderDynamicFields("Exclusions", exclusions, setExclusions, "Enter an exclusion")}
            {renderDynamicFields("Document Requirements", documentRequirements, setDocumentRequirements, "Enter a document requirement")}
            {renderDynamicFields("Eligibility Criteria", eligibilities, setEligibilities, "Enter an eligibility criterion")}
            {renderDynamicFields("Scheme Specific Criteria", schemeSpecificCriterias,setschemeSpecificCriterias, "Enter specific criterion for this scheme")}
        
          </div>
        )}

        {/* Step 5: Additional Information */}
        {step === 5 && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Additional Information</h3>
            {renderDynamicFields("Application Process Steps", applicationProcessSteps, setApplicationProcessSteps, "Enter an application step")}
            {renderFaqFields()}
            {renderDynamicFields("Source References", sourceReferences, setSourceReferences, "Enter a source reference")}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
            >
              Previous
            </button>
          )}
          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ml-auto flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Scheme"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddScheme;