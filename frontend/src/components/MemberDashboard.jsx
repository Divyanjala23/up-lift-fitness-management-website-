import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { format } from "date-fns";
import { motion } from "framer-motion";
import PaymentGateway from './PaymentGateway';
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
  Home,
  DollarSign, // Import Home icon
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


const WorkoutsContent = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
const [token, setToken] = useState(localStorage.getItem("token"));

useEffect(() => {
  // Optionally, you can sync the localStorage and state if they change dynamically
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
}, [userId, token]); // Retrieve the JWT token


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
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
const [token, setToken] = useState(localStorage.getItem("token"));

useEffect(() => {
  // Optionally, you can sync the localStorage and state if they change dynamically
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
}, [userId, token]); // Retrieve the JWT token


  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/nutrition/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Unable to fetch nutrition data.`);
        }
        return res.json();
      })
      .then((data) => {
        setNutritionData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching nutrition data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) {
    return <div className="text-gray-400">Loading nutrition data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const dailyTotals = nutritionData.reduce(
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
        {nutritionData.map((meal) => (
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
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  // New goal state and form visibility toggle
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    progress: 0,
    status: "In Progress", // Default status
  });
  const [isFormVisible, setFormVisible] = useState(false);

  // Editing goal state and form visibility toggle
  const [editingGoal, setEditingGoal] = useState(null);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/goals/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Unable to fetch goals data.`);
        }
        return res.json();
      })
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching goals data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();

    const goalData = { ...newGoal, memberId: userId, coachId: "defaultCoachId" };

    fetch("http://localhost:8080/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(goalData),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prevGoals) => [...prevGoals, data]);
        setNewGoal({ name: "", target: "", progress: 0, status: "In Progress" });
        setFormVisible(false); // Hide form after submitting
      })
      .catch((err) => {
        console.error("Error creating goal:", err);
        setError("Error creating goal.");
      });
  };

  const handleGoalDelete = (goalId) => {
    fetch(`http://localhost:8080/api/goals/${goalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(() => {
        setGoals(goals.filter((goal) => goal.id !== goalId));
      })
      .catch((err) => {
        console.error("Error deleting goal:", err);
        setError("Error deleting goal.");
      });
  };

  // Set up the goal for editing
  const handleGoalEdit = (goal) => {
    setEditingGoal(goal);
    setEditFormVisible(true);
  };

  const handleEditGoalChange = (e) => {
    const { name, value } = e.target;
    setEditingGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleGoalUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/goals/${editingGoal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(editingGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedGoals = goals.map((goal) =>
          goal.id === data.id ? data : goal
        );
        setGoals(updatedGoals);
        setEditingGoal(null);
        setEditFormVisible(false); // Hide edit form after updating
      })
      .catch((err) => {
        console.error("Error updating goal:", err);
        setError("Error updating goal.");
      });
  };

  if (loading) {
    return <div className="text-gray-400">Loading goals...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    if (target === 0) return 0
    if (current<target)   return Math.min((current / target) * 100, 100); 
    else return Math.min((target / current) * 100, 100);
   // Ensure the progress doesn't exceed 100%
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Fitness Goals</CardTitle>
        </CardHeader>

        {/* New Goal Form Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Cancel" : "Add New Goal"}
        </button>

        {/* New Goal Form */}
        {isFormVisible && (
          <form className="mt-4" onSubmit={handleGoalSubmit}>
            <input
              type="text"
              name="name"
              value={newGoal.name}
              onChange={handleGoalChange}
              placeholder="Goal Name"
              className="input"
              required
            />
            <input
              type="text"
              name="target"
              value={newGoal.target}
              onChange={handleGoalChange}
              placeholder="Target"
              className="input"
              required
            />
            <input
              type="number"
              name="progress"
              value={newGoal.progress}
              onChange={handleGoalChange}
              placeholder="Current"
              className="input"
              required
            />
            <select
              name="status"
              value={newGoal.status}
              onChange={handleGoalChange}
              className="input"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Save Goal
            </button>
          </form>
        )}

        {/* Edit Goal Form */}
        {isEditFormVisible && editingGoal && (
          <form className="mt-4" onSubmit={handleGoalUpdate}>
            <input
              type="text"
              name="name"
              value={editingGoal.name}
              onChange={handleEditGoalChange}
              placeholder="Goal Name"
              className="input"
              required
            />
            <input
              type="text"
              name="target"
              value={editingGoal.target}
              onChange={handleEditGoalChange}
              placeholder="Target"
              className="input"
              required
            />
            <input
              type="number"
              name="progress"
              value={editingGoal.progress}
              onChange={handleEditGoalChange}
              placeholder="Current"
              className="input"
              required
            />
            <select
              name="status"
              value={editingGoal.status}
              onChange={handleEditGoalChange}
              className="input"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Update Goal
            </button>
          </form>
        )}

        {/* Display Goals */}
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`border-b border-red-500/10 pb-4 mb-4 ${goal.status === "Completed" ? "opacity-50" : ""}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-white font-semibold">{goal.name}</h4>
              <span
                className={`text-sm ${
                  goal.status === "Completed" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {goal.status}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-700 rounded-full h-2.5 mr-4">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress(goal.progress, goal.target)}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm">
                {calculateProgress(goal.progress, goal.target).toFixed(1)}% of {goal.target}
              </span>
            </div>

            {/* Edit and Delete Goal Buttons */}
            <button
              onClick={() => handleGoalEdit(goal)}
              className="text-blue-500 mt-2 mr-4"
            >
              Edit Goal
            </button>
            <button
              onClick={() => handleGoalDelete(goal.id)}
              className="text-red-500 mt-2"
            >
              Delete Goal
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
};


const SubscriptionsSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);


  useEffect(() => {
    fetch("http://localhost:8080/api/plans")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <div className="member-dashboard">
      {/* Pricing Section */}
      <div className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
        >
          MEMBERSHIP PLANS
        </motion.h2>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {loading ? (
            <p className="text-white text-center">Loading plans...</p>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-lg backdrop-blur-lg flex flex-col h-full text-white ${
                  plan.popular
                    ? "bg-red-600/20 border-2 border-red-500"
                    : "bg-gray-900/60 border border-red-500/20"
                }`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                  >
                    MOST POPULAR
                  </motion.span>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-extrabold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                    {plan.name}
                  </h3>
                  <div className="mb-6 text-4xl font-extrabold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                    <span>$</span>
                    <span>{plan.price}</span>
                    <span className="text-gray-400 text-lg ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Dumbbell size={20} className="text-red-500" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 mt-auto rounded-lg font-semibold text-white ${
                    plan.popular ? "bg-red-500" : "bg-gray-800 hover:bg-red-500"
                  }`}
                >
                  SELECT PLAN
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <PaymentGateway plan={selectedPlan} onClose={handleClosePayment} />
      )}
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
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
const [token, setToken] = useState(localStorage.getItem("token"));

useEffect(() => {
  // Optionally, you can sync the localStorage and state if they change dynamically
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
}, [userId, token]); // Retrieve the JWT token

  const navigate = useNavigate(); // Use navigate for redirection

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
        console.log("Fetched Member Data:", data);
        setMemberProfile(data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError(err.message);
      });
  }, [userId, token]);

  const navigationItems = [
    { label: 'Home', icon: Home, content: 'Home' }, 
    { label: 'Dashboard', icon: Activity, content: 'Dashboard Content' },
    { label: 'Workouts', icon: Dumbbell, content: 'Workouts Content' },
    { label: 'Nutrition', icon: Apple, content: 'Nutrition Content' },
    { label: 'Goals', icon: Target, content: 'Goals Content' },
    { label: 'Subscription', icon: DollarSign, content: 'Subscription' },
    { label: 'Logout', icon: LogOut, content: 'Logout' }, 
  ];

  const handleNavClick = (label) => {
    if (label === 'Home') {
      navigate('/'); // Redirect to the home page
    } else if (label === 'Logout') {
      handleLogout(); // Call the logout function
    } else {
      setActiveSection(label); // Set the active section
    }
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  const handleLogout = () => {
    // Clear user session/token (example: remove from localStorage)
    localStorage.clear();
    setUserId(null);
    setToken(null);
    setMemberProfile(null); 
    console.log("Member Profile after logout:", memberProfile);
   
    // Redirect to the login page
    navigate("/signin"); // Replace "/signin" with your login route
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
          <h1 className="text-xl font-bold text-white"> {memberProfile.username || "Guest"}!</h1>
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
          {activeSection === "Dashboard" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Welcome back, {memberProfile.fullName}!
                </h2>
                <p className="text-gray-400">Track your fitness journey and progress</p>
              </div>

              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                  <StatsCard
                    icon={Heart}
                    label="Calories Burned"
                    value="1,230 kcal"
                    trend={8}
                    color="red"
                  />
                  <StatsCard
                    icon={Clock}
                    label="Workout Time"
                    value="2.1 hrs"
                    trend={6}
                    color="blue"
                  />
                  <StatsCard
                    icon={Trophy}
                    label="Achievements"
                    value="12"
                    trend={3}
                    color="yellow"
                  />
                  <StatsCard
                    icon={Calendar}
                    label="Streak"
                    value="18 days"
                    trend={10}
                    color="green"
                  />
                  <StatsCard
                    icon={Activity}
                    label="Steps Taken"
                    value="12,540 steps"
                    trend={15}
                    color="purple"
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

          {activeSection === "Workouts" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Workouts</h2>
                <p className="text-gray-400">Track and review your workout history</p>
              </div>
              <WorkoutsContent />
            </>
          )}

          {activeSection === "Nutrition" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Nutrition</h2>
                <p className="text-gray-400">Monitor your daily food intake</p>
              </div>
              <NutritionContent />
            </>
          )}

          {activeSection === "Goals" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Fitness Goals</h2>
                <p className="text-gray-400">Track and manage your fitness objectives</p>
              </div>
              <GoalsContent />
            </>
          )}

          {activeSection === "Subscription" && (
            <>
              <div className="mb-8">
               
              </div>
              <SubscriptionsSection />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;