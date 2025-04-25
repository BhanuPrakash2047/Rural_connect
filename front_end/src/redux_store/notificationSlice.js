import { createSlice } from "@reduxjs/toolkit";

import { fetchAdminNotifications, fetchUserNotifications, markAdminNotificationSeen, markUserNotificationSeen, deleteAdminNotification, deleteUserNotification} from "../utils/issuesUtil";
// import { all } from "axios";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    userNotifications: [],
    adminNotifications:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.adminNotifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => { state.error = action.payload; })

      // User Notifications
      .addCase(fetchUserNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.userNotifications = action.payload || []; // ✅ Fallback to empty array
        state.loading = false;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.error = action.payload;
        state.userNotifications = []; // ✅ Ensure it does not become undefined
      })
      // Mark Notifications as Read
      .addCase(markAdminNotificationSeen.fulfilled, (state, action) => {
        const notification = state.adminNotifications.find(n => n.id === action.payload);
        if (notification) notification.read = true;
      })
      .addCase(markUserNotificationSeen.fulfilled, (state, action) => {
        const notification = state.userNotifications.find(n => n.id === action.payload);
        if (notification) notification.read = true;
      })

      // Delete Notifications
      .addCase(deleteAdminNotification.fulfilled, (state, action) => {
        state.adminNotifications = state.adminNotifications.filter(n => n.id !== action.payload);
      })
      .addCase(deleteUserNotification.fulfilled, (state, action) => {
        state.userNotifications = state.userNotifications.filter(n => n.id !== action.payload);
      });
  },
});

export default notificationSlice.reducer;
