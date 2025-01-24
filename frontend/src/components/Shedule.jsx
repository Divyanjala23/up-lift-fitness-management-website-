import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Search,
  Zap,
  Filter,
  User,
  Heart,
  Activity,
  Trophy,
  Share2,
  Star,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Schedule = () => {
  const [activeView, setActiveView] = useState("recommended");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [isBooked, setIsBooked] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "Alex Rodriguez",
    age: 28,
    fitnessLevel: "Intermediate",
    goals: ["Weight Loss", "Muscle Tone"],
    preferredWorkouts: ["HIIT", "Strength"],
    restrictions: ["Lower Back Sensitivity"],
    membershipTier: "Premium",
    completedWorkouts: 12,
    caloriesBurned: 3200,
    weeklyGoal: 4,
    fitnessStreak: 15,
    personalBests: {
      weightLifted: 225,
      cardioEndurance: 45,
      yogaBalance: 15
    }
  });

  const recommendedClasses = [
    {
      id: 1,
      name: "Power HIIT Pro",
      type: "HIIT",
      time: "07:00 AM",
      trainer: "Alex Rivers",
      spots: 8,
      duration: "45 min",
      intensity: userProfile.fitnessLevel === "Advanced" ? "High" : "Medium",
      color: "red",
      tailoredFor: userProfile.goals.includes("Weight Loss"),
      calories: "400-500",
      recommendationReason: "Perfect for your weight loss goals!"
    },
    {
      id: 2,
      name: "Core Strength Evolution",
      type: "Strength",
      time: "10:00 AM",
      trainer: "Chris Parker",
      spots: 10,
      duration: "50 min",
      intensity: "High",
      color: "green",
      tailoredFor: userProfile.goals.includes("Muscle Tone"),
      calories: "300-400",
      recommendationReason: "Targets muscle toning for your fitness goals"
    },
    {
      id: 3,
      name: "Gentle Flow with Modifications",
      type: "Yoga",
      time: "08:30 AM",
      trainer: "Maya Chen",
      spots: 5,
      duration: "60 min",
      intensity: "Low",
      color: "blue",
      tailoredFor: true,
      calories: "200-300",
      recommendationReason: "Low-impact class considering your back sensitivity"
    }
  ];

  const classTypes = [
    { name: "HIIT", color: "red", icon: <Activity size={16} /> },
    { name: "Yoga", color: "blue", icon: <Activity size={16} /> },
    { name: "Strength", color: "green", icon: <Activity size={16} /> },
    { name: "Cardio", color: "orange", icon: <Activity size={16} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNotificationMessage = (message, duration = 2000) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), duration);
  };

  const handleFavorite = (classId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(classId)) {
        newFavorites.delete(classId);
        showNotificationMessage("Removed from favorites!");
      } else {
        newFavorites.add(classId);
        showNotificationMessage("Added to favorites!");
      }
      return newFavorites;
    });
  };

  const handleBooking = (classId, spots) => {
    if (spots === 0 && !isBooked.has(classId)) {
      showNotificationMessage("Sorry, this class is full!");
      return;
    }

    setIsBooked((prev) => {
      const newBookings = new Set(prev);
      if (newBookings.has(classId)) {
        newBookings.delete(classId);
        showNotificationMessage("Booking cancelled!");
      } else {
        newBookings.add(classId);
        showNotificationMessage("Class booked successfully!");
      }
      return newBookings;
    });
  };

  const handleShare = (classItem) => {
    const shareData = {
      title: `Join me for ${classItem.name}!`,
      text: `Join me for ${classItem.name} with ${classItem.trainer} at ${classItem.time}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => showNotificationMessage("Shared successfully!"))
        .catch(() => showNotificationMessage("Sharing failed"));
    } else {
      showNotificationMessage("Sharing is not supported on this device");
    }
  };

  const getFilteredClasses = () => {
    let baseClasses = recommendedClasses;

    return baseClasses.filter(
      (classItem) =>
        (activeView === "recommended" || activeView === classItem.type.toLowerCase()) &&
        (!activeFilter || classItem.type === activeFilter) &&
        (!searchQuery ||
          classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          classItem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          classItem.trainer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const PersonalProgressDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/60 border border-red-500/20 rounded-lg p-6 backdrop-blur-lg mb-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Fitness Level
          </div>
          <div className="text-xl font-bold">{userProfile.fitnessLevel}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
            <Flame size={20} className="text-red-500" />
            Calories Burned
          </div>
          <div className="text-xl font-bold">{userProfile.caloriesBurned}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 mb-2 flex items-center justify-center gap-2">
            <Trophy size={20} className="text-green-500" />
            Weekly Goal
          </div>
          <div className="text-xl font-bold">{userProfile.weeklyGoal}/5</div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="text-gray-400 mb-2">Your Current Goals</div>
        <div className="flex justify-center gap-2">
          {userProfile.goals.map((goal) => (
            <span 
              key={goal} 
              className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-sm"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const PersonalClassCard = ({ classItem }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900/60 border border-red-500/20 rounded-lg p-6 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-${classItem.color}-500/20 text-${classItem.color}-500 flex items-center gap-2`}>
          {classItem.icon || <Activity size={16} />}
          {classItem.type}
        </div>
        <div className="flex items-center gap-2">
          {classItem.tailoredFor && (
            <motion.div 
              className="text-yellow-500 flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              title="Tailored for you"
            >
              <Star size={16} fill="currentColor" />
              <span className="text-xs">Personalized</span>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-red-500"
            onClick={() => handleFavorite(classItem.id)}
            aria-label={favorites.has(classItem.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={20} fill={favorites.has(classItem.id) ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
          {classItem.recommendationReason && (
            <p className="text-sm text-gray-400 italic mb-2">
              {classItem.recommendationReason}
            </p>
          )}
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
            onClick={() => handleShare(classItem)}
            aria-label="Share class"
          >
            <Share2 size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-semibold ${
              isBooked.has(classItem.id)
                ? "bg-green-500 text-white"
                : classItem.spots === 0
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            onClick={() => handleBooking(classItem.id, classItem.spots)}
            disabled={classItem.spots === 0 && !isBooked.has(classItem.id)}
          >
            {isBooked.has(classItem.id)
              ? "Booked!"
              : classItem.spots === 0
              ? "Class Full"
              : "Book Now"}
          </motion.button>
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
              Welcome back, {userProfile.name}!
            </span>
            <Zap size={32} className="text-red-500" />
          </motion.div>

          <PersonalProgressDashboard />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-700 to-red-500 text-white px-12 py-5 rounded-full font-semibold tracking-wider shadow-lg shadow-red-500/30"
            onClick={() => document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' })}
          >
            FIND YOUR PERFECT CLASS
          </motion.button>
        </motion.div>
      </motion.div>

      <div id="schedule" className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="flex flex-wrap items-center justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              {["Recommended", ...classTypes.map(type => type.name)].map((view) => (
                <motion.button
                  key={view}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeView.toLowerCase() === view.toLowerCase()
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-red-500/50"
                  }`}
                  onClick={() => {
                    setActiveView(view);
                    setActiveFilter(null);
                  }}
              >
                {view}
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
                className="bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
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
                  ? "bg-red-500 text-white border-red-500"
                  : "border-red-500/50 text-red-500 hover:bg-red-500/10"
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
              <PersonalClassCard key={classItem.id} classItem={classItem} />
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
          className="fixed bottom-8 right-8 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg z-50"
        >
          {notificationMessage}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default Schedule;