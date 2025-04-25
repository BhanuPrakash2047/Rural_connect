import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/schemes";
const getToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZS5nZW51aW5lY29kZXIuY29tIiwibmFtZSI6IkJoYW51IFByYWthc2giLCJlbWFpbCI6ImJoYW51LnByYWthc2hAZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzQ1NTk4NzU5LCJleHAiOjE3NDU2MTA3NTl9.2QfB7tRTRBItONrE1i1y8QkZGIAMaJhp68LkAlw26LJM-cw4ZAM39nmQecCMP7rWG6nNY5p9luQ_FXOw1CltSQ"
// // Fetch paginated schemes
// export const fetchSchemes = createAsyncThunk(
//   "schemes/fetchSchemes",
//   async ({ page = 0, size = 10 }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BASE_URL}?page=${page}&size=${size}`, {
//         headers: { Authorization: `Bearer ${getToken}` },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to fetch schemes");
//     }
//   }
// );

// import { useQuery } from "react-query";


// Function to get token
// const getToken = () => localStorage.getItem("token");

// Custom Hook to Fetch Paginated Schemes
// export const useSchemes = (page = 0, size = 10, filters = {}) => {
//   return useQuery(["schemes", page, filters], async () => {
//     const { data } = await axios.get(`${BASE_URL}?page=${page}&size=${size}`, {
//       headers: { Authorization: `Bearer ${getToken}` },
//       params: filters, // Passing additional filters dynamically
//     });
//     return data;
//   }, {
//     keepPreviousData: true, // Prevents UI flickering on pagination
//     staleTime: 30000, // Data is considered fresh for 30s
//     refetchOnWindowFocus: false, // Avoids refetching when user switches tabs
//   });
// };

// Async thunk for posting a scheme
export const postScheme = createAsyncThunk(
  "schemes/postScheme",
  async ({schemeData}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/schemes/scheme`, 
        schemeData, 
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to post scheme");
    }
  }
);

// Async thunk for searching schemes with filters
export const searchSchemes = createAsyncThunk(
  "schemes/searchSchemes",
  async (filters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:8081/api/schemes/filters/search?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      });
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to search schemes");
    }
  }
);

export const fetchSchemesByCategory = createAsyncThunk(
  "schemes/fetchSchemesByCategory",
  async ({ category, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8081api/schemes/${category}?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch schemes by category");
    }
  }
);

// Fetch scheme details
export const fetchSchemeDetails = createAsyncThunk(
  "schemes/fetchSchemeDetails",
  async (schemeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/schemes/${schemeId}/details`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch details");
    }
  }
);


// Vote on a scheme
export const voteScheme = createAsyncThunk(
  "schemes/voteScheme",
  async (schemeId, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/vote/${schemeId}`, {}, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return schemeId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to vote");
    }
  }
);


// Async thunk to fetch votes (likes) for a scheme
export const fetchSchemeVotes = createAsyncThunk(
  "schemes/fetchSchemeVotes",
  async (schemeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/votes/${schemeId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch scheme votes");
    }
  }
);

export const addSchemeComment = createAsyncThunk(
  "schemes/addSchemeComment",
  async ({ schemeId, commentText }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/schemes/feedback/comment/${schemeId}/${commentText}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add comment");
    }
  }
);

export const fetchSchemeComments = createAsyncThunk(
  "schemes/fetchSchemeComments",
  async (schemeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/schemes/feedback/comment/${schemeId}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch scheme comments");
    }
  }
);

export const checkEligibility = createAsyncThunk(
  'schemes/checkEligibilit',
  async ({ schemeId, userData }, { rejectWithValue }) => {
    try {

      
      const response = await axios.post(
        `http://localhost:8081/api/schemes/${schemeId}/check-eligibility`,
        userData,
        {
          headers: {  
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          }
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to check eligibility'
      );
    }
  }
);



const schemeSlice = createSlice({
  name: "schemes",
  initialState: {
    schemes: [],
     yourSchemes: [],
    selectedScheme:{},
    loading: false,
    error: null,
    page: 0,
    totalPages: 1,
    eligibiltity:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchSchemes.pending, (state) => { state.loading = true; })
      // .addCase(fetchSchemes.fulfilled, (state, action) => {
      //   state.schemes = action.payload.content;
      //   state.page = action.payload.pageable.pageNumber;
      //   state.totalPages = action.payload.totalPages;
      //   state.loading = false;
      // })
      // .addCase(fetchSchemes.rejected, (state, action) => { state.error = action.payload; })
    
      .addCase(voteScheme.fulfilled, (state, action) => {
        const votedScheme = state.schemes.find(s => s.id === action.payload);
        if (votedScheme) votedScheme.upvotes += 1;
      })
      .addCase(postScheme.pending, (state) => {
        state.loading = true;
      })
      .addCase(postScheme.fulfilled, (state, action) => {
        state.yourSchemes.push(action.payload);
        state.loading = false;
      })
      .addCase(postScheme.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(searchSchemes.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSchemes.fulfilled, (state, action) => {
        state.schemes = action.payload;
        state.loading = false;
      })
      .addCase(searchSchemes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchemesByCategory.fulfilled, (state, action) => {
        state.schemes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemesByCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemeVotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchemeVotes.fulfilled, (state, action) => {
        state.schemeVotes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemeVotes.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add Comment
      .addCase(addSchemeComment.fulfilled, (state, action) => {
        state.selectedScheme.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(addSchemeComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addSchemeComment.pending, (state) => {
        state.loading = true;
      })

      // Fetch Comments
      .addCase(fetchSchemeComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSchemeComments.fulfilled, (state, action) => {
        state.schemeComments = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemeComments.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemeDetails.pending,(state)=>{
        state.loading=true;
      })
      .addCase(fetchSchemeDetails.fulfilled,(state,action)=>{
         state.selectedScheme=action.payload;
         state.loading=false;
      })
      .addCase(fetchSchemeDetails.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(checkEligibility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEligibility.fulfilled, (state, action) => {
        state.loading = false;
        state.eligibility = action.payload;
      })
      .addCase(checkEligibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      
  },
});

export default schemeSlice.reducer;