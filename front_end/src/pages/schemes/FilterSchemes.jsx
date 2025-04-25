import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSchemes } from "../../redux_store/schemeSlice.js";
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
import { Link, useParams } from "react-router-dom";

const SchemeFilters = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { schemes, loading, error } = useSelector((state) => state.schemes);
  
  // Check if the category param matches any valid category enum value
  const isValidCategory = category && categoryEnums.some(item => item.value === category);
  const initialCategory = isValidCategory ? category : "";
  
  const [filters, setFilters] = useState({
    state: "",
    category: initialCategory, // Use validated category or empty string (not null)
    gender: "",
    caste: "",
    residence: "",
    minAge: "",
    maxAge: "",
    benefitType: "",
    minDisabilityPercentage: "",
    maxDisabilityPercentage: "",
    occupation: "",
    employmentStatus: "",
    minority: "",
    differentlyAbled: "",
    belowPovertyLine: "",
    keyword: "",
    page: 0,
    size: 10
  });

  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Update filters if category param changes
  useEffect(() => {
    if (isValidCategory) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: category
      }));
    } else if (category && category !== "ALL") {
      // Only log warning if not the special "ALL" case
      console.warn(`Invalid category param provided: ${category}. Must be one of the values from categoryEnums.`);
    }
  }, [category, isValidCategory]);

  useEffect(() => {
    dispatch(searchSchemes(filters));
  }, [filters, dispatch]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      ...filters,
      state: "",
      category: initialCategory, // Keep the initial category from URL
      gender: "",
      caste: "",
      residence: "",
      minAge: "",
      maxAge: "",
      benefitType: "",
      minDisabilityPercentage: "",
      maxDisabilityPercentage: "",
      occupation: "",
      employmentStatus: "",
      minority: "",
      differentlyAbled: "",
      belowPovertyLine: "",
      keyword: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:hidden p-4 bg-blue-600 text-white">
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-bold">Filters</span>
          <span>{isFilterOpen ? "↑" : "↓"}</span>
        </button>
      </div>
      
      <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 p-4 border-r bg-white shadow-md`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-600">Filters</h2>
          <button 
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-6">
          {/* Keyword Search */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Keyword</label>
            <div className="relative">
              <input 
                type="text" 
                name="keyword" 
                value={filters.keyword} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search schemes..." 
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Dropdown Filters */}
          <div className="space-y-5">
            {["state", "category", "caste", "residence", "benefitType", "employmentStatus", "occupation"].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <select 
                  name={field} 
                  value={filters[field]} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All</option>
                  {(field === "state" ? stateEnums :
                    field === "category" ? categoryEnums :
                    field === "caste" ? casteEnums :
                    field === "residence" ? residenceEnums :
                    field === "benefitType" ? benefitTypeEnums :
                    field === "employmentStatus" ? employmentStatusEnums :
                    occupationEnums).map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Radio Button Filters */}
          <div className="space-y-5">
            {["gender", "minority", "differentlyAbled", "belowPovertyLine"].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-gray-700 font-medium mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="space-y-2 ml-2">
                  {(field === "gender" ? genderEnums : booleanEnums).map((item) => (
                    <label key={item.value} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name={field} 
                        value={item.value} 
                        onChange={handleChange} 
                        checked={filters[field] === item.value}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500" 
                      /> 
                      <span className="text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Available Schemes
            {isValidCategory && (
              <span className="ml-2 text-blue-600">
                {categoryEnums.find(c => c.value === category)?.label || ''}
              </span>
            )}
          </h2>
          <p className="text-gray-600">
            {Array.isArray(schemes) ? `Found ${schemes.length} schemes matching your criteria` : 'Use filters to find government schemes'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">
                  {typeof error === "string" ? error : "An error occurred. Please try again later."}
                </p>
              </div>
            </div>
          </div>
        ) : Array.isArray(schemes) && schemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <Link key={scheme.id} to={`/schemes/scheme/${scheme.id}`} className="block transition transform hover:scale-105">
                <div className="h-full border border-gray-200 rounded-lg shadow-sm hover:shadow-lg overflow-hidden bg-white">
                  <div className="p-5 h-full flex flex-col">
                    <div className="flex items-center mb-3">
                      <div className="rounded-full bg-blue-100 p-2 mr-3">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{scheme.schemeName}</h3>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-sm text-gray-600">Posted by: {scheme.contributor?.name || 'Government'}</p>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          <span>{scheme.upvotes} Upvotes</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${scheme.student === "YES" ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          For: {scheme.student === "YES" ? "Students" : "Everyone"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <span className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        View details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No schemes found</h3>
            <p className="text-gray-500">Try adjusting your filters to find relevant schemes</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SchemeFilters;