import React, { useState } from 'react';
import { Calendar, Activity, User, Clipboard, Users, Book, Bell, Settings, PlusSquare, LineChart, Award, Dumbbell } from 'lucide-react';


const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`p-6 rounded-lg border transition-all duration-200 ${className}`}>
    {children}
  </div>
);

const TabContent = ({ tab }) => {
  switch (tab) {
    case 'workout':
      return (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-6">Workout Planner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Today's Workout</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Dumbbell className="w-5 h-5 mr-2 text-red-500" />
                  <span>Bench Press - 4 sets × 12 reps</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Dumbbell className="w-5 h-5 mr-2 text-red-500" />
                  <span>Squats - 3 sets × 15 reps</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Dumbbell className="w-5 h-5 mr-2 text-red-500" />
                  <span>Deadlifts - 3 sets × 10 reps</span>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Start Workout
              </button>
            </Card>
            <Card className="bg-gray-800 border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Recent PRs</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Bench Press</span>
                  <span className="text-red-500 font-bold">225 lbs</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Squat</span>
                  <span className="text-red-500 font-bold">315 lbs</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Deadlift</span>
                  <span className="text-red-500 font-bold">405 lbs</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    case 'nutrition':
      return (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-6">Nutrition Tracker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Today's Macros</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Protein</span>
                  <div className="w-2/3">
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">140g / 200g</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Carbs</span>
                  <div className="w-2/3">
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">180g / 300g</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Fats</span>
                  <div className="w-2/3">
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">45g / 100g</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-800 border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Add Meal</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-gray-700 text-gray-300 rounded flex items-center hover:bg-gray-600">
                  <PlusSquare className="w-5 h-5 mr-2 text-red-500" />
                  Breakfast
                </button>
                <button className="w-full p-3 bg-gray-700 text-gray-300 rounded flex items-center hover:bg-gray-600">
                  <PlusSquare className="w-5 h-5 mr-2 text-red-500" />
                  Lunch
                </button>
                <button className="w-full p-3 bg-gray-700 text-gray-300 rounded flex items-center hover:bg-gray-600">
                  <PlusSquare className="w-5 h-5 mr-2 text-red-500" />
                  Dinner
                </button>
              </div>
            </Card>
          </div>
        </div>
      );
    case 'community':
      return (
        <div className="animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-6">Community Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-red-800">
              <h3 className="text-xl font-semibold text-white mb-4">Active Challenges</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Award className="w-5 h-5 mr-2 text-red-500" />
                  <span>30 Days of Strength</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Award className="w-5 h-5 mr-2 text-red-500" />
                  <span>Summer Shred Challenge</span>
                </div>
              </div>
            </Card>
            <Card className="bg-gray-800 border-red-800 md:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4">Leaderboard</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah J.', points: 2500 },
                  { name: 'Mike R.', points: 2350 },
                  { name: 'Alex K.', points: 2200 },
                ].map((user, index) => (
                  <div key={index} className="flex justify-between items-center text-gray-300 p-2 bg-gray-700 rounded">
                    <span>{`${index + 1}. ${user.name}`}</span>
                    <span className="text-red-500 font-bold">{user.points} pts</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userData = {
    name: "John Doe",
    weight: 180,
    bmi: 24.5,
    workoutsThisWeek: 3,
    calorieGoal: 2500,
    streak: 5
  };

  const workoutData = [
    { name: 'Mon', value: 60 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 50 },
    { name: 'Fri', value: 0 },
    { name: 'Sat', value: 0 },
    { name: 'Sun', value: 0 },
  ];

  const renderMainContent = () => {
    if (activeTab !== 'overview') {
      return <TabContent tab={activeTab} />;
    }

    return (
      <div className="animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-red-800">
            <h3 className="text-gray-200 font-semibold mb-2">Current Weight</h3>
            <p className="text-2xl font-bold text-red-500">{userData.weight} lbs</p>
          </Card>

          <Card className="bg-gray-800 border-red-800">
            <h3 className="text-gray-200 font-semibold mb-2">BMI</h3>
            <p className="text-2xl font-bold text-red-500">{userData.bmi}</p>
          </Card>

          <Card className="bg-gray-800 border-red-800">
            <h3 className="text-gray-200 font-semibold mb-2">Workout Streak</h3>
            <p className="text-2xl font-bold text-red-500">{userData.streak} days</p>
          </Card>

          <Card className="bg-gray-800 border-red-800">
            <h3 className="text-gray-200 font-semibold mb-2">Calorie Goal</h3>
            <p className="text-2xl font-bold text-red-500">{userData.calorieGoal}</p>
          </Card>
        </div>

        <div className="flex items-center p-4 mb-8 bg-red-900/50 border border-red-800 rounded-lg text-white">
          <Activity className="w-4 h-4 mr-2" />
          You have 2 workouts left to hit your weekly goal!
        </div>

        <Card className="bg-gray-800 border-red-800 mb-8">
          <h3 className="text-gray-200 font-semibold mb-4">Weekly Workout Progress</h3>
          <div className="h-64 flex items-end justify-between">
            {workoutData.map((day, index) => (
              <div key={index} className="flex flex-col items-center w-1/7">
                <div 
                  className="w-8 bg-red-600 rounded-t"
                  style={{ height: `${day.value}%` }}
                ></div>
                <span className="mt-2 text-gray-400">{day.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-red-800 cursor-pointer hover:bg-gray-700 transform hover:scale-105 transition-all">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-200">Schedule Workout</p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-red-800 cursor-pointer hover:bg-gray-700 transform hover:scale-105 transition-all">
            <div className="text-center">
              <Book className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-200">Log Meal</p>
            </div>
          </Card>

          <Card className="bg-gray-800 border-red-800 cursor-pointer hover:bg-gray-700 transform hover:scale-105 transition-all">
            <div className="text-center">
              <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-200">Join Challenge</p>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed w-64 h-full bg-black border-r border-red-800">
        <div className="flex items-center justify-center h-16 border-b border-red-800">
          <h1 className="text-2xl font-bold text-red-600">UPLIFT</h1>
        </div>
        <nav className="mt-6">
          <div onClick={() => setActiveTab('overview')} 
               className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${activeTab === 'overview' ? 'bg-red-900 text-white' : 'text-gray-400 hover:bg-red-900/50'}`}>
            <Activity className="w-5 h-5 mr-3" />
            Overview
          </div>
          <div onClick={() => setActiveTab('workout')} 
               className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${activeTab === 'workout' ? 'bg-red-900 text-white' : 'text-gray-400 hover:bg-red-900/50'}`}>
            <Calendar className="w-5 h-5 mr-3" />
            Workouts
          </div>
          <div onClick={() => setActiveTab('nutrition')} 
               className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${activeTab === 'nutrition' ? 'bg-red-900 text-white' : 'text-gray-400 hover:bg-red-900/50'}`}>
            <Clipboard className="w-5 h-5 mr-3" />
            Nutrition
          </div>
          <div onClick={() => setActiveTab('community')} 
className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${activeTab === 'community' ? 'bg-red-900 text-white' : 'text-gray-400 hover:bg-red-900/50'}`}>
<Users className="w-5 h-5 mr-3" />
Community
</div>
<div onClick={() => setActiveTab('settings')} 
   className={`flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${activeTab === 'settings' ? 'bg-red-900 text-white' : 'text-gray-400 hover:bg-red-900/50'}`}>
<Settings className="w-5 h-5 mr-3" />
Settings
</div>
</nav>
</div>

{/* Main Content Area */}
<div className="ml-64 p-8">
{/* Header */}
<div className="flex justify-between items-center mb-8">
<div>
<h2 className="text-2xl font-bold text-white">Welcome to UPLIFT, {userData.name}!</h2>
<p className="text-gray-400">Transform yourself, one rep at a time.</p>
</div>
<div className="flex items-center space-x-4">
<div className="relative">
  <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500" />
  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
</div>
<div className="relative group">
  <User className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500" />
  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
    <a href="#profile" className="block px-4 py-2 text-gray-300 hover:bg-red-900/50">Profile</a>
    <a href="#settings" className="block px-4 py-2 text-gray-300 hover:bg-red-900/50">Settings</a>
    <a href="#logout" className="block px-4 py-2 text-gray-300 hover:bg-red-900/50">Logout</a>
  </div>
</div>
</div>
</div>

{/* Dynamic Content Based on Active Tab */}
<div className="transition-all duration-300 ease-in-out">
{renderMainContent()}
</div>
</div>

{/* Floating Action Button */}
<button className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center">
<PlusSquare className="w-6 h-6" />
</button>
</div>
);
};

// Add some custom animations
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
from { opacity: 0; transform: translateY(10px); }
to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
animation: fadeIn 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);

export default MemberDashboard;