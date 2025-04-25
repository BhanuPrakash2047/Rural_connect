import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hardcoded Token (Replace this later with a dynamic value)
const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZS5nZW51aW5lY29kZXIuY29tIiwibmFtZSI6IkJoYW51IFByYWthc2giLCJlbWFpbCI6ImJoYW51LnByYWthc2hAZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzQ1NTk4NzU5LCJleHAiOjE3NDU2MTA3NTl9.2QfB7tRTRBItONrE1i1y8QkZGIAMaJhp68LkAlw26LJM-cw4ZAM39nmQecCMP7rWG6nNY5p9luQ_FXOw1CltSQ";
const BASE_URL = "http://localhost:8081/civic"; 

// Helper function to add authorization headers
const getAuthHeaders = () => ({
  headers: { Authorization: TOKEN },
});
// Fetch issues based on location
export const fetchIssuesByLocation = createAsyncThunk(
  "issues/fetchByLocation",
  async (location) => {
    const response = await axios.get(`${BASE_URL}/issues/location/${location}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      }
    });
    return response.data;
  }
);
export const fetchAllIssues = createAsyncThunk(
  "issues/fetchAllIssues",
  async () => {
    const response = await axios.get(`${BASE_URL}/issues`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      }
    });
    return response.data;
  }
);

//  Fetch user-created issues
export const fetchUserIssues = createAsyncThunk("issues/fetchUserIssues", async () => {
  const response = await axios.get(`http://localhost:8081/api/issues/you`, getAuthHeaders());
  return response.data;
});

//  Fetch liked issues
export const fetchLikedIssues = createAsyncThunk("issues/fetchLikedIssues", async () => {
  const response = await axios.get(`http://localhost:8081/api/issues/liked`, getAuthHeaders());
  return response.data;
});

//  Fetch commented issues
export const fetchCommentedIssues = createAsyncThunk("issues/fetchCommentedIssues", async () => {
  const response = await axios.get(`http://localhost:8084/api/issues/commented`, getAuthHeaders());
  return response.data;
});

//  Fetch a single issue
export const fetchIssueDetails = createAsyncThunk("issues/fetchIssueDetails", async (issueId) => {
  const response = await axios.get(`${BASE_URL}/issues/${issueId}`,  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`
    }
  })
  return response.data;
});

//  Fetch top trending issues
export const fetchTopIssues = createAsyncThunk("issues/fetchTopIssues", async (city) => {
  try{
  const response = await axios.get(`${BASE_URL}/issues/top/${city}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken}`
    }
  });
  return response.data;
} 
catch (error) {
  console.error("Error posting issue:", error);
  throw error;
}
});
// Update if needed

// Function to get token (assuming it's stored in localStorage)
const getToken = TOKEN

// Function to POST an issue
export const postIssue = async (issueData) => {
  try {
    const response = await axios.post(`${BASE_URL}/issue`, issueData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error posting issue:", error);
    throw error;
  }
};

// Function to GET all issues
export const getAllIssues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/issues`, {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

// Function to GET issues by location
export const getIssuesByLocation = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/issues/location/${location}`, {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching issues for location: ${location}`, error);
    throw error;
  }
};

export const getIssueByTitle = async (issueTitle) => {
  try {
    const response = await axios.get(`${BASE_URL}/issue/${issueTitle}`, {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching issues for location: ${location}`, error);
    throw error;
  }
};

// User response to admin request
export const respondToAdminRequest = async (issueId, message) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/issues/${issueId}/responseDetails/${message}`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${getToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error responding to admin request:`, error);
    throw error;
  }
};

// Function to GET issue by ID
export const getIssueById = async (issueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/issues/${issueId}`, {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching issue with ID: ${issueId}`, error);
    throw error;
  }
};

// Function to vote for an issue
export const voteIssue = async (issueId) => {
  try {
    const response = await axios.post(`${BASE_URL}/issue/${issueId}/vote`, {}, {
      headers: {
        "Authorization": `Bearer ${getToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error voting for issue ${issueId}`, error);
    throw error;
  }
};


export const fetchIssueComments = async (issueId) => {
  try{
  const response = await axios.get(`${BASE_URL}/issue/${issueId}/comments`, {
    headers: {
      "Authorization": `Bearer ${getToken}`,
    }
  });
  return response.data;
}
 catch (error) {
  console.error(`Errorfetching comments for issue ${issueId}`, error);
  throw error;
}
};


// Function to GET issue status
export const getIssueStatus = async (issueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/issues/${issueId}/status`, {}, {
      headers: {
        "Authorization": `Bearer ${getToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments  for issue ${issueId}`, error);
    throw error;
  }
};

// Function to GET issues assigned to an admin
export const getAdminIssues = async (adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/issues/admin/${adminId}`, {
      headers: {
        "Authorization": `Bearer ${getToken}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin issues:", error);
    throw error;
  }
};

// Function to comment on an issue
export const commentOnIssue = async (issueId, message) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/issue/${issueId}/comment/${message}`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${getToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};


// Fetch Admin Notifications
export const fetchAdminNotifications = createAsyncThunk(
  "notifications/fetchAdminNotifications",
  async (adminName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/${adminName}`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch admin notifications");
    }
  }
);

// Mark Admin Notification as Read
export const markAdminNotificationSeen = createAsyncThunk(
  "notifications/markAdminNotificationSeen",
  async ({ adminName, notificationId }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/admin/${adminName}/seen`,
        { id: notificationId },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark as read");
    }
  }
);

// Delete Admin Notification
export const deleteAdminNotification = createAsyncThunk(
  "notifications/deleteAdminNotification",
  async ({ adminName, notificationId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/admin/${adminName}`, {
        data: { id: notificationId },
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete notification");
    }
  }
);
export const likedIssuesByUser=createAsyncThunk(
  "issues/fetchUserLikedComments",
  async(_,{rejectWithValue})=>{
    try {
      const response = await axios.get(`${BASE_URL}/issues/you/likedIssues`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user notifications");
    }
  }
);
export const commentedIssuesByUser=createAsyncThunk(
  "issues/fetchUserCommentedIssues",
  async(_,{rejectWithValue})=>{
    try {
      const response = await axios.get(`${BASE_URL}/issues/commented-issues`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Issues Commented By User");
    }
  }
);

// Fetch User Notifications
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications/user`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user notifications");
    }
  }
);

export const markUserNotificationSeen = createAsyncThunk(
  "notifications/markUserNotificationSeen",
  async ( notificationId , { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/notifications/user/seen/${notificationId}`, // 🔗 Send ID as Path Variable
        {},
        {
          headers: { Authorization: `Bearer ${getToken}` }, // 🔑 Auth Token
        }
      );
      return notificationId; // ✅ Return ID to update Redux
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark as read"); 
      // ❌ Handle Errors
    }
  }
);


// Delete User Notification
export const deleteUserNotification = createAsyncThunk(
  "notifications/deleteUserNotification",
  async (notificationId , { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/notifications/user/delete/${notificationId}`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });      
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete notification");
    }
  }
);
