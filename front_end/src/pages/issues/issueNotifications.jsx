import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNotifications, markUserNotificationSeen, deleteUserNotification } from "../../utils/issuesUtil";
import { Bell, X } from "lucide-react"; // Importing icons

const Notifications = () => {
  const dispatch = useDispatch();
  const { userNotifications, loading } = useSelector((state) => state.issues);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch notifications when component loads
  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  // Handle marking notification as read
  const handleMarkAsRead = (notificationId) => {
    dispatch(markUserNotificationSeen( notificationId ));
  };

  // Handle deleting a notification
  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteUserNotification( notificationId ));
  };

  const hasUnread = userNotifications?.length > 0 && userNotifications.some((notif) => !notif.read);

  return (
    <div className="relative">
      {/* 🔔 Notification Icon */}
      <button onClick={() => setShowPopup(!showPopup)} className="relative p-2 text-gray-700 hover:text-green-600">
        <Bell className="w-7 h-7 text-amber-50" />
        {/* 🔴 Blinking Dot for Unread Notifications */}
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-blue-950 rounded-full animate-ping"></span>
        )}
      </button>

      {/* 📩 Notification Popup */}
      {showPopup && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg z-50">
          {/* 🔘 Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-red-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 🔄 Loading State */}
          {loading && <p className="text-center py-3 text-blue-500">Loading notifications...</p>}

          {/* 📜 Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {userNotifications?.length > 0 ? (
              userNotifications.map((notif) => (
                console.log(notif),
                <div key={notif.id} className="flex flex-col px-4 py-3 border-b hover:bg-gray-100 transition">
                  <p className="text-gray-700">{notif.discription}</p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                    {/* ✅ Mark as Read Button - Disabled if already read */}
                    <button
                      className={`px-1 py-1 rounded-md ${
                        notif.read
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-700"
                      }`}
                      onClick={() => handleMarkAsRead(notif.id)}
                      disabled={notif.isRead} // ✅ Button is disabled if already read
                    >
                      ✅ Mark as Read
                    </button>
                    
                    {/* ❌ Delete Button */}
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                      onClick={() => handleDeleteNotification(notif.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-3 text-gray-500">No notifications available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
