import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import photo from "../../assets/schemeshero.png";
import photo1 from "../../assets/schemeshero1.png";
import Banking from '../../assets/Banking.svg';
import { faArrowRight, faQuoteLeft, faStar, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Business from '../../assets/Business.svg';
import Education from '../../assets/Education.svg';
import Health from '../../assets/Health.svg';
import Housing from '../../assets/Housing.svg';
import Sports from '../../assets/Sports.svg';
import Transport from '../../assets/Transport.svg';
import Women from '../../assets/Women.svg';
import Skills from '../../assets/Skills.svg';
import Agriculture from '../../assets/Agriculture.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
  categoryEnums,
} from "../../assets/CategoryEnums.js";

const categoryData = [
  { 
    value: categoryEnums[0].value, 
    label: "Agriculture & Rural Development", 
    image: Agriculture, 
    path: `/schemes/filter/schemes/${categoryEnums[0].value}` 
  },
  { 
    value: categoryEnums[1].value, 
    label: "Financial & Insurance", 
    image: Banking, 
    path: `/schemes/filter/schemes/${categoryEnums[1].value}` 
  },
  { 
    value: categoryEnums[2].value, 
    label: "Business & Entrepreneurship", 
    image: Business, 
    path: `/schemes/filter/schemes/${categoryEnums[2].value}` 
  },
  { 
    value: categoryEnums[3].value, 
    label: "Education", 
    image: Education, 
    path: `/schemes/filter/schemes/${categoryEnums[3].value}` 
  },
  { 
    value: categoryEnums[4].value, 
    label: "Health & Wellness", 
    image: Health, 
    path: `/schemes/filter/schemes/${categoryEnums[4].value}` 
  },
  { 
    value: categoryEnums[5].value, 
    label: "Housing & Shelter", 
    image: Housing, 
    path: `/schemes/filter/schemes/${categoryEnums[5].value}` 
  },
  { 
    value: categoryEnums[7].value, 
    label: "Skills & Employment", 
    image: Skills, 
    path: `/schemes/filter/schemes/${categoryEnums[7].value}` 
  },
  { 
    value: categoryEnums[9].value, 
    label: "Sports & Culture", 
    image: Sports, 
    path: `/schemes/filter/schemes/${categoryEnums[9].value}` 
  },
  { 
    value: categoryEnums[10].value, 
    label: "Transport & Infrastructure", 
    image: Transport, 
    path: `/schemes/filter/schemes/${categoryEnums[10].value}` 
  },
  { 
    value: categoryEnums[11].value, 
    label: "Travel & Tourism", 
    image: Transport, 
    path: `/schemes/filter/schemes/${categoryEnums[11].value}` 
  },
  { 
    value: categoryEnums[12].value, 
    label: "Women & Child", 
    image: Women, 
    path: `/schemes/filter/schemes/${categoryEnums[12].value}` 
  }
];

// Job Routes
const jobRoutes = [
  { label: "Search Jobs", path: "/jobs/search-job" },
  { label: "Jobs By Location", path: "/jobs/jobs-by-location" },
  { label: "Top Jobs", path: "/jobs/top-jobs-by-location" },
  { label: "Post a Job", path: "/jobs/post-job" },
  { label: "Your Applications", path: "/jobs/job-applications/you" }
];

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    village: "Bhimpur, Rajasthan",
    quote: "Thanks to the PM Kisan Samman Nidhi scheme I found through this website, I now receive direct financial support for my farming needs.",
    stars: 5,
    category: "Agriculture & Rural Development"
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    village: "Chandpur, Uttar Pradesh",
    quote: "I was able to get a loan under the Mudra Yojana to start my small handicraft business. The application process was simple with guidance from this platform.",
    stars: 5,
    category: "Business & Entrepreneurship"
  },
  {
    id: 3,
    name: "Suresh Patel",
    village: "Navapur, Gujarat",
    quote: "My daughter received a scholarship through the National Means-cum-Merit Scholarship Scheme which I discovered here. She can now continue her education.",
    stars: 4,
    category: "Education"
  },
  {
    id: 4,
    name: "Meena Kumari",
    village: "Sonpur, Bihar",
    quote: "The Pradhan Mantri Awaas Yojana helped me build a proper home for my family. This website made finding and applying for the scheme so much easier.",
    stars: 5,
    category: "Housing & Shelter"
  },
  {
    id: 5,
    name: "Rajiv Singh",
    village: "Morena, Madhya Pradesh",
    quote: "I found a job at a local manufacturing unit through the jobs section. The location-based search feature made it easy to find work close to my village.",
    stars: 5,
    category: "Skills & Employment"
  }
];

