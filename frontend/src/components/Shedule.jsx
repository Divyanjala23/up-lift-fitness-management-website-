import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Search,
  ChevronDown,
  Zap,
  ArrowRight,
  Filter,
  User,
  Heart,
  Calendar as CalendarIcon,
  Trophy,
  Bell,
  Activity,
  Award,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Schedule = () => {
  const [activeView, setActiveView] = useState("weekly");
  const [selectedClass, setSelectedClass] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [isBooked, setIsBooked] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [userProgress, setUserProgress] = useState({
    completedWorkouts: 12,
    caloriesBurned: 3200,
    weeklyGoal: 4,
  });

  const userData = {
    name: "Sarah",
    level: "Advanced",
    streak: 15,
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const classTypes = [
    { name: "HIIT", color: "red", icon: <Activity size={16} /> },
    { name: "Yoga", color: "blue", icon: <Activity size={16} /> },
    { name: "Strength", color: "green", icon: <Activity size={16} /> },
    { name: "Cardio", color: "orange", icon: <Activity size={16} /> },
  ];

  // Weekly schedule classes
  const weeklyClasses = [
    {
      id: 1,
      name: "Power HIIT",
      type: "HIIT",
      time: "07:00 AM",
      trainer: "Alex Rivers",
      spots: 8,
      duration: "45 min",
      intensity: "High",
      color: "red",
      trending: true,
      participantCount: 12,
      calories: "400-500",
    },
    {
      id: 2,
      name: "Mindful Flow",
      type: "Yoga",
      time: "08:30 AM",
      trainer: "Maya Chen",
      spots: 5,
      duration: "60 min",
      intensity: "Medium",
      color: "blue",
      trending: false,
      participantCount: 15,
      calories: "200-300",
    },
    {
      id: 3,
      name: "Core Strength",
      type: "Strength",
      time: "10:00 AM",
      trainer: "Chris Parker",
      spots: 10,
      duration: "50 min",
      intensity: "High",
      color: "green",
      trending: true,
      participantCount: 8,
      calories: "300-400",
    }
  ];

  // Monthly schedule classes
  const monthlyClasses = [
    ...weeklyClasses,
    {
      id: 4,
      name: "Cardio Blast",
      type: "Cardio",
      time: "09:00 AM",
      trainer: "Jessica White",
      spots: 12,
      duration: "40 min",
      intensity: "High",
      color: "orange",
      trending: true,
      participantCount: 10,
      calories: "350-450",
    },
  ];

  // Filter and display classes based on active view and filter
  const getFilteredClasses = () => {
    const baseClasses = activeView === "weekly" ? weeklyClasses : monthlyClasses;
    
    return baseClasses
      .filter(classItem => 
        (!activeFilter || classItem.type === activeFilter) &&
        (!searchQuery || 
          classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          classItem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          classItem.trainer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  };

  const handleFavorite = (classId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(classId)) {
        newFavorites.delete(classId);
      } else {
        newFavorites.add(classId);
      }
      return newFavorites;
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleBooking = (classId) => {
    setIsBooked(prev => {
      const newBookings = new Set(prev);
      if (newBookings.has(classId)) {
        newBookings.delete(classId);
      } else {
        newBookings.add(classId);
      }
      return newBookings;
    });
  };

  const ClassCard = ({ classItem }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900/60 border border-red-500/20 rounded-lg p-6 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-${classItem.type.toLowerCase()}-500/20 text-${classItem.type.toLowerCase()}-500`}>
          {classItem.type}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-red-500"
          onClick={() => handleFavorite(classItem.id)}
        >
          <Heart size={20} fill={favorites.has(classItem.id) ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {classItem.time}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {classItem.trainer}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">{classItem.duration}</div>
          <div className="text-sm text-gray-400">{classItem.calories} cal</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-gray-400">{classItem.spots} spots left</span>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700"
            onClick={() => alert('Share feature coming soon!')}
          >
            <Share2 size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-semibold ${
              isBooked.has(classItem.id)
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
            onClick={() => handleBooking(classItem.id)}
          >
            {isBooked.has(classItem.id) ? 'Booked!' : 'Book Now'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ProgressDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/60 border border-red-500/20 rounded-lg p-6 backdrop-blur-lg mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-gray-400 mb-2">Completed Workouts</div>
          <div className="text-3xl font-bold">
            {userProgress.completedWorkouts}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 mb-2">Calories Burned</div>
          <div className="text-3xl font-bold">
            {userProgress.caloriesBurned}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 mb-2">Weekly Goal Progress</div>
          <div className="text-3xl font-bold">{userProgress.weeklyGoal}/5</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-black text-white overflow-x-hidden font-inter">
      <motion.div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y: isScrolled ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-600/30 to-black z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <motion.div
          className="relative z-20 text-center max-w-6xl px-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={32} className="text-red-500" />
            <span className="text-red-500 tracking-widest font-semibold text-lg">
              Welcome back, {userData.name}!
            </span>
            <Zap size={32} className="text-red-500" />
          </motion.div>

          <ProgressDashboard />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-700 to-red-500 text-white px-12 py-5 rounded-full font-semibold tracking-wider shadow-lg shadow-red-500/30"
          >
            BOOK A CLASS NOW
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-red-500/10" />

        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              {["weekly", "monthly"].map((view) => (
                <motion.button
                  key={view}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeView === view
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-red-500/50"
                  }`}
                  onClick={() => {
                    setActiveView(view);
                    setActiveFilter(null); // Reset filter when changing view
                  }}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)} View
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full hover:bg-gray-700"
                onClick={() => {
                  setActiveFilter(null);
                  setSearchQuery("");
                }}
              >
                <Filter size={20} />
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {classTypes.map((type) => (
              <motion.button
                key={type.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full border-2 ${
                  activeFilter === type.name
                    ? 'bg-red-500 text-white border-red-500'
                    : 'border-red-500/50 text-red-500 hover:bg-red-500/10'
                } flex items-center gap-2`}
                onClick={() => setActiveFilter(activeFilter === type.name ? null : type.name)}
                >
                  {type.icon}
                  {type.name}
                </motion.button>
              ))}
            </motion.div>
  
            <motion.div className="grid gap-6" layout>
              <AnimatePresence>
                {getFilteredClasses().map((classItem) => (
                  <ClassCard key={classItem.id} classItem={classItem} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
  
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg"
            >
              {favorites.size > 0 ? "Class added to favorites!" : "Removed from favorites!"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  export default Schedule;