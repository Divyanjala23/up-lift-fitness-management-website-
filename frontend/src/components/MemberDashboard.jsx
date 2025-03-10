import React, { useState, useEffect } from 'react';
import { format } from "date-fns"; 
import {
  Activity,
  Calendar,
  Clock,
  Heart,
  Trophy,
  Dumbbell,
  Apple,
  Target,
  Bell,
  Search,
  User,
  ChevronDown,
  TrendingUp,
  Menu,
  X,
  Settings,
  LogOut,
  Plus,
  CheckCircle,
  Edit,
  Trash,
  ArrowRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-red-500/20 bg-black p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-bold text-white">{children}</h3>
);

const StatsCard = ({ icon: Icon, label, value, trend, color = 'red' }) => (
  <Card>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <h4 className="mt-2 text-2xl font-bold text-white">{value}</h4>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${color}-500/10`}>
        <Icon className={`h-6 w-6 text-${color}-500`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 text-sm">
        <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
          {trend >= 0 ? '+' : ''}
          {trend}%
        </span>
        <span className="ml-1 text-gray-400">vs last week</span>
      </div>
    )}
  </Card>
);

const WorkoutSchedule = () => {
  const scheduleData = [
    { time: '09:00 AM', workout: 'Strength Training', trainer: 'John Doe' },
    { time: '02:00 PM', workout: 'Cardio Session', trainer: 'Jane Smith' },
    { time: '05:00 PM', workout: 'Yoga Class', trainer: 'Mike Johnson' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {scheduleData.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-red-500/10 pb-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <Clock className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium text-white">{session.workout}</p>
                <p className="text-sm text-gray-400">with {session.trainer}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{session.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ProgressChart = () => {
  const progressData = [
    { name: 'Week 1', weight: 180, strength: 100, cardio: 70 },
    { name: 'Week 2', weight: 178, strength: 110, cardio: 75 },
    { name: 'Week 3', weight: 176, strength: 115, cardio: 80 },
    { name: 'Week 4', weight: 174, strength: 120, cardio: 85 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
      </CardHeader>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
            <Line type="monotone" dataKey="weight" stroke="#ef4444" />
            <Line type="monotone" dataKey="strength" stroke="#22c55e" />
            <Line type="monotone" dataKey="cardio" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const NutritionTracker = () => {
  const nutritionData = [
    { name: 'Proteins', value: 120, goal: 150 },
    { name: 'Carbs', value: 200, goal: 250 },
    { name: 'Fats', value: 50, goal: 65 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Tracker</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {nutritionData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{item.name}</span>
              <span className="text-white">
                {item.value}/{item.goal}g
              </span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-gray-700">
              <div
                className="h-2 rounded-full bg-red-500"
                style={{ width: `${(item.value / item.goal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token"); // Retrieve the JWT token

const WorkoutsContent = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch workouts data from the backend
  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/workouts/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the JWT token in the headers
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Unable to fetch workouts data.`);
        }
        return res.json();
      })
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) {
    return <div className="text-gray-400">Loading workouts...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout._id} className="border-b border-red-500/10 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-semibold">{workout.name}</h4>
                <span className="text-gray-400">
                  {format(new Date(workout.date), "MM/dd/yyyy HH:mm")} {/* Format the date */}
                </span>
              </div>
              <div className="mt-2 space-y-2">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex justify-between text-gray-400">
                    <span>{exercise.name}</span>
                    <span>
                      {exercise.sets} sets x {exercise.reps} reps
                      {exercise.weight ? ` @ ${exercise.weight} lbs` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No workouts found.</p>
        )}
      </Card>
    </div>
  );
};

const NutritionContent = () => {
  const [mealLog, setMealLog] = useState([
    {
      id: 1,
      name: 'Breakfast',
      items: [
        { food: 'Oatmeal', calories: 300, protein: 15, carbs: 50 },
        { food: 'Protein Shake', calories: 150, protein: 25, carbs: 10 },
      ],
    },
    {
      id: 2,
      name: 'Lunch',
      items: [
        { food: 'Grilled Chicken', calories: 250, protein: 35, carbs: 0 },
        { food: 'Brown Rice', calories: 200, protein: 5, carbs: 45 },
      ],
    },
  ]);

  const dailyTotals = mealLog.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0 },
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Nutrition Log</CardTitle>
        </CardHeader>
        {mealLog.map((meal) => (
          <div key={meal.id} className="border-b border-red-500/10 pb-4 mb-4">
            <h4 className="text-white font-semibold mb-2">{meal.name}</h4>
            {meal.items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-400">
                <span>{item.food}</span>
                <span>
                  {item.calories} cal | {item.protein}g P | {item.carbs}g C
                </span>
              </div>
            ))}
          </div>
        ))}
        <div className="mt-4 bg-red-500/10 p-4 rounded-lg">
          <h4 className="text-white font-semibold">Daily Totals</h4>
          <div className="flex justify-between text-gray-400">
            <span>Calories</span>
            <span>{dailyTotals.calories} cal</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Protein</span>
            <span>{dailyTotals.protein}g</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Carbs</span>
            <span>{dailyTotals.carbs}g</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const GoalsContent = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Lose Weight', target: '10 lbs', progress: 4, status: 'In Progress' },
    { id: 2, name: 'Build Muscle', target: '5 lbs muscle mass', progress: 2, status: 'In Progress' },
    { id: 3, name: 'Run 5K', target: '30 min', progress: 25, status: 'Completed' },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Fitness Goals</CardTitle>
        </CardHeader>
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`border-b border-red-500/10 pb-4 mb-4 ${
              goal.status === 'Completed' ? 'opacity-50' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-white font-semibold">{goal.name}</h4>
              <span
                className={`text-sm ${
                  goal.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                {goal.status}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-700 rounded-full h-2.5 mr-4">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: `${goal.progress * 10}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm">
                {goal.progress * 10}% of {goal.target}
              </span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const ProgressContent = () => {
  const progressData = [
    { name: 'Weight', current: 180, goal: 165, unit: 'lbs' },
    { name: 'Body Fat', current: 22, goal: 18, unit: '%' },
    { name: 'Strength', current: 100, goal: 150, unit: 'lbs max lift' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detailed Progress Tracking</CardTitle>
        </CardHeader>
        {progressData.map((metric, index) => (
          <div key={index} className="border-b border-red-500/10 pb-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-white font-semibold">{metric.name}</h4>
              <span className="text-gray-400">
                {metric.current} {metric.unit}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{
                  width: `${
                    ((metric.current - (metric.goal < metric.current ? metric.goal : 0)) /
                      (metric.current > metric.goal ? metric.current : metric.goal)) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>Current: {metric.current} {metric.unit}</span>
              <span>Goal: {metric.goal} {metric.unit}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const MemberDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New workout plan available', unread: true },
    { id: 2, message: 'You achieved a new milestone!', unread: true },
    { id: 3, message: 'Upcoming session in 2 hours', unread: false },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [memberProfile, setMemberProfile] = useState({});
  const [error, setError] = useState(null);

  // Fetch member profile
  useEffect(() => {
    if (!userId || !token) {
      setError("User not logged in. Please log in.");
      return;
    }

    fetch(`http://localhost:8080/api/members/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the JWT token in the headers
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized access. Please check your login.");
        } else if (!res.ok) {
          throw new Error(`Error ${res.status}: Unable to fetch data.`);
        }
        return res.json();
      })
      
      .then((data) => {
        console.log("API Response:", data); // Log the API response
        setMemberProfile(data); // Set the member profile state
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError(err.message);
      });
  }, [userId, token]);

  const navigationItems = [
    { label: 'Dashboard', icon: Activity, content: 'Dashboard Content' },
    { label: 'Workouts', icon: Dumbbell, content: 'Workouts Content' },
    { label: 'Nutrition', icon: Apple, content: 'Nutrition Content' },
    { label: 'Goals', icon: Target, content: 'Goals Content' },
    { label: 'Progress', icon: TrendingUp, content: 'Progress Content' },
  ];

  const handleNavClick = (label) => {
    setActiveSection(label);
    setIsMobileMenuOpen(false);
  };

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif,
      ),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    setIsNotificationsOpen(false);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-black transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">{memberProfile.username}</h1>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <nav className="mt-8">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={`
                flex w-full items-center gap-4 px-6 py-3 
                text-gray-400 transition-all duration-300 ease-in-out 
                hover:bg-red-500/10 hover:text-white 
                hover:pl-8 group
                ${activeSection === item.label ? 'bg-red-500/10 text-white' : ''}
              `}
              onClick={() => handleNavClick(item.label)}
            >
              <item.icon
                className={`
                  h-5 w-5 transition-transform duration-300 
                  group-hover:scale-110 
                  ${activeSection === item.label ? 'text-red-500' : ''}
                `}
              />
              {item.label}
              <ArrowRight
                className={`
                  ml-auto h-4 w-4 opacity-0 transition-all duration-300 
                  group-hover:opacity-100 group-hover:translate-x-1
                `}
              />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="border-b border-red-500/20 bg-black">
          <div className="flex items-center justify-between p-4">
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-red-500/20 bg-gray-800 py-2 pl-10 pr-4 text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="relative rounded-lg p-2 hover:bg-red-500/20"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <Bell className="h-5 w-5 text-red-500" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg bg-black border border-red-500/20 shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-red-500/20">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button
                        onClick={clearNotifications}
                        className="text-sm text-red-500 hover:text-red-400"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-gray-400 text-center">No notifications</p>
                      ) : (
                        notifications.map((notif) => (
                          <button
                            key={notif.id}
                            className={`w-full p-4 text-left hover:bg-red-500/10 border-b border-red-500/20
                              ${notif.unread ? 'bg-red-500/5' : ''}`}
                            onClick={() => handleNotificationClick(notif.id)}
                          >
                            <p className="text-sm text-white">{notif.message}</p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
                    <span className="font-bold text-white">M</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-black border border-red-500/20 shadow-lg">
                    <div className="p-2">
                      <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-400 hover:bg-red-500/10 hover:text-white">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-400 hover:bg-red-500/10 hover:text-white">
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Section */}
        <main className="p-6">
          {activeSection === 'Dashboard' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Welcome back, {memberProfile.fullName}!</h2>
                <p className="text-gray-400">Track your fitness journey and progress</p>
              </div>

              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <StatsCard
                    icon={Heart}
                    label="Calories Burned"
                    value="847 kcal"
                    trend={12}
                  />
                  <StatsCard
                    icon={Clock}
                    label="Workout Time"
                    value="1.5 hrs"
                    trend={5}
                    color="blue"
                  />
                  <StatsCard
                    icon={Trophy}
                    label="Achievements"
                    value="8"
                    trend={0}
                    color="yellow"
                  />
                  <StatsCard
                    icon={Calendar}
                    label="Streak"
                    value="12 days"
                    trend={20}
                    color="green"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ProgressChart />
                  <WorkoutSchedule />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <NutritionTracker />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'Workouts' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Workouts</h2>
                <p className="text-gray-400">Track and review your workout history</p>
              </div>
              <WorkoutsContent />
            </>
          )}

          {activeSection === 'Nutrition' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Nutrition</h2>
                <p className="text-gray-400">Monitor your daily food intake</p>
              </div>
              <NutritionContent />
            </>
          )}

          {activeSection === 'Goals' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Fitness Goals</h2>
                <p className="text-gray-400">Track and manage your fitness objectives</p>
              </div>
              <GoalsContent />
            </>
          )}

          {activeSection === 'Progress' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Progress Tracking</h2>
                <p className="text-gray-400">Monitor your fitness journey metrics</p>
              </div>
              <ProgressContent />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;