// Featured quotes
const impactQuotes = [
  {
    quote: "Bridging the gap between government schemes and rural citizens is our mission.",
    author: "Ministry of Rural Development"
  },
  {
    quote: "Empowering villages through knowledge and accessibility to government welfare programs.",
    author: "National Rural Livelihood Mission"
  },
  {
    quote: "Creating pathways to employment by connecting rural talent with job opportunities.",
    author: "National Rural Employment Program"
  }
];

const WebsiteLayout = () => {
  // For horizontal scrolling in hero section
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);  
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  
  // Hero section images - each image contains all content (text and visuals)
  const heroImages = [
    photo1,
    photo
  ];
  
  // Auto scroll functionality for hero
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Auto scroll functionality for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update scroll position when activeIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeIndex * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Animation variants for Framer Motion
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
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* Hero Section with Horizontal Scroll */}
      <section className="bg-green-50 overflow-hidden relative">
        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-hidden snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroImages.map((image, index) => (
            <div 
              key={index} 
              className="min-w-full flex-shrink snap-center"
            >
              <img 
                src={image} 
                alt={`Hero slide ${index + 1}`} 
                className="w-full min-h-1/2 object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? 'bg-green-600' : 'bg-green-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-green-100 py-8">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
            <p className="text-green-700 max-w-3xl mx-auto">
              Connecting rural communities with government schemes and job opportunities that can transform their lives. 
              We simplify access to information and resources, empowering every citizen to benefit 
              from the schemes designed for their welfare and find meaningful employment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Navigation Options */}
      <section className="bg-green-50 py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Schemes Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-green-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Government Schemes</h3>
                <p>Access over 1000+ welfare schemes from central and state governments</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Discover schemes for agriculture, education, healthcare, housing, and more to support your livelihood and development.
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <span className='text-xl font-bold text-green-600 text-center bg-green-100 rounded-md p-4 flex items-center justify-center shadow-md'>
                    <motion.span 
                      className='transition-all ease-in-out duration-300 flex items-center'
                      animate={{ 
                        x: [0, 5, 0], 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.5 
                      }}
                    >
                      Find Schemes For You <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </motion.span>
                  </span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <span className='text-xl mt-3 font-bold text-green-600 text-center bg-green-100 rounded-md p-4 flex items-center justify-center shadow-md'>
                    <motion.span 
                      className='transition-all ease-in-out duration-300 flex items-center'
                      animate={{ 
                        x: [0, 5, 0], 
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.5 
                      }}
                    >
                      Post A Scheme<FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </motion.span>
                  </span>
                </motion.button>

              </div>
            </motion.div>
            
            {/* Jobs Section */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-green-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Job Opportunities</h3>
                <p>Find local employment or post job openings for your business</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Search for jobs based on location, apply directly through our platform, and connect with employers in your region.
                </p>
                
                <div className="space-y-3">
                  {jobRoutes.map((route, index) => (
                    <Link key={index} to={route.path}>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full text-left p-3 bg-green-50 text-green-700 rounded-md flex justify-between items-center hover:bg-green-100 transition-colors duration-200"
                      >
                        <span>{route.label}</span>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </motion.button>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 bg-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scheme Categories</h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categoryData.map((item) => (
              <motion.div key={item.value} variants={itemVariants}>
                <Link to={item.path} className="text-center block">
                  <motion.div 
                    whileHover={{ scale: 1.1, y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img 
                      src={item.image} 
                      alt={item.label} 
                      className="w-full h-14 object-contain mx-auto" 
                    />
                    <p className="mt-2 text-gray-700 font-semibold text-sm">{item.label}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Quotes Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {impactQuotes.map((quote, index) => (
              <motion.div 
                key={index}
                className="text-center max-w-4xl mx-auto mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-green-200 text-4xl mb-2" />
                <h3 className="text-2xl font-bold italic mb-4">{quote.quote}</h3>
                <p className="text-green-100">— {quote.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="w-full py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Success Stories</h2>
          
          <div className="relative overflow-hidden max-w-4xl mx-auto">
            <div className="flex transition-all duration-500" 
                style={{ transform: `translateX(-${activeTestimonialIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeTestimonialIndex === index ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 relative">
                    <div className="absolute -top-4 right-8 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      {testimonial.category}
                    </div>
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-green-400 text-2xl mb-4" />
                    <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.village}</p>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Dots navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonialIndex === index ? 'bg-green-600' : 'bg-green-200'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-green-100">Government Schemes</p>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-green-100">Rural Citizens Helped</p>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">28</h3>
              <p className="text-green-100">States Covered</p>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">12</h3>
              <p className="text-green-100">Scheme Categories</p>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">2,500+</h3>
              <p className="text-green-100">Jobs Posted</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default WebsiteLayout;