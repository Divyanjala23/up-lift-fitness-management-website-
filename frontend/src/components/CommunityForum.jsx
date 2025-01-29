import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  MessageSquare,
  Reply,
  Dumbbell,
  Flame,
  Trophy,
  Heart,
  Tag,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";
import Footer from "./Footer";

const CATEGORIES = [
  { name: "All", icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Workout", icon: <Dumbbell className="w-4 h-4" /> },
  { name: "Nutrition", icon: <Flame className="w-4 h-4" /> },
  { name: "Achievement", icon: <Trophy className="w-4 h-4" /> },
  { name: "Question", icon: <MessageSquare className="w-4 h-4" /> },
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Coach_Alex",
    title: "💪 Hit a New PR Today!",
    content:
      "Finally hit 225lbs on bench press! Big thanks to everyone at UPLIFT for the constant motivation and support. Remember: every small win counts towards your bigger goals!",
    category: "Achievement",
    timestamp: "2024-01-16",
    likes: 42,
    comments: [
      {
        id: 1,
        author: "FitnessPro",
        content: "Amazing progress! Keep pushing those limits! 🎯",
        timestamp: "2024-01-16",
        likes: 8,
      },
    ],
  },
  {
    id: 2,
    author: "NutritionGuru",
    title: "🥗 Quick Post-Workout Meal Ideas",
    content:
      "Maximize your gains with these quick and delicious post-workout meals:\n\n1. Greek yogurt with berries and honey\n2. Grilled chicken wrap with avocado\n3. Protein smoothie with banana and peanut butter\n\nWhat's your favorite post-workout meal?",
    category: "Nutrition",
    timestamp: "2024-01-16",
    likes: 35,
    comments: [],
  },

  // ... other initial posts
];

const CommunityForum = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Workout",
  });
  const [newComment, setNewComment] = useState("");
  const [activePost, setActivePost] = useState(null);

  // ... existing handler functions remain the same

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const currentDate = new Date().toISOString().split("T")[0];
      setPosts([
        {
          id: posts.length + 1,
          author: "CurrentUser",
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          timestamp: currentDate,
          likes: 0,
          comments: [],
        },
        ...posts,
      ]);
      setNewPost({ title: "", content: "", category: "Workout" });
    }
  };

  const handleVote = (postId, type, isComment = false, commentId = null) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          if (isComment && commentId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, [type]: comment[type] + 1 }
                  : comment
              ),
            };
          }
          return { ...post, [type]: post[type] + 1 };
        }
        return post;
      })
    );
  };

  const handleCommentSubmit = (postId) => {
    if (newComment.trim()) {
      const currentDate = new Date().toISOString().split("T")[0];
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: "CurrentUser",
                  content: newComment,
                  timestamp: currentDate,
                  likes: 0,
                },
              ],
            };
          }
          return post;
        })
      );
      setNewComment("");
      setActivePost(null);
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden font-inter">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative min-h-[60dvh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-600/30 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/gym-community.jpg')] bg-cover bg-center scale-105" />

        <motion.div
          className="relative z-20 text-center max-w-6xl px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-red-500 animate-pulse" />
            <span className="text-red-500 tracking-widest font-semibold text-lg">
              JOIN THE CONVERSATION
            </span>
            <Zap className="w-8 h-8 text-red-500 animate-pulse" />
          </div>

          <h1 className="text-6xl font-black mb-8 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            COMMUNITY FORGE
          </h1>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="absolute inset-0 bg-red-500/10 radial-gradient" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Categories */}
          <motion.div
            className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-red-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {CATEGORIES.map((cat, index) => (
              <motion.button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all
                  ${
                    selectedCategory === cat.name
                      ? "bg-gradient-to-r from-red-700 to-red-500 text-white shadow-lg shadow-red-500/30"
                      : "bg-gray-900/60 text-gray-400 hover:bg-red-500/20 border border-red-500/20"
                  }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.icon}
                {cat.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Create Post */}
          <motion.div
            className="bg-gray-900/60 border border-red-500/20 rounded-xl backdrop-blur-lg p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Flame className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                Share Your Journey
              </h2>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="What's on your mind? Make it inspiring!"
                  className="flex-1 px-6 py-4 rounded-lg bg-black/50 text-white border border-red-500/20
                           placeholder:text-gray-500 focus:outline-none focus:border-red-500
                           transition-all duration-300"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <select
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  className="px-6 py-4 rounded-lg bg-black/50 text-white border border-red-500/20
                           focus:outline-none focus:border-red-500 transition-all duration-300"
                >
                  {CATEGORIES.slice(1).map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Share your workout, progress, or ask for advice... Let's inspire each other! 💪"
                className="w-full h-32 px-6 py-4 rounded-lg bg-black/50 text-white border border-red-500/20
                         placeholder:text-gray-500 focus:outline-none focus:border-red-500
                         transition-all duration-300 resize-none"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />

              <motion.button
                type="submit"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-700 to-red-500 
                         text-white px-8 py-4 rounded-full font-semibold tracking-wider
                         shadow-lg shadow-red-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Share with the Community
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Posts Feed */}
          <div className="space-y-8">
            {posts
              .filter(
                (post) =>
                  selectedCategory === "All" ||
                  post.category === selectedCategory
              )
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-gray-900/60 border border-red-500/20 rounded-xl backdrop-blur-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-8 border-b border-red-500/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-500 
                                    flex items-center justify-center"
                        >
                          <UserCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white">
                            {post.author}
                          </h3>
                          <div className="flex gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {post.timestamp}
                            </span>
                            <span className="flex items-center gap-2">
                              <Tag className="w-4 h-4" />
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">
                      {post.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  <div className="px-8 py-4 bg-black/30">
                    <div className="flex gap-6">
                      <motion.button
                        onClick={() => handleVote(post.id, "likes")}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          setActivePost(activePost === post.id ? null : post.id)
                        }
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                      </motion.button>
                    </div>

                    {/* Comments Section */}
                    {activePost === post.id && (
                      <motion.div
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {post.comments.map((comment, commentIndex) => (
                          <motion.div
                            key={comment.id}
                            className="bg-black/30 rounded-lg p-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: commentIndex * 0.1 }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <UserCircle className="w-6 h-6 text-gray-400" />
                              <span className="font-medium text-white">
                                {comment.author}
                              </span>
                              <span className="text-sm text-gray-500">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-gray-300">{comment.content}</p>
                            <motion.button
                              onClick={() =>
                                handleVote(post.id, "likes", true, comment.id)
                              }
                              className="flex items-center gap-2 mt-2 text-gray-400 hover:text-red-500"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Heart className="w-4 h-4" /> {comment.likes}
                            </motion.button>
                          </motion.div>
                        ))}

                        <div className="flex gap-4 mt-4">
                          <input
                            type="text"
                            placeholder="Add to the discussion..."
                            className="flex-1 px-4 py-2 rounded-lg bg-black/50 text-white
                                     border border-red-500/20 focus:outline-none focus:border-red-500
                                     transition-all duration-300 placeholder:text-gray-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <motion.button
                            onClick={() => handleCommentSubmit(post.id)}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-500
                                     text-white px-6 py-2 rounded-full font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Reply className="w-4 h-4" />
                            Reply
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityForum;
