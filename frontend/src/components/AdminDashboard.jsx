import React, { useState } from 'react';
import {
  Users,
  Settings,
  BarChart,
  Bell,
  Video,
  CreditCard,
  MessageSquare,
  Menu,
  X,
  Search,
  ChevronDown,
  Plus,
  Trash2,
  Edit,
  Check,
  Package
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const StatsCard = ({ icon: Icon, label, value, trend }) => (
  <div className="bg-black p-6 rounded-xl border border-red-500/20">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <h4 className="text-2xl font-bold text-white mt-2">{value}</h4>
      </div>
      <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-red-500" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 text-sm">
        <span className={`${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-gray-400 ml-1">vs last month</span>
      </div>
    )}
  </div>
);

const SearchBar = () => (
  <div className="relative hidden md:block">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Search..."
      className="bg-gray-800 border border-red-500/20 rounded-lg pl-10 pr-4 py-2 text-white w-64 focus:outline-none focus:border-red-500"
    />
  </div>
);

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
      >
        <Bell className="text-red-500 w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-black border border-red-500/20 rounded-xl shadow-lg py-2">
          <div className="px-4 py-3 hover:bg-red-500/10">
            <p className="text-sm text-white">New member registration</p>
            <span className="text-xs text-gray-400">2 minutes ago</span>
          </div>
        </div>
      )}
    </div>
  );
};

const UserAvatar = () => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
    <span className="text-white font-bold">A</span>
  </div>
);

const PageHeader = ({ section }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
      <span>Home</span>
      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
      <span className="text-white capitalize">{section}</span>
    </div>
    <h2 className="text-3xl font-bold text-white">
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </h2>
  </div>
);

const ActivityTable = () => (
  <div className="bg-black p-6 rounded-xl border border-red-500/20">
    <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { action: 'New member joined', time: '2m ago' },
        { action: 'Trainer approval pending', time: '15m ago' },
        { action: 'New service added', time: '1h ago' }
      ].map((activity, index) => (
        <div key={index} className="flex items-center gap-4 text-gray-300">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div>
            <p className="text-sm">{activity.action}</p>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PieChartCard = ({ title, data }) => (
  <div className="bg-black p-6 rounded-xl border border-red-500/20">
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#ef4444"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={index === 0 ? '#ef4444' : '#991b1b'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const MembersSection = ({ data }) => (
  <div className="bg-black p-6 rounded-xl border border-red-500/20">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-white">Members</h3>
      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add Member
      </button>
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-400 border-b border-red-500/20">
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Plan</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((member) => (
          <tr key={member.id} className="border-b border-red-500/10 text-white">
            <td className="py-3 px-4">{member.name}</td>
            <td className="py-3 px-4">{member.email}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                member.status === 'Active' 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {member.status}
              </span>
            </td>
            <td className="py-3 px-4">{member.plan}</td>
            <td className="py-3 px-4">
              <div className="flex gap-2">
                <button className="p-1 hover:bg-red-500/20 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-red-500/20 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TrainersSection = ({ data }) => (
  <div className="bg-black p-6 rounded-xl border border-red-500/20">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-white">Trainers</h3>
      <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add Trainer
      </button>
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-400 border-b border-red-500/20">
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Specialization</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((trainer) => (
          <tr key={trainer.id} className="border-b border-red-500/10 text-white">
            <td className="py-3 px-4">{trainer.name}</td>
            <td className="py-3 px-4">{trainer.email}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                trainer.status === 'Approved' 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-yellow-500/20 text-yellow-500'
              }`}>
                {trainer.status}
              </span>
            </td>
            <td className="py-3 px-4">{trainer.specialization}</td>
            <td className="py-3 px-4">
              <div className="flex gap-2">
                {trainer.status === 'Pending Approval' && (
                  <button className="p-1 hover:bg-green-500/20 rounded">
                    <Check className="w-4 h-4 text-green-500" />
                  </button>
                )}
                <button className="p-1 hover:bg-red-500/20 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-red-500/20 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DeleteConfirmationModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full mx-4">
      <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
      <p className="text-gray-400 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
      <div className="flex justify-end gap-4">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const EditModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full mx-4">
      <h3 className="text-xl font-bold mb-4">Edit Item</h3>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Name</label>
          <input 
            type="text" 
            className="w-full bg-gray-800 border border-red-500/20 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Status</label>
          <select className="w-full bg-gray-800 border border-red-500/20 rounded-lg px-4 py-2">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stats data
  const statsData = {
    members: {
      total: 1284,
      trend: 12.5
    },
    trainers: {
      total: 48,
      trend: 8.3
    },
    subscriptions: {
      total: 856,
      trend: -2.4
    }
  };

  // Sample data
  const memberData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', plan: 'Premium' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', plan: 'Basic' },
  ];

  const trainerData = [
    { id: 1, name: 'Mike Johnson', email: 'mike@example.com', status: 'Approved', specialization: 'Strength Training' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Pending Approval', specialization: 'Yoga' },
];

const revenueData = [
  { name: 'Premium', value: 70 },
  { name: 'Basic', value: 30 },
];

const navigationItems = [
  { icon: BarChart, label: 'Dashboard', value: 'dashboard' },
  { icon: Users, label: 'Members', value: 'members' },
  { icon: Users, label: 'Trainers', value: 'trainers' },
  { icon: Package, label: 'Services', value: 'services' },
  { icon: Video, label: 'Videos', value: 'videos' },
  { icon: CreditCard, label: 'Subscriptions', value: 'subscriptions' },
  { icon: MessageSquare, label: 'Community', value: 'community' },
  { icon: Settings, label: 'Settings', value: 'settings' },
];

const renderSection = () => {
  switch (currentSection) {
    case 'dashboard':
      return (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              icon={Users}
              label="Total Members"
              value={statsData.members.total.toLocaleString()}
              trend={statsData.members.trend}
            />
            <StatsCard 
              icon={Users}
              label="Active Trainers"
              value={statsData.trainers.total.toLocaleString()}
              trend={statsData.trainers.trend}
            />
            <StatsCard 
              icon={CreditCard}
              label="Active Subscriptions"
              value={statsData.subscriptions.total.toLocaleString()}
              trend={statsData.subscriptions.trend}
            />
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChartCard title="Revenue Distribution" data={revenueData} />
            <ActivityTable />
          </div>
        </div>
      );
    case 'members':
      return <MembersSection data={memberData} />;
    case 'trainers':
      return <TrainersSection data={trainerData} />;
    default:
      return (
        <div className="bg-black p-6 rounded-xl border border-red-500/20">
          <h3 className="text-xl font-bold text-white">Coming Soon</h3>
          <p className="text-gray-400 mt-2">This section is under development.</p>
        </div>
      );
  }
};

return (
  <div className="min-h-screen bg-gray-900">
    {/* Sidebar */}
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black transform ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 transition-transform duration-200 ease-in-out`}>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-white">Fitness Admin</h1>
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="text-white w-6 h-6" />
        </button>
      </div>
      <nav className="mt-8">
        {navigationItems.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              setCurrentSection(item.value);
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 w-full px-6 py-3 text-sm ${
              currentSection === item.value
                ? 'text-red-500 bg-red-500/10'
                : 'text-gray-400 hover:text-white hover:bg-red-500/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>

    {/* Main Content */}
    <div className="md:pl-64">
      {/* Header */}
      <header className="bg-black border-b border-red-500/20">
        <div className="flex items-center justify-between p-4">
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="text-white w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <SearchBar />
            <NotificationBell />
            <UserAvatar />
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-6">
        <PageHeader section={currentSection} />
        {renderSection()}
      </main>
    </div>
  </div>
);
};

export default AdminDashboard;