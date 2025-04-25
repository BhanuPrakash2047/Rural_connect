import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import Notifications from "@/pages/issues/issueNotifications";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

const menuItems = [
  { title: "Your Issues", path: "/your-issues", description: "View and manage issues you've reported." },
  { title: "Post an Issue", path: "/post-issue", description: "Report a new issue in your locality." },
  { title: "Issues in Your Location", path: "/local-issues", description: "See reported issues near you." },
  { title: "All Issues", path: "/all-issues", description: "Browse all reported issues." },
  { title: "Top Issues in a Location", path: "/top-issues", description: "Check out trending issues in different areas." },
  { title: "Feedback", path: "/feedback", description: "Give your feedback to improve our platform." },
  { title: "Status of Issues", path: "/status", description: "Track the progress of reported issues." }
];

const userMenuItems = [
  { title: "Liked Issues", path: "/liked-issues" },
  { title: "Commented Issues", path: "/commented-issues" },
  { title: "Update Profile", path: "/update-profile" },
  { title: "View Profile", path: "/profile" },
  { title: "Logout", path: "/logout" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
    <nav className="bg-green-600 text-white shadow-lg h-16 flex items-center justify-between px-6">
      {/* Left Side - Profile & Branding */}
      <div className="flex items-center gap-6">
  
        <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
      <Link className="text-xl font-bold tracking-wide" to={`/issues`}>Civic Connect </Link>
      </div>

      {/* Right Side - Avatar & User Menu */}
      <div className="relative flex gap-6">
        <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <div className="flex items-center gap-2">
            <div>Profile</div>
            <User className="w-7 h-7 cursor-pointer hover:text-green-300 transition-all duration-300" />
          </div>
        </button>
        <Notifications />
        {userMenuOpen && (
          <ul className="absolute right-0 mt-3 bg-white text-black shadow-lg rounded-md w-48 py-2 z-10">
            {userMenuItems.map((option, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                <li to={option.path}>{option.title}</li>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile & Desktop Menu */}
      {menuOpen && (
        <ul className="absolute z-10 top-16 left-0 w-full bg-white text-black shadow-md flex flex-col p-5 gap-3">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:bg-gray-200 rounded-s-sm p-3 cursor-pointer text-base font-medium">
              <li to={item.path}>{item.title}</li>
              <p className="text-sm text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </nav>
    </>
  
);

};

export default Navbar;
