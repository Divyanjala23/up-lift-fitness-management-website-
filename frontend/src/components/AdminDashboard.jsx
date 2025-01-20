import React, { useState } from "react";
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
  Package,
} from "lucide-react";
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
  Cell,
} from "recharts";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MemberRegistrationForm from "./MemberRegistrationForm";
import CoachRegistrationForm from "./CoachRegistrationForm";
import Thumbnail from "../assets/images/Bgs/SignInImg.jpg";
import VideoAddForm from "./VideoAddForm";

const StatsCard = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <h4 className="mt-2 text-2xl font-bold text-white">{value}</h4>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
        <Icon className="h-6 w-6 text-red-500" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 text-sm">
        <span className={`${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
          {trend >= 0 ? "+" : ""}
          {trend}%
        </span>
        <span className="ml-1 text-gray-400">vs last month</span>
      </div>
    )}
  </div>
);

const SearchBar = () => (
  <div className="relative hidden md:block">
    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      className="w-64 rounded-lg border border-red-500/20 bg-gray-800 py-2 pl-10 pr-4 text-white focus:border-red-500 focus:outline-none"
    />
  </div>
);

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="rounded-lg p-2 transition-colors hover:bg-red-500/20"
      >
        <Bell className="h-5 w-5 text-red-500" />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-red-500/20 bg-black py-2 shadow-lg">
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
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600">
    <span className="font-bold text-white">A</span>
  </div>
);

const PageHeader = ({ section }) => (
  <div className="mb-8">
    <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
      <span>Home</span>
      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
      <span className="capitalize text-white">{section}</span>
    </div>
    <h2 className="text-3xl font-bold text-white">
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </h2>
  </div>
);

const ActivityTable = () => (
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <h3 className="mb-4 text-xl font-bold text-white">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { action: "New member joined", time: "2m ago" },
        { action: "Trainer approval pending", time: "15m ago" },
        { action: "New service added", time: "1h ago" },
      ].map((activity, index) => (
        <div key={index} className="flex items-center gap-4 text-gray-300">
          <div className="h-2 w-2 rounded-full bg-red-500" />
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
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
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
              <Cell key={index} fill={index === 0 ? "#ef4444" : "#991b1b"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const MembersSection = ({ data, open, handleOpen }) => (
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">Members</h3>
      <button
        onClick={() => handleOpen("md")}
        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        <Plus className="h-4 w-4" /> Add Member
      </button>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-red-500/20 text-left text-gray-400">
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Plan</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((member) => (
          <tr key={member.id} className="border-b border-red-500/10 text-white">
            <td className="px-4 py-3">{member.name}</td>
            <td className="px-4 py-3">{member.email}</td>
            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  member.status === "Active"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {member.status}
              </span>
            </td>
            <td className="px-4 py-3">{member.plan}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <button className="rounded p-1 hover:bg-red-500/20">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded p-1 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {/* add button model open  */}
    <FormModal
      open={open}
      handleOpen={handleOpen}
      component={<MemberRegistrationForm type={"add"} />}
    />
  </div>
);

const FormModal = ({ open, handleOpen, component }) => (
  <Dialog open={open} handler={handleOpen}>
    <DialogHeader className="flex justify-between">
      <span>Add a member</span>
      <button
        onClick={handleOpen}
        className="flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 font-bold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-red-400"
      >
        <X />
      </button>
    </DialogHeader>
    <DialogBody>{component}</DialogBody>
  </Dialog>
);

const TrainersSection = ({ data, open, handleOpen }) => (
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">Trainers</h3>
      <button
        onClick={() => handleOpen("md")}
        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        <Plus className="h-4 w-4" /> Add Trainer
      </button>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-red-500/20 text-left text-gray-400">
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Specialization</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((trainer) => (
          <tr
            key={trainer.id}
            className="border-b border-red-500/10 text-white"
          >
            <td className="px-4 py-3">{trainer.name}</td>
            <td className="px-4 py-3">{trainer.email}</td>
            <td className="px-4 py-3">
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  trainer.status === "Approved"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {trainer.status}
              </span>
            </td>
            <td className="px-4 py-3">{trainer.specialization}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                {trainer.status === "Pending Approval" && (
                  <button className="rounded p-1 hover:bg-green-500/20">
                    <Check className="h-4 w-4 text-green-500" />
                  </button>
                )}
                <button className="rounded p-1 hover:bg-red-500/20">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="rounded p-1 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <FormModal
      open={open}
      handleOpen={handleOpen}
      component={<CoachRegistrationForm type={"add"} />}
    />
  </div>
);

const VideoSection = ({ open, handleOpen }) => (
  <div className="rounded-xl border border-red-500/20 bg-black p-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">Added Videos</h3>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        <Plus className="h-4 w-4" /> Add Videos
      </button>
    </div>
    <div className="mt-6 grid grid-cols-4 gap-5">
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </div>
    <FormModal
      open={open}
      handleOpen={handleOpen}
      component={<VideoAddForm />}
    />
  </div>
);

const VideoCard = () => (
  <div className="group relative h-40 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-500 transition-all duration-200 ease-in-out hover:scale-105 hover:border hover:border-red-500">
    <img src={Thumbnail} alt="thumbnail" className="object-cover" />
    <div className="absolute inset-0 grid w-full translate-y-80 place-content-center bg-black/50 transition-all duration-200 ease-in-out group-hover:translate-y-0">
      <div className="mx-auto flex w-4/5 flex-col items-center justify-center">
        <h4 className="mb-2 text-lg font-semibold text-white antialiased">
          Video Title
        </h4>
        <p className="text-center text-sm tracking-tight text-gray-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          quae harum autem omnis ab in.
        </p>
      </div>
      <button
        onClick={() => console.log("clicked")}
        className="group/btnDel fixed right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 p-1 hover:scale-105 hover:bg-red-500 hover:shadow-md hover:shadow-red-500"
      >
        <Trash2 className="h-5 w-5 transition-all duration-200 ease-in-out group-hover/btnDel:text-gray-300" />
      </button>
    </div>
  </div>
);

const DeleteConfirmationModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="mx-4 w-full max-w-md rounded-xl bg-gray-900 p-6">
      <h3 className="mb-4 text-xl font-bold">Confirm Delete</h3>
      <p className="mb-6 text-gray-400">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-800 px-4 py-2 hover:bg-gray-700"
        >
          Cancel
        </button>
        <button className="rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const EditModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="mx-4 w-full max-w-md rounded-xl bg-gray-900 p-6">
      <h3 className="mb-4 text-xl font-bold">Edit Item</h3>
      <div className="mb-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-red-500/20 bg-gray-800 px-4 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Status</label>
          <select className="w-full rounded-lg border border-red-500/20 bg-gray-800 px-4 py-2">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-800 px-4 py-2 hover:bg-gray-700"
        >
          Cancel
        </button>
        <button className="rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600">
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  // Stats data
  const statsData = {
    members: {
      total: 1284,
      trend: 12.5,
    },
    trainers: {
      total: 48,
      trend: 8.3,
    },
    subscriptions: {
      total: 856,
      trend: -2.4,
    },
  };

  // Sample data
  const memberData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      plan: "Premium",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
      plan: "Basic",
    },
  ];

  const trainerData = [
    {
      id: 1,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Approved",
      specialization: "Strength Training",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Pending Approval",
      specialization: "Yoga",
    },
  ];

  const revenueData = [
    { name: "Premium", value: 70 },
    { name: "Basic", value: 30 },
  ];

  const navigationItems = [
    { icon: BarChart, label: "Dashboard", value: "dashboard" },
    { icon: Users, label: "Members", value: "members" },
    { icon: Users, label: "Trainers", value: "trainers" },
    // { icon: Package, label: 'Services', value: 'services' },
    { icon: Video, label: "Videos", value: "videos" },
    { icon: CreditCard, label: "Subscriptions", value: "subscriptions" },
    { icon: MessageSquare, label: "Community", value: "community" },
    { icon: Settings, label: "Settings", value: "settings" },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <PieChartCard title="Revenue Distribution" data={revenueData} />
              <ActivityTable />
            </div>
          </div>
        );
      case "members":
        return (
          <MembersSection
            data={memberData}
            open={open}
            handleOpen={handleOpen}
          />
        );
      case "trainers":
        return (
          <TrainersSection
            data={trainerData}
            open={open}
            handleOpen={handleOpen}
          />
        );
      case "videos":
        return <VideoSection open={open} handleOpen={handleOpen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-black ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-white">Fitness Admin</h1>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
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
              className={`flex w-full items-center gap-4 px-6 py-3 text-sm ${
                currentSection === item.value
                  ? "bg-red-500/10 text-red-500"
                  : "text-gray-400 hover:bg-red-500/10 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
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
