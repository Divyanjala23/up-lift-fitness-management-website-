import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Users,
  LineChart,
  Calculator,
  MessageSquare,
  Video,
  ChevronDown,
  Zap,
  ArrowRight,
  Dumbbell,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import PaymentGateway from "./PaymentGateway";

const Services = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the services array
  const services = [
    {
      icon: <Crown size={32} className="text-red-500" />,
      title: "Personal Training",
      description: "Tailored workout plans designed by certified trainers.",
      features: [
        "One-on-one coaching",
        "Customized workout plans",
        "Nutrition guidance",
      ],
    },
    {
      icon: <Users size={32} className="text-red-500" />,
      title: "Group Classes",
      description: "Join our high-energy group fitness sessions.",
      features: [
        "Yoga & Pilates",
        "HIIT & Cardio",
        "Strength training",
      ],
    },
    {
      icon: <LineChart size={32} className="text-red-500" />,
      title: "Progress Tracking",
      description: "Track your fitness journey with advanced analytics.",
      features: [
        "Body composition analysis",
        "Performance metrics",
        "Weekly progress reports",
      ],
    },
    {
      icon: <Calculator size={32} className="text-red-500" />,
      title: "Nutrition Planning",
      description: "Personalized meal plans to fuel your goals.",
      features: [
        "Custom meal plans",
        "Macro tracking",
        "Dietitian consultations",
      ],
    },
    {
      icon: <MessageSquare size={32} className="text-red-500" />,
      title: "Community Support",
      description: "Connect with like-minded fitness enthusiasts.",
      features: [
        "Online forums",
        "Live Q&A sessions",
        "Exclusive events",
      ],
    },
    {
      icon: <Video size={32} className="text-red-500" />,
      title: "On-Demand Workouts",
      description: "Access our library of workout videos anytime.",
      features: [
        "Beginner to advanced levels",
        "Yoga, cardio, and strength",
        "New videos weekly",
      ],
    },
  ];

  // Fetch subscription plans from the backend when the component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/plans');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleJoinNow = () => {
    navigate('/signup');
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  const savePlanChanges = async (editedPlan) => {
    try {
      const response = await fetch('/api/plans/${editedPlan.id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPlan),
      });

      if (!response.ok) {
        throw new Error('Failed to update plan');
      }

      const updatedPlan = await response.json();
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
      );
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden font-inter">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-600/30 to-black z-10" />
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Gym Services"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-20 text-center max-w-6xl px-6"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap size={32} className="text-red-500 animate-pulse" />
            <span className="text-red-500 tracking-widest font-semibold text-lg">
              PREMIUM FITNESS SERVICES
            </span>
            <Zap size={32} className="text-red-500 animate-pulse" />
          </div>

          <h1 className="text-7xl font-black mb-8 leading-none bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            ELEVATE YOUR JOURNEY
          </h1>

          <p className="text-3xl text-gray-100 font-light tracking-widest mb-12">
            PERSONALIZED • PROGRESSIVE • POWERFUL
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoinNow}
            className="bg-gradient-to-r from-red-700 to-red-500 text-white px-12 py-5 rounded-full font-semibold tracking-wider shadow-lg shadow-red-500/30"
          >
            EXPLORE SERVICES
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 z-20"
          whileInView={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-red-500" />
        </motion.div>
      </motion.div>

      {/* Services Grid */}
      <div className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-red-500/10" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
        >
          OUR SERVICES
        </motion.h2>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative p-8 bg-gray-900/60 border border-red-500/20 rounded-lg backdrop-blur-lg"
            >
              <div className="relative inline-block mb-6">
                {service.icon}
                <div className="absolute inset-0 bg-red-500/20 blur-lg rounded-full" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-gray-400 flex items-center gap-2"
                  >
                    <ArrowRight size={16} className="text-red-500" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

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
            <p>Loading plans...</p>
          ) : (
            plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-lg backdrop-blur-lg ${
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
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
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
                  className={`w-full py-4 rounded-lg font-semibold ${
                    plan.popular
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-white hover:bg-red-500"
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
        <PaymentGateway
          plan={selectedPlan}
          onClose={handleClosePayment}
        />
      )}

      <Footer />
    </div>
  );
};

export default Services;