import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8081/civic/notifications";
const getToken = 1;

// Fetch user notifications
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch notifications");
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/user/seen/${notificationId}`, {}, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark as read");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
     notifications: [], 
     loading: false, 
     error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.fulfilled, (state, action) => { state.notifications = action.payload; })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notif = state.notifications.find(n => n.id === action.payload);
        if (notif) notif.isRead = true;
      });
  },
});

export default notificationSlice.reducer;
