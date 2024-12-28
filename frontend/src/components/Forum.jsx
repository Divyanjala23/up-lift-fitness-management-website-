import React, { useState } from 'react';
import '../assets/css/Forum.css'; // Add some custom styling here

const Forum = () => {
  const [posts, setPosts] = useState([]); // State to hold all posts
  const [newPost, setNewPost] = useState(''); // State for new post content
  const [comments, setComments] = useState({}); // State to hold comments for each post

  // Function to handle posting new threads
  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPost }]);
      setNewPost('');
    }
  };

  // Function to handle adding a comment to a post
  const handleComment = (postId, comment) => {
    if (comment.trim()) {
      setComments({
        ...comments,
        [postId]: [...(comments[postId] || []), comment],
      });
    }
  };

  return (
    <div className="forum-container">
      <h1 className="forum-title">Community Forum</h1>
      
      {/* Post Creation Section */}
      <div className="create-post">
        <textarea
          className="post-input"
          placeholder="Share something with the community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="post-button" onClick={handlePost}>
          Post
        </button>
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <p className="post-content">{post.content}</p>

              {/* Comments Section */}
              <div className="comments-section">
                <h4>Comments</h4>
                <div className="comments-list">
                  {(comments[post.id] || []).map((comment, index) => (
                    <p key={index} className="comment">{comment}</p>
                  ))}
                </div>
                <CommentForm
                  postId={post.id}
                  onComment={(comment) => handleComment(post.id, comment)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Component for adding a comment to a specific post
const CommentForm = ({ postId, onComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onComment(comment);
      setComment('');
    }
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        className="comment-input"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comment-button" onClick={handleSubmit}>
        Comment
      </button>
    </div>
  );
};

export default Forum;
