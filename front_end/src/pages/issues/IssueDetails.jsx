import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueDetails, fetchIssueComments, voteIssue, commentOnIssue } from "../../utils/issuesUtil";
import { FaThumbsUp, FaUserTie, FaUserCircle} from "react-icons/fa";

const IssueDetails = () => {
  const { issueId } = useParams(); // Get issue ID from URL
  const dispatch = useDispatch();
  const { selectedIssue, loading, error } = useSelector((state) => state.issues);
  const [comments, setComments] = useState([]); // Separate state for comments
  const [comment, setComment] = useState("");
  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    dispatch(fetchIssueDetails(issueId)); // Fetch issue details
    loadComments(); // Fetch comments separately
  }, [dispatch, issueId]);

  // Fetch comments separately
  const loadComments = async () => {
    try {
      const commentsData = await fetchIssueComments(issueId);
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Handle Voting (Like/Unlike)
  const handleVote = async () => {
    try {
      await voteIssue(issueId);
      setUserLiked(!userLiked); // Toggle like state
      dispatch(fetchIssueDetails(issueId)); // Refresh issue details
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    try {
      await commentOnIssue(issueId, comment);
      setComment(""); // Clear input field
      loadComments(); // Refresh comments separately
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      {/* Left Side: Issue Details */}
      <div className="w-3/5 p-8 bg-white shadow-md rounded-lg">
        {/* Loading & Error Handling */}
        {loading && <p className="text-blue-500 text-center">Loading issue details...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Issue Details */}
        {selectedIssue && (
          <>
            <h2 className="text-4xl font-bold text-green-700">{selectedIssue.title}</h2>
            <p className="text-lg text-gray-600 mt-3">{selectedIssue.description}</p>
            <p className="text-sm text-gray-500 mt-2">📍 {selectedIssue.location}</p>

            {/* Issue Metadata */}
            <div className="mt-5 p-8 bg-gray-50 rounded-md shadow-sm ">
              <p className="text-gray-700 mb-4"><strong>👤 Created By:</strong> {selectedIssue.user?.username}</p>
              <p className="text-gray-700 mb-4"><strong>📅 Created On:</strong> {new Date(selectedIssue.createdAt).toLocaleString()}</p>
              <p className="text-gray-700 mb-4">
                <strong>🛠 Last Updated:</strong> {selectedIssue.updatedAt ? new Date(selectedIssue.updatedAt).toLocaleString() : "Not Updated Yet"}
              </p>
              <p className="text-gray-700 mb-4" ><strong>📌 Status:</strong> {selectedIssue.status}</p>

              {/* Admin Assigned */}
              {selectedIssue.assignedAdmin && (
                <div className="mt-3 p-6 bg-blue-100 rounded-md ">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">👮 Assigned Admin</h3>
                  <p className="text-gray-700 mb-4"><FaUserTie className="inline-block" /> {selectedIssue.assignedAdmin.name}</p>
                  <p className="text-gray-700 mb-4">📧 {selectedIssue.assignedAdmin.email}</p>
                </div>
              )}

              {/* Response from Admin or User */}
              {selectedIssue.response_from_admin && (
                <p className="mt-3 text-sm bg-yellow-100 p-2 rounded-md"><strong>📢 Admin Response:</strong> {selectedIssue.response_from_admin}</p>
              )}
              {selectedIssue.response_from_user && (
                <p className="mt-3 text-sm bg-green-100 p-2 rounded-md"><strong>🗣️ User Response:</strong> {selectedIssue.response_from_user}</p>
              )}
            </div>

            {/* Likes & Vote Button */}
            <div className="mt-5 flex items-center gap-4">
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white ${
                  userLiked ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } transition-all`}
              >
                <FaThumbsUp /> {selectedIssue.count} Likes
              </button>
            </div>
          </>
        )}
      </div>

      {/* Right Side: Comments Section */}
      <div className="w-2/5 p-8 bg-white shadow-md rounded-lg overflow-y-auto h-screen">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">💬 Comments</h3>

        {/* Comments List */}
        <div className="space-y-4">
          {Array.isArray(comments) &&  comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-md bg-gray-50">
                <FaUserCircle className="text-gray-500 text-3xl" />
                <div>
                  <p className="text-sm font-semibold">{cmt.user?.username}</p>
                  <p className="text-gray-700">{cmt.comment}</p>
                  <p className="text-xs text-gray-500">{new Date(cmt.time).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Add a Comment */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-700">📝 Add a Comment</h3>
          <form onSubmit={handleCommentSubmit} className="mt-3">
            <textarea
              className="w-full p-3 border rounded-md focus:ring focus:ring-green-300"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
