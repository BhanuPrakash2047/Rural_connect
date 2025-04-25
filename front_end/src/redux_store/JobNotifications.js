import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/notifications';
const getToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZS5nZW51aW5lY29kZXIuY29tIiwibmFtZSI6IkJoYW51IFByYWthc2giLCJlbWFpbCI6ImJoYW51LnByYWthc2hAZXhhbXBsZS5jb20iLCJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNzQ1NTk4NzU5LCJleHAiOjE3NDU2MTA3NTl9.2QfB7tRTRBItONrE1i1y8QkZGIAMaJhp68LkAlw26LJM-cw4ZAM39nmQecCMP7rWG6nNY5p9luQ_FXOw1CltSQ";
// Async Thunks
export const getUserNotifications = createAsyncThunk(
  'notifications/getUserNotifications',
  async (_, { rejectWithValue }) => {
    try {

      const response = await axios.get(`${BASE_URL}/user`, {
        headers: { 
            Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch notifications');
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      await axios.put(`${BASE_URL}/${notificationId}/read`, {}, {
        headers: { 
            Authorization: `Bearer ${getToken}`,
                "Content-Type": "application/json",
        }
      });
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to mark notification as read');
    }
  }
);

// Initial state
const initialState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0
};

// Notification Slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationErrors: (state) => {
      state.error = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get User Notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(notification => !notification.read).length;
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark Notification as Read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.map(notification => {
          if (notification.id === action.payload) {
            return { ...notification, read: true };
          }
          return notification;
        });
        state.unreadCount = state.notifications.filter(notification => !notification.read).length;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearNotificationErrors, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;