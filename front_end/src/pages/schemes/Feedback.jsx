/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faUser, 
  faBuilding, 
  faQuestionCircle,
  faChevronDown,
  faPaperPlane,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

const FeedbackComponent = () => {
  const [activeTab, setActiveTab] = useState("feedback");
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0
  });

  // Team/Contact information
  const teamContacts = [
    {
      name: "Rajesh Sharma",
      role: "Project Lead",
      email: "rajesh.sharma@schemesportal.gov.in",
      phone: "+91 98765 43210",
      department: "Digital Services Division"
    },
    {
      name: "Priya Patel",
      role: "Technical Support Manager",
      email: "support@schemesportal.gov.in",
      phone: "+91 87654 32109",
      department: "User Support Team"
    },
    {
      name: "Amit Singh",
      role: "Content Manager",
      email: "content@schemesportal.gov.in",
      phone: "+91 76543 21098",
      department: "Information Management"
    },
    {
      name: "Lakshmi Devi",
      role: "Rural Outreach Coordinator",
      email: "outreach@schemesportal.gov.in",
      phone: "+91 65432 10987",
      department: "Field Operations"
    }
  ];

  // FAQs data
  const faqs = [
    {
      question: "How do I find schemes specifically for my region?",
      answer: "You can use the search filter on our home page to select your state and district. This will show you all schemes available in your region. Additionally, you can filter by category to narrow down the results based on your needs."
    },
    {
      question: "What documents are typically required to apply for government schemes?",
      answer: "Common documents include your Aadhaar card, income certificate, caste certificate (if applicable), bank account details, and passport-sized photographs. Each scheme has specific requirements which are listed on the scheme's detail page."
    },
    {
      question: "How can I check the status of my scheme application?",
      answer: "Most schemes provide a tracking system through their official websites. On our portal, navigate to the 'Track Application' section and enter your application reference number to check its status. You can also contact the concerned department directly using the contact information provided."
    },
    {
      question: "I don't have internet access regularly. How can I stay updated about schemes?",
      answer: "We have partnered with Common Service Centers (CSCs) in villages where you can access our portal. Additionally, you can register your mobile number to receive SMS alerts about relevant schemes. Local Panchayat offices also have information about ongoing schemes."
    },
    {
      question: "Are there any schemes specifically for women entrepreneurs in rural areas?",
      answer: "Yes, there are several schemes such as Mahila Udyam Nidhi, Stree Shakti Package, and MUDRA loans under the Women Enterprise category. You can find these by selecting 'Women & Child' and 'Business & Entrepreneurship' categories in our filter section."
    },
    {
      question: "How do I report an issue if I face any problems while using this portal?",
      answer: "You can submit your feedback through the 'Feedback' tab on this page. For immediate assistance, contact our helpline at 1800-XXX-XXXX or email us at support@schemesportal.gov.in. We typically respond within 24-48 hours."
    },
    {
      question: "Can I apply for multiple schemes simultaneously?",
      answer: "Yes, you can apply for multiple schemes as long as you meet the eligibility criteria for each. However, some schemes may have restrictions on availing benefits from similar schemes simultaneously. These details are mentioned in the 'Terms & Conditions' section of each scheme."
    }
  ];

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm({
      ...feedbackForm,
      [name]: value
    });
  };

  const handleRatingClick = (rating) => {
    setFeedbackForm({
      ...feedbackForm,
      rating
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedbackForm);
    setFeedbackSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFeedbackForm({
        name: "",
        email: "",
        message: "",
        rating: 0
      });
    }, 3000);
  };

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 bg-green-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact & Support</h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md inline-flex">
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-6 py-3 rounded-l-lg ${
                activeTab === "feedback" 
                  ? "bg-green-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-green-100"
              } transition-colors duration-200`}
            >
              Feedback
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 ${
                activeTab === "contact" 
                  ? "bg-green-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-green-100"
              } transition-colors duration-200`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-3 rounded-r-lg ${
                activeTab === "faq" 
                  ? "bg-green-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-green-100"
              } transition-colors duration-200`}
            >
              FAQs
            </button>
          </div>
        </div>
        
        {/* Feedback Form */}
        {activeTab === "feedback" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
          >
            {feedbackSubmitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="text-white text-2xl" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h3>
                <p className="text-gray-600">Your input helps us improve our services for rural communities.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Share Your Experience</h3>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={feedbackForm.name}
                      onChange={handleFeedbackChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={feedbackForm.email}
                      onChange={handleFeedbackChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={feedbackForm.message}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                    required
                  ></textarea>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2">Rate Your Experience</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className={`w-10 h-10 rounded-full ${
                          feedbackForm.rating >= star 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        } flex items-center justify-center transition-colors duration-200`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Submit Feedback
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
        
        {/* Contact Information */}
        {activeTab === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Our Team</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500"
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{contact.name}</h4>
                  <p className="text-green-600 font-medium mb-4">{contact.role}</p>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faBuilding} className="text-green-500 mr-3 w-5" />
                      <span>{contact.department}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-green-500 mr-3 w-5" />
                      <a href={`mailto:${contact.email}`} className="hover:text-green-600">{contact.email}</a>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="text-green-500 mr-3 w-5" />
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-green-600">{contact.phone}</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 bg-green-100 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Helpline Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium mb-2">Toll-Free Helpline:</p>
                  <p className="text-lg text-green-700">1800-XXX-XXXX</p>
                  <p className="text-sm text-gray-600 mt-1">(Available Mon-Sat, 9AM to 6PM)</p>
                </div>
                <div>
                  <p className="font-medium mb-2">WhatsApp Support:</p>
                  <p className="text-lg text-green-700">+91 98765-XXXXX</p>
                  <p className="text-sm text-gray-600 mt-1">(Available 24/7 for text queries)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* FAQs */}
        {activeTab === "faq" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-5 bg-green-50 text-left"
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faQuestionCircle} className="text-green-500 mr-3" />
                      <span className="font-medium text-gray-800">{faq.question}</span>
                    </div>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-green-500 transition-transform duration-300 ${
                        activeFaqIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeFaqIndex === index ? 'auto' : 0,
                      opacity: activeFaqIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white border-t border-gray-200">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 bg-green-100 p-5 rounded-lg">
              <p className="text-center text-gray-700">
                Don't see your question here?{' '}
                <button 
                  onClick={() => setActiveTab("feedback")}
                  className="font-medium text-green-600 hover:text-green-800"
                >
                  Ask us directly
                </button>{' '}
                or check our{' '}
                <a href="#" className="font-medium text-green-600 hover:text-green-800">
                  comprehensive help guide
                </a>.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeedbackComponent;