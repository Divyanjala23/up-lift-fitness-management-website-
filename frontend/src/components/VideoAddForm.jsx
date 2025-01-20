import React, { useState } from "react";
import { motion } from "framer-motion";
import { SquarePlay, Text, Paperclip } from "lucide-react";

const VideoAddForm = () => {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    video: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", videoData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Video Title Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <SquarePlay
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleInputChange}
            className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Video Title"
          />
        </motion.div>
      </div>

      {/* Video Description Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <Text
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            name="description"
            value={videoData.description}
            onChange={handleInputChange}
            className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Video Description"
          />
        </motion.div>
      </div>

      {/* Video Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <Paperclip
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="file"
            name="video"
            accept="video/*"
            value={videoData.video}
            onChange={handleInputChange}
            className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="select Video file"
          />
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-lg bg-gradient-to-r from-red-700 to-red-500 py-3 font-semibold text-white shadow-lg shadow-red-500/30"
      >
        Add Video
      </motion.button>
    </form>
  );
};

export default VideoAddForm;
