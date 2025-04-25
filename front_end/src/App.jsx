import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import IssueLayout from './layouts/IssuesLayout.jsx';
import UserDashboard from './pages/issues/UserDashboard.jsx'
import PostIssue from './pages/issues/PostIssue.jsx';
import AllIssues from './pages/issues/AllIssues.jsx';
import IssuesByLocation from './pages/issues/FetchIssuesByLocation';
import IssueDetails from './pages/issues/IssueDetails.jsx';
import TopIssues from './pages/issues/TopIssues';
import CheckIssueStatus from './pages/issues/CheckIssueStatus';
import SchemesLayout from './layouts/SchemesLayout.jsx';
import SchemeDashboard from './pages/schemes/SchemeDashboard.jsx';
import PostScheme from './pages/schemes/SchemePosting.jsx';
import FilterSchemes from './pages/schemes/FilterSchemes.jsx';
import FetchScheme from './pages/schemes/FetchScheme.jsx';
import  CheckEligibility  from './pages/schemes/CheckEligibility.jsx';
import CreateJobPage from './pages/job_portal/CreateJob';
import JobsByLocationPage from './pages/job_portal/JobsByLocation';
import JobDetailsPage from './pages/job_portal/JobDetails';
import UpdateJobPage from './pages/job_portal/UpdateJob';  
import SearchJobsPage from './pages/job_portal/SearchJob';
import TopJobsByLocationPage from './pages/job_portal/TopJobsByLocation';
import JobApplicationsPage from './pages/job_portal/JobAppliactions';
import UserApplicationsPage from './pages/job_portal/UserApplications';
import LikedIssues from './pages/issues/LikedIssue.jsx';
import CommentedIssues from './pages/issues/CommentedIssues';
import FeedbackComponent from './pages/schemes/Feedback';



  const router = createBrowserRouter([
    {
      path: "/issues",
      element: <IssueLayout />,
      children: [
        { index: true, element: <UserDashboard /> }, 
        {path:"post-issue",element:<PostIssue/>},
        {path:"/issues/all-issues",element:<AllIssues/>},
        {path:"issues-by-location", element:<IssuesByLocation />},
        {path:"/issues/issue/:issueId", element:<IssueDetails />},
        {path:"/issues/top-issues", element:<TopIssues />},
        {path:"/issues/check-issue-status",element:<CheckIssueStatus />},
        {path:"liked/you",element:<LikedIssues />},
        {path:"/issues/commented/you",element:<CommentedIssues />}
        
      ],

    },
    {
      path:"/schemes",
      element: <SchemesLayout />,
      children: [
        {index:true, element:<SchemeDashboard />},
        {path:"/schemes/post-scheme", element:<PostScheme />},
        {path:"/schemes/filter/schemes/:category", element:<FilterSchemes />},
        {path:"/schemes/scheme/:id", element:<FetchScheme />},
        {path:"/schemes/check-eligibiltity/:schemeId", element:<CheckEligibility />},
        {path:"/schemes/filter/schemes", element:<FilterSchemes />},
        {path:"/schemes/feedback", element:<FeedbackComponent />},
      ]
       }, 
       {
        path:"/jobs",
        element:<SchemesLayout />,
        children:[
          { path: "post-job", element: <CreateJobPage /> },
          {path:"jobs-by-location", element:<JobsByLocationPage />},
          {path:"job/:jobId", element:<JobDetailsPage />},
          {path:"edit/:jobId",element:<UpdateJobPage />},
          {path:"search-job",element:<SearchJobsPage />},
          {path:"top-jobs-by-location",element:<TopJobsByLocationPage />},
          {path:"job-applications/:jobId",element:<JobApplicationsPage />},
          {path:"job-applications/you",element:<UserApplicationsPage />},
        ]
       }
  ]);

  function App() {
    return <RouterProvider router={router} />;
  }
  
  export default App;
  




