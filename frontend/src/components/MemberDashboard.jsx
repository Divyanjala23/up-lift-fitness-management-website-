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
  Euro,
  Zap,
  BadgeDollarSign,
  BicepsFlexed,
  Trophy,
  Dumbbell,
  Apple,
  Target,
  Bell,
  Search,
  User,
  ChevronDown,
  TrendingUp,
  ChartSpline,
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
const Card = ({ children, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'border-red-500/20 bg-black',
    highlight: 'border-red-500/30 bg-black/90',
    subtle: 'border-gray-800 bg-gray-900/50'
  };
  
  return (
    <div className={`rounded-xl border ${variantClasses[variant]} p-6 shadow-md shadow-red-900/10 transition-all duration-200 hover:shadow-lg hover:shadow-red-900/15 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => (
  <div className="mb-5 border-b border-red-500/10 pb-3">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-bold text-white tracking-tight">
    {children}
  </h3>
);

const StatsCard = ({ icon: Icon, label, value, trend, color = 'red' }) => (
  <Card variant="highlight" className="overflow-hidden">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <h4 className="mt-2 text-2xl font-bold text-white">{value}</h4>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${color}-500/15`}>
        <Icon className={`h-6 w-6 text-${color}-400`} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className={trend >= 0 ? 'text-green-400' : 'text-red-400'}>
          {trend >= 0 ? '+' : ''}
          {trend}%
        </span>
        <TrendingUp className={`ml-1 h-3 w-3 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`} />
      </div>
    )}
  </Card>
);


const WorkoutSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get memberId from localStorage
    const memberId = localStorage.getItem('userId');
    
    if (!memberId) {
      setError('Member ID not found in localStorage');
      setLoading(false);
      return;
    }

    // Construct the endpoint with the memberId
    const endpoint = `http://localhost:8080/api/sessions/member/${memberId}`;

    // Fetch data from the backend API
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch schedule data');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setScheduleData(data); // Set the fetched data in the state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(err.message); // Set error message if something goes wrong
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array to fetch data once when the component mounts

  if (loading) {
    return <Card className="flex items-center justify-center py-10"><p>Loading schedule...</p></Card>;
  }

  if (error) {
    return <Card className="flex items-center justify-center py-10 border-orange-500/30"><p className="text-orange-400">{error}</p></Card>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {scheduleData.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No scheduled workouts for today</p>
        ) : (
          scheduleData.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-red-500/10 pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/15 ring-1 ring-red-500/20">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{session.type}</p>
                  <p className="text-sm text-gray-400">with {session.coachName}</p>
                  <p className="text-sm text-gray-400">{session.date}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-red-300">{session.time}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};


const NutritionTracker = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/nutrition/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(Error `${res.status}: Unable to fetch nutrition data.`);
        }
        return res.json();
      })
      .then((data) => {
        // ✅ Calculate total protein, carbs, and calories
        const totals = data.reduce(
          (acc, meal) => {
            meal.items.forEach((item) => {
              acc.protein += item.protein || 0;
              acc.carbs += item.carbs || 0;
              acc.calories += item.calories || 0;
            });
            return acc;
          },
          { protein: 0, carbs: 0, calories: 0 }
        );

        // ✅ Define daily goals (Adjust as needed)
        const goals = { protein: 150, carbs: 250, calories: 2200 };

        // ✅ Format data for display
        setNutritionData([
          { name: "Protein", value: totals.protein, goal: goals.protein },
          { name: "Carbs", value: totals.carbs, goal: goals.carbs },
          { name: "Calories", value: totals.calories, goal: goals.calories },
        ]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching nutrition data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const calculateProgress = (value, goal) => (goal > 0 ? (value / goal) * 100 : 0);

  return (
    <div className="space-y-4">
      {nutritionData.map((nutrient) => {
        const progress = calculateProgress(nutrient.value, nutrient.goal);

        return (
          <div key={nutrient.name} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between text-white mb-1">
              <span>{nutrient.name}</span>
              <span>
                {nutrient.value} / {nutrient.goal}
              </span>
            </div>

            {/* ✅ Custom Progress Bar */}
            <div className="flex items-center">
              <div className="w-full bg-gray-700 rounded-full h-3 mr-4">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm">{progress.toFixed(1)}%</span>
            </div>
          </div>
        );
      })}
    </div>
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
          throw new Error(Error `${res.status}: Unable to fetch workouts data.`);
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
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  }, [userId, token]);

  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/nutrition/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(Error `${res.status}: Unable to fetch nutrition data.`);
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

  // Group meals by date and mealType & calculate daily totals
  const groupedMeals = nutritionData.reduce((acc, meal) => {
    const date = new Date(meal.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) acc[date] = { mealsByType: {}, dailyTotals: { calories: 0, protein: 0, carbs: 0 } };
    if (!acc[date].mealsByType[meal.mealType]) acc[date].mealsByType[meal.mealType] = [];

    // Add meal data
    acc[date].mealsByType[meal.mealType].push(meal);

    // Update daily totals
    meal.items.forEach((item) => {
      acc[date].dailyTotals.calories += item.calories;
      acc[date].dailyTotals.protein += item.protein;
      acc[date].dailyTotals.carbs += item.carbs;
    });

    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Nutrition Log</CardTitle>
        </CardHeader>

        {Object.entries(groupedMeals).map(([date, { mealsByType, dailyTotals }]) => (
          <div key={date} className="mb-6">
            {/* ✅ Display Date */}
            <h3 className="text-xl text-white font-bold mb-3">{date}</h3>

            {Object.entries(mealsByType).map(([mealType, meals]) => (
              <div key={mealType} className="mb-4">
                {/* ✅ Display Meal Type (e.g., Breakfast, Lunch, Dinner) */}
                <h4 className="text-lg text-red-400 font-semibold">{mealType}</h4>

                {meals.map((meal) => (
                  <div key={meal.id} className="border-b border-red-500/10 pb-4 mb-4">
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
              </div>
            ))}

            {/* ✅ Daily Totals Section */}
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
          </div>
        ))}
      </Card>
    </div>
  );
};
;


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
          throw new Error(Error `${res.status}: Unable to fetch goals data.`);
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
        "Authorization":` Bearer ${token}`,
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
  <form className="mt-4 bg-gray-900 border-2 border-red-700 rounded-lg p-5 max-w-md shadow-lg" onSubmit={handleGoalSubmit}>
    <input
      type="text"
      name="name"
      value={newGoal.name}
      onChange={handleGoalChange}
      placeholder="Goal Name"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <input
      type="text"
      name="target"
      value={newGoal.target}
      onChange={handleGoalChange}
      placeholder="Target"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <input
      type="number"
      name="progress"
      value={newGoal.progress}
      onChange={handleGoalChange}
      placeholder="Current"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <select
      name="status"
      value={newGoal.status}
      onChange={handleGoalChange}
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
    >
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
    <button 
      type="submit" 
      className="w-full bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded font-bold uppercase tracking-wider transform transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-md"
    >
      Save Goal
    </button>
  </form>
)}

     {/* Edit Goal Form */}
{isEditFormVisible && editingGoal && (
  <form className="mt-4 bg-gray-900 border-2 border-red-700 rounded-lg p-5 max-w-md shadow-lg" onSubmit={handleGoalUpdate}>
    <input
      type="text"
      name="name"
      value={editingGoal.name}
      onChange={handleEditGoalChange}
      placeholder="Goal Name"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <input
      type="text"
      name="target"
      value={editingGoal.target}
      onChange={handleEditGoalChange}
      placeholder="Target"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <input
      type="number"
      name="progress"
      onChange={handleEditGoalChange}
      placeholder="Current"
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
      required
    />
    <select
      name="status"
      value={editingGoal.status}
      onChange={handleEditGoalChange}
      className="w-full px-4 py-3 mb-4 bg-gray-800 border border-gray-700 rounded text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
    >
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
    <button 
      type="submit" 
      className="w-full bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded font-bold uppercase tracking-wider transform transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 hover:shadow-md"
    >
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
  const navigate = useNavigate();
  
  // All state definitions must be at the top level and in the same order on every render
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New workout plan available', unread: true },
    { id: 2, message: 'You achieved a new milestone!', unread: true },
    { id: 3, message: 'Upcoming session in 2 hours', unread: false },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberProfile, setMemberProfile] = useState({});
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [membershipPlan, setMembershipPlan] = useState("");
  const [dailyTotals, setDailyTotals] = useState({ calories: 0, protein: 0, carbs: 0 });

  // Save user ID and token to local storage
  useEffect(() => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  }, [userId, token]);

  // Fetch nutrition data
  useEffect(() => {
    if (!userId || !token) return;

    fetch(`http://localhost:8080/api/nutrition/member/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(Error `${res.status}: Unable to fetch nutrition data.`);
        }
        return res.json();
      })
      .then((data) => {
        setNutritionData(data);
        setLoading(false);
        
        // Calculate daily totals from nutrition data
        const totals = { calories: 0, protein: 0, carbs: 0 };
        data.forEach((meal) => {
          meal.items?.forEach((item) => {
            totals.calories += item.calories || 0;
            totals.protein += item.protein || 0;
            totals.carbs += item.carbs || 0;
          });
        });
        setDailyTotals(totals);
      })
      .catch((err) => {
        console.error("Error fetching nutrition data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

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
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized access. Please check your login.");
        } else if (!res.ok) {
          throw new Error(Error `${res.status}: Unable to fetch data.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Member Data:", data);
        setMemberProfile(data);
        setMembershipPlan(data.plan || "No Plan");
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError(err.message);
      });
  }, [userId, token]);

  // Group meals by date and mealType & calculate daily totals - moved outside useEffect
  const groupedMeals = nutritionData.reduce((acc, meal) => {
    const date = new Date(meal.createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) acc[date] = { mealsByType: {}, dailyTotals: { calories: 0, protein: 0, carbs: 0 } };
    if (!acc[date].mealsByType[meal.mealType]) acc[date].mealsByType[meal.mealType] = [];

    // Add meal data
    acc[date].mealsByType[meal.mealType].push(meal);

    // Update daily totals
    meal.items?.forEach((item) => {
      acc[date].dailyTotals.calories += item.calories || 0;
      acc[date].dailyTotals.protein += item.protein || 0;
      acc[date].dailyTotals.carbs += item.carbs || 0;
    });

    return acc;
  }, {});

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
    // Clear user session/token
    localStorage.clear();
    setUserId(null);
    setToken(null);
    setMemberProfile(null); 
    console.log("Member Profile after logout:", memberProfile);
   
    // Redirect to the login page
    navigate("/signin");
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

  if (loading) {
    return <div className="text-gray-400">Loading nutrition data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-black transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">{memberProfile.username || "Guest"}!</h1>
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
<div className="md:pl-64 bg-gray-900 min-h-screen">
  {/* Dynamic Content Section */}
  <main className="p-6 lg:p-8">
    {activeSection === "Dashboard" && (
      <>
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">
            Welcome back, {memberProfile.fullName || memberProfile.username || "User"}!
          </h2>
          <p className="text-gray-400 mt-2">Track your fitness journey and progress</p>
        </div>

        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <StatsCard
              icon={BadgeDollarSign}
              label="Membership"
              value={membershipPlan}
              trend={8}
              color="red"
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <StatsCard
              icon={ChartSpline}
              label="Daily Calories Intake"
              value={`${dailyTotals.calories.toFixed(0)} cal`}
              trend={null}
              color="green"
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <StatsCard
              icon={BicepsFlexed}
              label={<span>Daily Protein<br />Intake</span>}
              value={dailyTotals.protein + " g"}
              trend={3}
              color="yellow"
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <StatsCard
              icon={Zap}
              label={<span>Daily Carbs<br />Intake</span>}
              value={dailyTotals.carbs + " g"}
              trend={10}
              color="green"
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>

          {/* Workout Schedule Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
            <WorkoutSchedule className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg" />
          </div>

          {/* Other Content Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
              {/* Additional Content */}
            </div>
          </div>
        </div>
      </>
    )}

    {activeSection === "Workouts" && (
      <>
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">Workout</h2>
          <p className="text-gray-400 mt-2">Monitor your progress and stay consistent with your training plan.</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <WorkoutsContent />
        </div>
      </>
    )}
    
    {activeSection === "Nutrition" && (
      <>
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">Nutrition</h2>
          <p className="text-gray-400 mt-2">Monitor your daily food intake</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <NutritionContent />
        </div>
      </>
    )}

    {activeSection === "Goals" && (
      <>
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">Fitness Goals</h2>
          <p className="text-gray-400 mt-2">Track and manage your fitness objectives</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <GoalsContent />
        </div>
      </>
    )}

    {activeSection === "Subscription" && (
      <>
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-white">Subscription</h2>
          <p className="text-gray-400 mt-2">Manage your membership plan</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <SubscriptionsSection />
        </div>
      </>
    )}
</main>
      </div>
    </div>
  );
};

export default MemberDashboard;
