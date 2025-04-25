
import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "./issueSlice";
import notificationReducer from "./notificationSlice";
import schemeNotifcationReducer from "./schemeNotificationSlice";
import schemeReducer from "./schemeSlice";
import jobReducer from './JobReduxSlice';


export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    notifications: notificationReducer,
    schemes: schemeReducer,
    schemeNotifications: schemeNotifcationReducer,
    jobs: jobReducer,

  },
});