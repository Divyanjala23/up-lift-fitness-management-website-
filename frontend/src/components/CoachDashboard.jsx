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

const WorkoutSchedule = ({ sessions, onAddSession }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <button
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400"
          onClick={onAddSession}
        >
          <Plus className="h-4 w-4" />
          Add New Session
        </button>
      </CardHeader>
      <div className="space-y-4">
        {sessions.map((session, index) => (
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
                <p className="text-sm text-gray-400">with {session.client}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">{session.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ProgressChart = ({ clientProgress }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Progress Overview</CardTitle>
      </CardHeader>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clientProgress}>
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

const NutritionPlans = ({ plans, onAddPlan }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Plans</CardTitle>
        <button
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400"
          onClick={onAddPlan}
        >
          <Plus className="h-4 w-4" />
          Add New Plan
        </button>
      </CardHeader>
      <div className="space-y-4">
        {plans.map((plan, index) => (
          <div key={index} className="border-b border-red-500/10 pb-4">
            <div className="flex justify-between items-center">
              <h4 className="text-white font-semibold">{plan.client}</h4>
              <span className="text-sm text-gray-400">{plan.status}</span>
            </div>
            <p className="text-gray-400">{plan.description}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-sm text-red-500 hover:text-red-400">
                <Edit className="h-4 w-4" />
              </button>
              <button className="text-sm text-red-500 hover:text-red-400">
                <Trash className="h-4 w-4" />
              </button>
            </div>
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
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New client assigned', unread: true },
    { id: 2, message: 'Upcoming session in 2 hours', unread: true },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [sessions, setSessions] = useState([
    { time: '09:00 AM', workout: 'Strength Training', client: 'John Doe' },
    { time: '02:00 PM', workout: 'Cardio Session', client: 'Jane Smith' },
  ]);
  const [nutritionPlans, setNutritionPlans] = useState([
    { client: 'John Doe', description: 'Low-Carb Diet', status: 'Active' },
    { client: 'Jane Smith', description: 'High-Protein Diet', status: 'Active' },
  ]);
  const [clientProgress, setClientProgress] = useState([
    { name: 'Week 1', weight: 180, strength: 100, cardio: 70 },
    { name: 'Week 2', weight: 178, strength: 110, cardio: 75 },
    { name: 'Week 3', weight: 176, strength: 115, cardio: 80 },
    { name: 'Week 4', weight: 174, strength: 120, cardio: 85 },
  ]);

  const handleAddSession = () => {
    // Logic to add a new session
    console.log('Add new session');
  };

  const handleAddPlan = () => {
    // Logic to add a new nutrition plan
    console.log('Add new nutrition plan');
  };

  const navigationItems = [
    { label: 'Dashboard', icon: Activity, content: 'Dashboard Content' },
    { label: 'Clients', icon: User, content: 'Clients Content' },
    { label: 'Sessions', icon: Calendar, content: 'Sessions Content' },
    { label: 'Nutrition', icon: Apple, content: 'Nutrition Content' },
    { label: 'Progress', icon: TrendingUp, content: 'Progress Content' },
  ];

  const handleNavClick = (label) => {
    setActiveSection(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-black transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">Coach Dashboard</h1>
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
                  {notifications.filter((n) => n.unread).length > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-lg bg-black border border-red-500/20 shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-red-500/20">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <button
                        onClick={() => setNotifications([])}
                        className="text-sm text-red-500 hover:text-red-400"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          className={`w-full p-4 text-left hover:bg-red-500/10 border-b border-red-500/20
                            ${notif.unread ? 'bg-red-500/5' : ''}`}
                          onClick={() =>
                            setNotifications(
                              notifications.map((n) =>
                                n.id === notif.id ? { ...n, unread: false } : n,
                              ),
                            )
                          }
                        >
                          <p className="text-sm text-white">{notif.message}</p>
                        </button>
                      ))}
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
                    <span className="font-bold text-white">C</span>
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
                <h2 className="text-3xl font-bold text-white">Welcome back, Coach!</h2>
                <p className="text-gray-400">Manage your clients and sessions efficiently</p>
              </div>

              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                  <StatsCard
                    icon={User}
                    label="Active Clients"
                    value="15"
                    trend={3}
                    color="blue"
                  />
                  <StatsCard
                    icon={Calendar}
                    label="Upcoming Sessions"
                    value="8"
                    trend={12}
                    color="green"
                  />
                  <StatsCard
                    icon={Apple}
                    label="Nutrition Plans"
                    value="25"
                    trend={5}
                    color="yellow"
                  />
                  <StatsCard
                    icon={TrendingUp}
                    label="Client Progress"
                    value="78%"
                    trend={8}
                    color="purple"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <WorkoutSchedule sessions={sessions} onAddSession={handleAddSession} />
                  <ProgressChart clientProgress={clientProgress} />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <NutritionPlans plans={nutritionPlans} onAddPlan={handleAddPlan} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoachDashboard;