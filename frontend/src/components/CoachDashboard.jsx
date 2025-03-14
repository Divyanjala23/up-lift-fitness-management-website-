import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Users,
  Calendar,
  Edit,
  Trash2,
  BarChart2,
  MessageSquare,
  Target,
  TrendingUp,
  Activity,
  Menu,
  X,
  Dumbbell,
  Utensils,
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  UserPlus,
  BookOpen,
  PlusCircle,
  XCircle,
  Archive,
  CheckCircle,
  Plus,
} from 'lucide-react';

// Reuse the Card components from Member Dashboard
const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border border-red-500/20 bg-black p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-xl font-bold text-white">{children}</h3>
);

const ClientOverviewCard = ({ client }) => (
  <Card className="hover:bg-red-500/5 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
          <span className="text-white font-bold">{client.age}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{client.fullName}</h4>
          <p className="text-sm text-gray-400">{client.gender}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-400">Progress</p>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${client.progress}%` }}
            />
          </div>
          <span className="text-sm text-white">{client.progress}%</span>
        </div>
      </div>
    </div>
  </Card>
);

const ProgramsContent = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: 'Beginner Strength Training',
      description: 'A 12-week program focused on building foundational strength.',
      duration: '12 weeks',
      clients: ['Alex Johnson', 'Sarah Miller'],
      status: 'Active',
    },
    {
      id: 2,
      name: 'Advanced Cardio Conditioning',
      description: 'High-intensity cardio program for advanced athletes.',
      duration: '8 weeks',
      clients: ['Michael Chen'],
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Yoga for Flexibility',
      description: 'Improve flexibility and mobility with this 6-week yoga program.',
      duration: '6 weeks',
      clients: [],
      status: 'Draft',
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Training Programs</CardTitle>
            <button className="text-red-500 hover:text-red-400 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Program
            </button>
          </div>
        </CardHeader>
        <div className="space-y-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`border-b border-red-500/10 pb-4 mb-4 ${
                program.status === 'Completed' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-semibold">{program.name}</h4>
                  <p className="text-gray-400 text-sm mt-1">{program.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                    <span>{program.duration}</span>
                    <span>•</span>
                    <span>{program.clients.length} clients</span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`
                      text-sm px-2 py-1 rounded-full 
                      ${
                        program.status === 'Active'
                          ? 'bg-green-500/10 text-green-500'
                          : program.status === 'Completed'
                          ? 'bg-gray-500/10 text-gray-500'
                          : 'bg-red-500/10 text-red-500'
                      }
                    `}
                  >
                    {program.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
const ClientListOnlyContent = () => {
  const [members, setMembers] = useState([]); // List of members assigned to the coach
  const [selectedMember, setSelectedMember] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [workoutData, setWorkoutData] = useState({ name: "", date: "", exercises: [] });
  const [mealData, setMealData] = useState({ mealPlan: "" , items:[]});
  const coachId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/members/coach/${coachId}`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleOpenWorkoutModal = (member) => {
    setSelectedMember(member);
    setShowWorkoutModal(true);
  };

  const handleOpenMealModal = (member) => {
    setSelectedMember(member);
    setShowMealModal(true);
  };

  
  return (
    <div className="space-y-6">
      {/* Members List with Workout & Meal Buttons */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-white text-lg font-semibold mb-4">Assigned Members</h2>
        {members.map((member) => (
          <div key={member.memberId} className="text-white p-4 border-b border-gray-700 flex justify-between items-center">
            <span>{member.fullName}</span>
            <div className="space-x-2">
              
            </div>
          </div>
        ))}
      </div>

     
      
    
  </div>
)};



    

const ClientListContent = () => {
  const [members, setMembers] = useState([]); // List of members assigned to the coach
  const [selectedMember, setSelectedMember] = useState(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [workoutData, setWorkoutData] = useState({ name: "", date: "", exercises: [] });
  const [mealData, setMealData] = useState({ mealPlan: "" , items:[]});
  const coachId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/members/coach/${coachId}`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleOpenWorkoutModal = (member) => {
    setSelectedMember(member);
    setShowWorkoutModal(true);
  };

  const handleOpenMealModal = (member) => {
    setSelectedMember(member);
    setShowMealModal(true);
  };

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    
    const newWorkout = {
      ...workoutData,
      memberId: selectedMember.memberId, // Assign the correct member
      coachId: localStorage.getItem("userId"), // Get coachId from logged-in user
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/workouts/coach/${coachId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWorkout),
      });
  
      if (!response.ok) throw new Error("Failed to assign workout");
  
      setShowWorkoutModal(false);
      setWorkoutData({ name: "", date: "", exercises: [] });
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleMealSubmit = async (e) => {
    e.preventDefault();

    
    const newMealPlan = {
      ...mealData,
      memberId: selectedMember.memberId, // Assign the correct member
      coachId: localStorage.getItem("userId"), // Get coachId from logged-in user
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/nutrition/coach/${coachId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMealPlan),
      });
  
      if (!response.ok) throw new Error("Failed to assign meal plan");
  
      setShowMealModal(false);
      setMealData({ mealType: "", items: [] });
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Members List with Workout & Meal Buttons */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-white text-lg font-semibold mb-4">Assigned Members</h2>
        {members.map((member) => (
          <div key={member.memberId} className="text-white p-4 border-b border-gray-700 flex justify-between items-center">
            <span>{member.fullName}</span>
            <div className="space-x-2">
              <button onClick={() => handleOpenWorkoutModal(member)} className="bg-red-500 hover:bg-red-600 p-2 rounded">
                <Dumbbell className="h-5 w-5 text-white" />
              </button>
              <button onClick={() => handleOpenMealModal(member)} className="bg-blue-500 hover:bg-blue-600 p-2 rounded">
                <Utensils className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workout Modal */}
      {showWorkoutModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-900 p-6 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg">Assign Workout for {selectedMember.fullName}</h2>
        <button onClick={() => setShowWorkoutModal(false)}>
          <X className="text-white" />
        </button>
      </div>

      <form onSubmit={handleWorkoutSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          value={workoutData.name}
          onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        <input
          type="date"
          name="date"
          value={workoutData.date}
          onChange={(e) => setWorkoutData({ ...workoutData, date: e.target.value })}
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        {/* Exercise Inputs */}
        <h3 className="text-white text-sm">Exercises:</h3>
        {workoutData.exercises.map((exercise, index) => (
          <div key={index} className="space-y-2 bg-gray-800 p-3 rounded">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise.name}
              onChange={(e) => {
                const updatedExercises = [...workoutData.exercises];
                updatedExercises[index].name = e.target.value;
                setWorkoutData({ ...workoutData, exercises: updatedExercises });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Sets"
              
              onChange={(e) => {
                const updatedExercises = [...workoutData.exercises];
                updatedExercises[index].sets = Number(e.target.value);
                setWorkoutData({ ...workoutData, exercises: updatedExercises });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Reps"
            
              onChange={(e) => {
                const updatedExercises = [...workoutData.exercises];
                updatedExercises[index].reps = Number(e.target.value);
                setWorkoutData({ ...workoutData, exercises: updatedExercises });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              
              onChange={(e) => {
                const updatedExercises = [...workoutData.exercises];
                updatedExercises[index].weight = Number(e.target.value);
                setWorkoutData({ ...workoutData, exercises: updatedExercises });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <button
              type="button"
              onClick={() => {
                const updatedExercises = workoutData.exercises.filter((_, i) => i !== index);
                setWorkoutData({ ...workoutData, exercises: updatedExercises });
              }}
              className="text-red-400 text-sm"
            >
              Remove Exercise
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setWorkoutData({ ...workoutData, exercises: [...workoutData.exercises, { name: "", sets: 0, reps: 0, weight: 0 }] })}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Exercise
        </button>

        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Assign Workout
        </button>
      </form>
    </div>
  </div>
)}

{showMealModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-900 p-6 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg">Assign Meal Plan for {selectedMember.fullName}</h2>
        <button onClick={() => setShowMealModal(false)}>
          <X className="text-white" />
        </button>
      </div>

      <form onSubmit={handleMealSubmit} className="mt-4 space-y-4">
        {/* Meal Type */}
        <input
          type="text"
          name="mealType"
          placeholder="Meal Type (e.g., Breakfast, Lunch, Dinner)"
          value={mealData.mealType}
          onChange={(e) => setMealData({ ...mealData, mealType: e.target.value })}
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />

        {/* Meal Items */}
        <h3 className="text-white text-sm">Meal Items:</h3>
        {mealData.items.map((item, index) => (
          <div key={index} className="space-y-2 bg-gray-800 p-3 rounded">
            <input
              type="text"
              placeholder="Food Name"
              
              onChange={(e) => {
                const updatedItems = [...mealData.items];
                updatedItems[index].food = e.target.value;
                setMealData({ ...mealData, items: updatedItems });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Calories"
              
              onChange={(e) => {
                const updatedItems = [...mealData.items];
                updatedItems[index].calories = Number(e.target.value);
                setMealData({ ...mealData, items: updatedItems });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              
              onChange={(e) => {
                const updatedItems = [...mealData.items];
                updatedItems[index].protein = Number(e.target.value);
                setMealData({ ...mealData, items: updatedItems });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              
              onChange={(e) => {
                const updatedItems = [...mealData.items];
                updatedItems[index].carbs = Number(e.target.value);
                setMealData({ ...mealData, items: updatedItems });
              }}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <button
              type="button"
              onClick={() => {
                const updatedItems = mealData.items.filter((_, i) => i !== index);
                setMealData({ ...mealData, items: updatedItems });
              }}
              className="text-red-400 text-sm"
            >
              Remove Item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setMealData({
              ...mealData,
              items: [...mealData.items, { food: "", calories: 0, protein: 0, carbs: 0 }],
            })
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Meal Item
        </button>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Assign Meal Plan
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
};



const SessionScheduleContent = () => {
  const [sessions, setSessions] = useState([]);
  const [members, setMembers] = useState([]); // Store assigned members
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "",
    type: "",
    date: "",
    time: "",
  });
  const [editSessionId, setEditSessionId] = useState(null);
  const coachId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSessions();
    fetchAssignedMembers();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/coach/${coachId}`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const fetchAssignedMembers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/members/coach/${coachId}`);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching assigned members:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Find the fullName of the selected member
    const selectedMember = members.find(
      (member) => member.memberId === formData.memberId
    );
    const userId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:8080/api/coaches/${userId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch coach data");
    }

    const coachData = await response.json();
    const coachName = coachData.fullName;
  
    // Ensure selectedMember exists before proceeding
    if (!selectedMember) {
      console.error("Selected member is not valid.");
      return;
    }
  
    const sessionData = {
      memberId: formData.memberId,
      coachId: localStorage.getItem("userId"),
      coachName:coachName,
      fullName: selectedMember.fullName,  // Add fullName to the session data
      type: formData.type,
      date: formData.date,
      time: formData.time,
    };
  
    // Send data to backend (create or update session)
    try {
      const response = await fetch(editSessionId ? `http://localhost:8080/api/sessions/${editSessionId}` : "http://localhost:8080/api/sessions", {
        method: editSessionId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });
  
      if (response.ok) {
        // Handle success (e.g., show notification or redirect)
        const session = await response.json();
        console.log("Session saved:", session);
      } else {
        console.error("Failed to submit session data");
      }
    } catch (error) {
      console.error("Error submitting session:", error);
    }
  };

  const handleEdit = (session) => {
    setFormData({
      memberId: session.memberId,
      type: session.type,
      date: session.date,
      time: session.time,
    });
    setEditSessionId(session.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      await fetch(`http://localhost:8080/api/sessions/${id}`, { method: "DELETE" });
      fetchSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Session Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add New Session
        </button>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">
              {editSessionId ? "Edit Session" : "New Session"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-red-400 hover:text-red-300">
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 block mb-1">Select Member</label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-- Select Member --</option>
                {members.map((member) => (
                  <option key={member.memberId} value={member.memberId}>
                    {member.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Session Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-full rounded"
            >
              {editSessionId ? "Update Session" : "Add Session"}
            </button>
          </form>
        </div>
      )}
      

      {/* Session List */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-white text-lg font-semibold mb-4">Session Schedule</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-400">No sessions found.</p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="border-b border-gray-700 p-4 mb-2 flex justify-between items-center"
            >
              <div>
                <h4 className="text-white font-semibold">
                {session.fullName || "Unknown Member"}
                </h4>
                <p className="text-gray-400 text-sm">{session.type}</p>
                <p className="text-gray-400">{session.date} - {session.time}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(session)} className="text-blue-400 hover:text-blue-300">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(session.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SessionListOnly = () => {
  const [sessions, setSessions] = useState([]);
  const coachId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/sessions/coach/${coachId}`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-white text-lg font-semibold mb-4">Session Schedule</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-400">No sessions found.</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session.id}
            className={`border-b border-gray-700 p-4 mb-2 flex justify-between items-center ${
              session.status === "Completed" ? "opacity-60" : ""
            }`}
          >
            <div>
              <h4 className="text-white font-semibold">{session.fullName}</h4>
              <p className="text-gray-400 text-sm">{session.type}</p>
              <p className="text-gray-400">{session.date} - {session.time}</p>
            </div>
            <div className="flex gap-3">
             
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const PerformanceTrackerContent = () => {
  const performanceMetrics = [
    {
      label: 'Total Clients',
      value: 0,
      icon: Users,
      
    },
    {
      label: 'Sessions This Month',
      value: 0,
      icon: Calendar,
      
    },
    {
      label: 'Client Retention',
      value: '0%',
      icon: CheckCircle,
    
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {performanceMetrics.map((metric, index) => (
        <Card key={index}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{metric.label}</p>
              <h4 className="mt-2 text-2xl font-bold text-white">{metric.value}</h4>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
              <metric.icon className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500">+{metric.trend}%</span>
            <span className="ml-1 text-gray-400">vs last month</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

const TodoListContent = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Plan workout for Alex', completed: false },
    { id: 2, text: 'Review Sarah\'s progress', completed: true },
    { id: 3, text: 'Schedule group session', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>To-Do List</CardTitle>
          <button
            className="text-red-500 hover:text-red-400 flex items-center gap-2"
            onClick={addTask}
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        </div>
      </CardHeader>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-full rounded-lg border border-red-500/20 bg-gray-800 py-2 px-4 text-white focus:border-red-500 focus:outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-2 rounded-lg ${
              task.completed ? 'bg-gray-800/50' : 'bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
              />
              <span
                className={`text-white ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CoachDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
const [coachName, setCoachName] = useState("Coach Portal");

  const navigationItems = [
    { label: 'Dashboard', icon: Activity, content: 'Dashboard Overview' },
    { label: 'Clients', icon: Users, content: 'Client Management' },
    { label: 'Sessions', icon: Calendar, content: 'Session Schedule' },
    
    { label: 'Logout', icon: LogOut, content: 'Logout' }, 

  ];
const navigate = useNavigate();
  const handleNavClick = (label) => {
    if (label === 'Logout') {
      handleLogout();}
    else{ setActiveSection(label);
    setIsMobileMenuOpen(false);
  }};
  const handleLogout = () => {
    // Clear user session/token (example: remove from localStorage)
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    const fetchCoachData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:8080/api/coaches/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch coach data");
  
        const data = await response.json();
        setCoachName(data.fullName || "Coach Portal");
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };
  
    fetchCoachData();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-black transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">{coachName}</h1>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <nav className="mt-8">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={`flex w-full items-center gap-4 px-6 py-3 text-gray-400 transition-all duration-300 ease-in-out 
                hover:bg-red-500/10 hover:text-white hover:pl-8 group 
                ${activeSection === item.label ? "bg-red-500/10 text-white" : ""}`}
              onClick={() => handleNavClick(item.label)}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 
                ${activeSection === item.label ? "text-red-500" : ""}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Header */}
       

        {/* Dynamic Content Section */}
        <main className="p-6">
          {activeSection === 'Dashboard' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Coach Dashboard</h2>
                <p className="text-gray-400">Manage your clients and track performance</p>
              </div>

              <div className="space-y-6">
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SessionListOnly />
                  <ClientListOnlyContent />
                </div>
                
              </div>
            </>
          )}

          {activeSection === 'Clients' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Client Management</h2>
                <p className="text-gray-400">View and manage your client roster</p>
              </div>
              <ClientListContent />
            </>
          )}

          {activeSection === 'Sessions' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Session Schedule</h2>
                <p className="text-gray-400">Manage your upcoming and past sessions</p>
              </div>
              <SessionScheduleContent />
            </>
          )}

          {activeSection === 'Programs' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Training Programs</h2>
                <p className="text-gray-400">Create and manage your training programs</p>
              </div>
              <ProgramsContent />
            </>
          )}

          {activeSection === 'Performance' && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Performance Tracker</h2>
                <p className="text-gray-400">Analyze your coaching impact</p>
              </div>
              <PerformanceTrackerContent />
            </>
          )}

          {activeSection !== 'Dashboard' &&
            activeSection !== 'Clients' &&
            activeSection !== 'Sessions' &&
            activeSection !== 'Programs' &&
            activeSection !== 'Performance' && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-400">This section is currently under development.</p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default CoachDashboard;