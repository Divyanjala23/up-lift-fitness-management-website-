import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Edit,
  BarChart2,
  MessageSquare,
  Target,
  TrendingUp,
  Activity,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  UserPlus,
  BookOpen,
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
          <span className="text-white font-bold">{client.initials}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{client.name}</h4>
          <p className="text-sm text-gray-400">{client.goal}</p>
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

const ClientListContent = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      initials: 'AJ',
      goal: 'Weight Loss',
      progress: 65,
      lastSession: '2024-02-02',
      planStatus: 'Active',
    },
    {
      id: 2,
      name: 'Sarah Miller',
      initials: 'SM',
      goal: 'Muscle Gain',
      progress: 45,
      lastSession: '2024-02-01',
      planStatus: 'Active',
    },
    {
      id: 3,
      name: 'Michael Chen',
      initials: 'MC',
      goal: 'Marathon Training',
      progress: 80,
      lastSession: '2024-01-30',
      planStatus: 'Completed',
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Client Management</CardTitle>
            <button className="text-red-500 hover:text-red-400 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add Client
            </button>
          </div>
        </CardHeader>
        <div className="space-y-4">
          {clients.map((client) => (
            <ClientOverviewCard key={client.id} client={client} />
          ))}
        </div>
      </Card>
    </div>
  );
};

const SessionScheduleContent = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      client: 'Alex Johnson',
      type: 'Personal Training',
      date: '2024-02-05',
      time: '09:00 AM',
      status: 'Upcoming',
    },
    {
      id: 2,
      client: 'Sarah Miller',
      type: 'Online Consultation',
      date: '2024-02-06',
      time: '02:00 PM',
      status: 'Upcoming',
    },
    {
      id: 3,
      client: 'Michael Chen',
      type: 'Group Session',
      date: '2024-02-04',
      time: '05:00 PM',
      status: 'Completed',
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Session Schedule</CardTitle>
            <button className="text-red-500 hover:text-red-400 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              New Session
            </button>
          </div>
        </CardHeader>
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`border-b border-red-500/10 pb-4 mb-4 ${
              session.status === 'Completed' ? 'opacity-60' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white font-semibold">{session.client}</h4>
                <p className="text-gray-400 text-sm">{session.type}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400">{session.date}</p>
                <p className="text-sm text-white">{session.time}</p>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const PerformanceTrackerContent = () => {
  const performanceMetrics = [
    {
      label: 'Total Clients',
      value: 15,
      icon: Users,
      trend: 20,
    },
    {
      label: 'Sessions This Month',
      value: 42,
      icon: Calendar,
      trend: 10,
    },
    {
      label: 'Client Retention',
      value: '92%',
      icon: CheckCircle,
      trend: 5,
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

  const navigationItems = [
    { label: 'Dashboard', icon: Activity, content: 'Dashboard Overview' },
    { label: 'Clients', icon: Users, content: 'Client Management' },
    { label: 'Sessions', icon: Calendar, content: 'Session Schedule' },
    { label: 'Programs', icon: BookOpen, content: 'Training Programs' },
    { label: 'Performance', icon: TrendingUp, content: 'Performance Tracking' },
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
          <h1 className="text-xl font-bold text-white">Coach Portal</h1>
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
                  placeholder="Search clients..."
                  className="w-64 rounded-lg border border-red-500/20 bg-gray-800 py-2 pl-10 pr-4 text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="relative">
                <button className="relative rounded-lg p-2 hover:bg-red-500/20">
                  <Bell className="h-5 w-5 text-red-500" />
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
                    <span className="font-bold text-white">JD</span>
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
                <h2 className="text-3xl font-bold text-white">Coach Dashboard</h2>
                <p className="text-gray-400">Manage your clients and track performance</p>
              </div>

              <div className="space-y-6">
                <PerformanceTrackerContent />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SessionScheduleContent />
                  <ClientListContent />
                </div>
                <TodoListContent />
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