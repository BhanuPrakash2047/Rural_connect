import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import photo from "../../assets/issues.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faListCheck, faPenToSquare, faLocationDot, faGlobe, 
  faArrowTrendUp, faComments, faClipboardCheck, faHeart, 
  faMessage, faQuoteLeft, faUsers, faClipboard, faCheckCircle, faUserClock
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { 
    title: "Your Issues", 
    path: "/issues/all-issues", 
    description: "View and manage issues you've reported.",
    icon: faListCheck,
    color: "from-purple-500 to-indigo-600"
  },
  { 
    title: "Post an Issue", 
    path: "/issues/post-issue", 
    description: "Report a new issue in your locality for resolution.",
    icon: faPenToSquare,
    color: "from-green-500 to-emerald-600"
  },
  { 
    title: "Issues in Your Location", 
    path: "/issues/issues-by-location", 
    description: "See what problems are affecting your area.",
    icon: faLocationDot,
    color: "from-blue-500 to-cyan-600"
  },
  { 
    title: "All Issues", 
    path: "/issues/all-issues", 
    description: "Browse every issue raised across all locations.",
    icon: faGlobe,
    color: "from-orange-500 to-amber-600"
  },
  { 
    title: "Top Issues in a Location", 
    path: "/issues/top-issues", 
    description: "Find the most critical issues in any chosen area.",
    icon: faArrowTrendUp,
    color: "from-red-500 to-pink-600"
  },
  { 
    title: "Feedback", 
    path: "/feedback", 
    description: "Share your thoughts to help improve our platform.",
    icon: faComments,
    color: "from-teal-500 to-green-600"
  },
  { 
    title: "Status of Issues", 
    path: "/issues/check-issue-status", 
    description: "Track the progress and updates of reported issues.",
    icon: faClipboardCheck,
    color: "from-violet-500 to-purple-600"
  }
];

const userMenuItems = [
  { 
    title: "Liked Issues", 
    path: "/issues/liked/you", 
    description: "Review the issues you have liked.",
    icon: faHeart,
    color: "from-pink-500 to-rose-600"
  },
  { 
    title: "Commented Issues", 
    path: "/issues/commented/you", 
    description: "See issues where you have left comments.",
    icon: faMessage,
    color: "from-yellow-500 to-amber-600"
  },
];

const inspirationalQuotes = [
  "Empowering Rural India for a Brighter Future!",
  "We are here to make the government at your foot.",
  "Bridge the gap between citizens and authorities.",
  "Your voice matters in shaping your community.",
  "Together we build a stronger rural India."
];

const farmerTestimonials = [
  {
    name: "Rajesh Kumar",
    village: "Madhavpur",
    feedback: "The broken irrigation canal that I reported was fixed within a week. This platform has given us a direct line to the authorities!",
    avatar: "R",
    color: "bg-blue-500"
  },
  {
    name: "Lakshmi Devi",
    village: "Suryapur",
    feedback: "For years our village struggled with poor roads. After raising the issue here, construction began within a month. This is true rural empowerment.",
    avatar: "L",
    color: "bg-green-500"
  },
  {
    name: "Mohan Singh",
    village: "Chandigarh Outskirts",
    feedback: "The damaged power lines were repaired promptly after I posted about frequent outages. Now our farms can operate without interruption.",
    avatar: "M",
    color: "bg-purple-500"
  },
  {
    name: "Anita Patel",
    village: "Greenfields",
    feedback: "This platform helped us get clean drinking water facilities installed. My children no longer fall sick from contaminated water.",
    avatar: "A",
    color: "bg-pink-500"
  }
];

const Dashboard = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Rotate through quotes every 5 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % inspirationalQuotes.length);
    }, 5000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  // Rotate through testimonials every 7 seconds
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % farmerTestimonials.length);
    }, 7000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  const currentTestimonial = farmerTestimonials[testimonialIndex];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Overlay and Parallax */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${photo})`,
            filter: "brightness(0.5)"
          }}
        ></motion.div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>

        {/* Content Wrapper */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          
          {/* Quote Section with Animation */}
          <motion.div 
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="mb-10 max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
              Rural Issues & <span className="text-green-400">Solutions</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg leading-relaxed">
              "{inspirationalQuotes[currentQuoteIndex]}"
            </p>
          </motion.div>

          {/* Statistics Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-6xl px-4 mt-8"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-fuchsia-500 to-purple-700 text-white text-center p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-white/10"
            >
              <FontAwesomeIcon icon={faUsers} className="text-3xl mb-3 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-extrabold">5000+</h2>
              <p className="text-sm md:text-base font-medium mt-1">Total Users Registered</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-500 to-emerald-700 text-white text-center p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-white/10"
            >
              <FontAwesomeIcon icon={faClipboard} className="text-3xl mb-3 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-extrabold">500+</h2>
              <p className="text-sm md:text-base font-medium mt-1">Total Issues</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white text-center p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-white/10"
            >
              <FontAwesomeIcon icon={faCheckCircle} className="text-3xl mb-3 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-extrabold">350+</h2>
              <p className="text-sm md:text-base font-medium mt-1">Resolved Issues</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-orange-500 to-red-700 text-white text-center p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-white/10"
            >
              <FontAwesomeIcon icon={faUserClock} className="text-3xl mb-3 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-extrabold">120+</h2>
              <p className="text-sm md:text-base font-medium mt-1">Active Users</p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12"
          >
            <Link to="/issues/post-issue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Report an Issue Now
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative scrolling indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-white rounded-full mt-2"
            />
          </div>
          <p className="text-white text-sm mt-2">Scroll Down</p>
        </motion.div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Success Stories</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from farmers and rural citizens who have successfully resolved their community issues through our platform.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Large quote icon */}
            <div className="absolute -top-10 left-0 text-green-100 text-8xl z-0">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            
            <motion.div 
              key={testimonialIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500 relative z-10"
            >
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">"{currentTestimonial.feedback}"</p>
              <div className="flex items-center">
                <div className={`${currentTestimonial.color} text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl`}>
                  {currentTestimonial.avatar}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-green-700 text-lg">{currentTestimonial.name}</p>
                  <p className="text-gray-500">{currentTestimonial.village}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {farmerTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === testimonialIndex ? "bg-green-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Platform Features</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive set of tools designed to help you report, track, and resolve issues in your community.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {[...menuItems, ...userMenuItems].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                y: -5
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <Link to={item.path} className="block h-full">
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white mb-4`}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="relative py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-green-50 text-lg">
              Join thousands of rural citizens who are actively shaping their communities by reporting issues and tracking resolutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/issues/post-issue" className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300">
                  Report an Issue
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/issues/all-issues" className="inline-block bg-transparent text-white border-2 border-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white/10 transition-all duration-300">
                  Browse Issues
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;