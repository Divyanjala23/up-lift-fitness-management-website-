import React, { useState } from 'react';
import { 
  User, 
  Target, 
  Flame, 
  Heart, 
  TrendingUp, 
  Award, 
  Clock, 
  Zap, 
  BarChart2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const MemberDashboard = () => {
  const [memberProfile] = useState({
    name: "Alex Rodriguez",
    memberSince: "January 2023",
    membershipTier: "Premium",
    fitnessGoals: [
      { name: "Weight Loss", progress: 65 },
      { name: "Muscle Gain", progress: 45 }
    ],
    stats: {
      workoutsThisMonth: 16,
      totalWorkouts: 184,
      caloriesBurned: 24500,
      avgWorkoutDuration: 62
    },
    recentAchievements: [
      { title: "30-Day Consistency", date: "2024-01-15" },
      { title: "Personal Best: Deadlift", date: "2024-01-22" }
    ],
    personalRecords: {
      benchPress: 225,
      squats: 315,
      deadlift: 405
    }
  });

  const StatCard = ({ icon, title, value, subtext }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-lg p-4 flex items-center gap-4"
    >
      <div className="bg-red-500/20 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <div className="text-gray-400 text-sm">{title}</div>
        <div className="font-bold text-xl">{value}</div>
        {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
      </div>
    </motion.div>
  );

  const ProgressBar = ({ goal, progress }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{goal.name}</span>
        <span>{progress}%</span>
      </div>
      <div className="bg-gray-700 rounded-full h-2">
        <div 
          className="bg-red-500 rounded-full h-2" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="text-red-500" /> Welcome, {memberProfile.name}
            </h1>
            <p className="text-gray-400">Member since {memberProfile.memberSince}</p>
          </div>
          <div className="bg-red-500 text-white px-4 py-2 rounded-full">
            {memberProfile.membershipTier} Membership
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-red-500" /> Fitness Goals
              </h2>
              {memberProfile.fitnessGoals.map((goal) => (
                <ProgressBar key={goal.name} goal={goal} progress={goal.progress} />
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-red-500" /> Personal Records
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(memberProfile.personalRecords).map(([exercise, weight]) => (
                  <div key={exercise} className="text-center">
                    <div className="text-gray-400 mb-1">{exercise}</div>
                    <div className="font-bold text-lg">{weight} lbs</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <StatCard 
              icon={<Flame className="text-red-500" />}
              title="Calories Burned"
              value={memberProfile.stats.caloriesBurned}
              subtext="This Month"
            />
            <StatCard 
              icon={<Clock className="text-red-500" />}
              title="Avg. Workout Duration"
              value={`${memberProfile.stats.avgWorkoutDuration} mins`}
            />
            <StatCard 
              icon={<Zap className="text-red-500" />}
              title="Workouts This Month"
              value={memberProfile.stats.workoutsThisMonth}
            />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gray-900 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-red-500" /> Recent Achievements
          </h2>
          {memberProfile.recentAchievements.map((achievement) => (
            <div 
              key={achievement.title} 
              className="flex justify-between items-center mb-2 p-3 bg-gray-800 rounded"
            >
              <span>{achievement.title}</span>
              <span className="text-gray-500 text-sm">{achievement.date}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDashboard;