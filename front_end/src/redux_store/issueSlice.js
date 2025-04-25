import { createSlice } from "@reduxjs/toolkit";

import {likedIssuesByUser,commentedIssuesByUser,fetchCommentedIssues, fetchIssueDetails,fetchIssuesByLocation,fetchLikedIssues,fetchUserIssues,fetchTopIssues, fetchAllIssues, fetchAdminNotifications, fetchUserNotifications, markAdminNotificationSeen, markUserNotificationSeen, deleteAdminNotification, deleteUserNotification} from "../utils/issuesUtil";
// import { all } from "axios";

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    locationIssues: [],
    allIssues: [],
    userIssues: [],
    likedIssues: [],
    commentedIssues: [],
    selectedIssue: {},
    topIssues: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIssues.pending, (state) => { state.loading = true; })
      .addCase(fetchAllIssues.fulfilled, (state, action) => { state.allIssues = action.payload;
        state.loading = false;
       })
      .addCase(fetchAllIssues.rejected, (state, action) => { state.error = action.error.message; })

      .addCase(fetchIssuesByLocation.pending, (state) => { state.loading = true; })
      .addCase(fetchIssuesByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.locationIssues = action.payload;
      })
      .addCase(fetchIssuesByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserIssues.fulfilled, (state, action) => { state.userIssues = action.payload; })
      .addCase(fetchLikedIssues.fulfilled, (state, action) => { state.likedIssues = action.payload; })
      .addCase(fetchCommentedIssues.fulfilled, (state, action) => { state.commentedIssues = action.payload; })
      .addCase(fetchIssueDetails.fulfilled, (state, action) => { state.selectedIssue = action.payload; })
      .addCase(fetchTopIssues.fulfilled, (state, action) => { state.topIssues = action.payload; })

      .addCase(fetchAdminNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminNotifications.fulfilled, (state, action) => {
        state.adminNotifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminNotifications.rejected, (state, action) => { state.error = action.payload; })

      // User Notifications
      .addCase(fetchUserNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.userNotifications = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => { state.error = action.payload; })

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
      })
      .addCase(likedIssuesByUser.pending,(state)=>{state.loading=true})
      .addCase(likedIssuesByUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(likedIssuesByUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.likedIssues=action.payload
      })
      .addCase(commentedIssuesByUser.pending,(state)=>{state.loading=true})
      .addCase(commentedIssuesByUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
      })
      .addCase(commentedIssuesByUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.commentedIssues=action.payload
      })

  },
});

export default issuesSlice.reducer;
