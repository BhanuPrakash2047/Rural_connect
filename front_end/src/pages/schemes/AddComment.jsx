/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSchemeComment } from '../../redux_store/schemeSlice.js';

const AddComment = ({ schemeId }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.schemes);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await dispatch(addSchemeComment({ schemeId, commentText })).unwrap();
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-6">
      <h3 className="text-2xl font-semibold text-green-700 mb-4">
        Add a Comment
      </h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border-2 border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-none"
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={loading}
          rows="4"
        />

        <button
          type="submit"
          disabled={loading || !commentText.trim()}
          className={`
            px-6 py-2.5 rounded-md text-white font-medium
            ${loading || !commentText.trim() 
              ? 'bg-green-300 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800'}
            transition duration-200 ease-in-out
          `}
        >
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
};

export default AddComment;