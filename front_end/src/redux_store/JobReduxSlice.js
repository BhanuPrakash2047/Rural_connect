import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/jobs';
const getToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZS5nZW51aW5lY29kZXIuY29tIiwibmFtZSI6IkJoYW51IFByYWthc2giLCJlbWFpbCI6ImJoYW51LnByYWthc2hAZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzQ1NTk4NzU5LCJleHAiOjE3NDU2MTA3NTl9.2QfB7tRTRBItONrE1i1y8QkZGIAMaJhp68LkAlw26LJM-cw4ZAM39nmQecCMP7rWG6nNY5p9luQ_FXOw1CltSQ";


// Async Thunks
export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, jobData, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create job');
    }
  }
);

export const getJobsByLocation = createAsyncThunk(
  'jobs/getJobsByLocation',
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}?location=${location}`,{
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch jobs by location');
    }
  }
);

export const getJobById = createAsyncThunk(
  'jobs/getJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${jobId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
              }
            }
          );
      return response.data;
    } 
    catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch job details');
    }
  }
);


export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${jobId}`, jobData, {
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
              
            }
          
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update job');
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${jobId}`, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
        }
      });
      return jobId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete job');
    }
  }
);

export const flagJob = createAsyncThunk(
  'jobs/flagJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/${jobId}/flag`,{},

        {
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
            }
          });
      return jobId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to flag job');
    }
  }
);

export const searchJobsByTitle = createAsyncThunk(
  'jobs/searchJobsByTitle',
  async (jobTitle, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/search/${jobTitle}`,{},
        

        {
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
            }
          });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to search jobs');
    }
  }
);

export const getTopJobsByLocation = createAsyncThunk(
  'jobs/getTopJobsByLocation',
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/top/${location}`,{},

        {
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
            }
          });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch top jobs');
    }
  }
);


export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/apply/${jobId}`, {}, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
        }
      });
      return { jobId, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to apply for job');
    }
  }
);

export const getJobApplications = createAsyncThunk(
  'jobs/getJobApplications',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/job/${jobId}/applications`, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
        }
      });
      return { jobId, applications: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch job applications');
    }
  }
);

export const getUserApplications = createAsyncThunk(
  'jobs/getUserApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/you/applications`, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user applications');
    }
  }
);

export const withdrawApplication = createAsyncThunk(
  'jobs/withdrawApplication',
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/${jobId}/withdraw`, {}, {
        headers: { 
            headers: {
                Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
            }         }
      });
      return jobId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to withdraw application');
    }
  }
);

// Initial state
const initialState = {
  jobs: [],
  job: null,
  applications: [],
  userApplications: [],
  loading: false,
  error: null,
  success: false,
  message: ''
};

// Job Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobState: (state) => {
      state.job = null;
      state.error = null;
      state.success = false;
      state.message = '';
    },
    clearJobsList: (state) => {
      state.jobs = [];
    },
    clearApplications: (state) => {
      state.applications = [];
    },
    clearJobErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
        state.success = true;
        state.message = 'Job created successfully';
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Jobs By Location
      .addCase(getJobsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Job By Id
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        );
        state.job = action.payload;
        state.success = true;
        state.message = 'Job updated successfully';
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
        state.success = true;
        state.message = 'Job deleted successfully';
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Flag Job
      .addCase(flagJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(flagJob.fulfilled, (state, action) => {
        state.loading = false;
        if (state.job && state.job.id === action.payload) {
          state.job.flagCount += 1;
        }
        state.jobs = state.jobs.map(job => {
          if (job.id === action.payload) {
            return { ...job, flagCount: job.flagCount + 1 };
          }
          return job;
        });
        state.success = true;
        state.message = 'Job flagged successfully';
      })
      .addCase(flagJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search Jobs By Title
      .addCase(searchJobsByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchJobsByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(searchJobsByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Top Jobs By Location
      .addCase(getTopJobsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopJobsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(getTopJobsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Apply For Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Job Applications
      .addCase(getJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications;
      })
      .addCase(getJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Applications
      .addCase(getUserApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.userApplications = action.payload;
      })
      .addCase(getUserApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Withdraw Application
      .addCase(withdrawApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.userApplications = state.userApplications.map(app => {
          if (app.job.id === action.payload) {
            return { ...app, status: 'WITHDRAWN', isActive: false };
          }
          return app;
        });
        state.success = true;
        state.message = 'Application withdrawn successfully';
      })
      .addCase(withdrawApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearJobState, clearJobsList, clearApplications, clearJobErrors } = jobSlice.actions;
export default jobSlice.reducer;