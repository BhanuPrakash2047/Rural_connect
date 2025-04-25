import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [schemesDropdownOpen, setSchemesDropdownOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSchemesDropdown = () => {
    setSchemesDropdownOpen(!schemesDropdownOpen);
  };

  const toggleJobsDropdown = () => {
    setJobsDropdownOpen(!jobsDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/schemes" className="flex items-center">
            <span className="text-2xl font-bold text-green-600">Rural Connect</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/schemes" className="text-gray-700 hover:text-green-600 py-2">Home</Link>
          
          {/* Schemes Dropdown */}
          <div className="relative group">
            <button 
              className="text-gray-700 hover:text-green-600 py-2 flex items-center"
              onClick={toggleSchemesDropdown}
            >
              Schemes <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
            </button>
            <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${schemesDropdownOpen ? 'block' : 'hidden'} group-hover:block`}>
              <Link to="/schemes/filter/schemes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Browse Schemes</Link>
              <Link to="/schemes/post-scheme" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Post a Scheme</Link>
              <Link to="/schemes/eligibility-check" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Eligibility Check</Link>
            </div>
          </div>
          
          {/* Jobs Dropdown */}
          <div className="relative group">
            <button 
              className="text-gray-700 hover:text-green-600 py-2 flex items-center"
              onClick={toggleJobsDropdown}
            >
              Jobs <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
            </button>
            <div className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${jobsDropdownOpen ? 'block' : 'hidden'} group-hover:block`}>
              <Link to="/jobs/search-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Search Jobs</Link>
              <Link to="/jobs/jobs-by-location" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Jobs By Location</Link>
              <Link to="/jobs/top-jobs-by-location" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Top Jobs</Link>
              <Link to="/jobs/post-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Post a Job</Link>
              <Link to="/jobs/job-applications/you" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">Your Applications</Link>
            </div>
          </div>
          
          <Link to="/schemes/feedback" className="text-gray-700 hover:text-green-600 py-2">Contact</Link>
        </nav>
        
        {/* Sign In Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Sign In
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 py-2 px-4">
          <Link to="/schemes" className="block py-2 text-gray-700">Home</Link>
          
          {/* Mobile Schemes Submenu */}
          <div>
            <button 
              className="flex justify-between items-center w-full py-2 text-gray-700"
              onClick={toggleSchemesDropdown}
            >
              Schemes
              <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transform ${schemesDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {schemesDropdownOpen && (
              <div className="pl-4">
                <Link to="/schemes/filter/schemes" className="block py-2 text-gray-700">Browse Schemes</Link>
                <Link to="/schemes/post-scheme" className="block py-2 text-gray-700">Post a Scheme</Link>
                <Link to="/schemes/eligibility-check" className="block py-2 text-gray-700">Eligibility Check</Link>
              </div>
            )}
          </div>
          
          {/* Mobile Jobs Submenu */}
          <div>
            <button 
              className="flex justify-between items-center w-full py-2 text-gray-700"
              onClick={toggleJobsDropdown}
            >
              Jobs
              <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transform ${jobsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {jobsDropdownOpen && (
              <div className="pl-4">
                <Link to="/jobs/search-job" className="block py-2 text-gray-700">Search Jobs</Link>
                <Link to="/jobs/jobs-by-location" className="block py-2 text-gray-700">Jobs By Location</Link>
                <Link to="/jobs/top-jobs-by-location" className="block py-2 text-gray-700">Top Jobs</Link>
                <Link to="/jobs/post-job" className="block py-2 text-gray-700">Post a Job</Link>
                <Link to="/jobs/job-applications/you" className="block py-2 text-gray-700">Your Applications</Link>
              </div>
            )}
          </div>
          
          <Link to="/schemes/feedback" className="block py-2 text-gray-700">Contact</Link>
          
          {/* Mobile Sign In Button */}
          <button className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;