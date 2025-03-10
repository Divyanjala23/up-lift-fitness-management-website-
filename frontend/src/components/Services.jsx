import React, { useState } from "react";
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

  const handleJoinNow = () => {
    navigate('/signup');
  };
  const services = [
    {
      icon: <Crown size={48} className="text-red-500" />,
      title: "Personalized Fitness Accounts",
      description:
        "Create your profile, track progress, and sync with fitness devices for a seamless experience",
      features: [
        "Custom dashboards",
        "Progress tracking",
        "Device integration",
      ],
    },
    {
      icon: <Users size={48} className="text-red-500" />,
      title: "Expert Coach Integration",
      description:
        "Get personalized guidance from certified trainers committed to your fitness journey",
      features: [
        "1-on-1 coaching",
        "Custom workout plans",
        "Regular check-ins",
      ],
    },
    {
      icon: <LineChart size={48} className="text-red-500" />,
      title: "Progress Tracking Tools",
      description:
        "Visualize your journey with comprehensive tracking and milestone celebrations",
      features: [
        "Progress charts",
        "Achievement badges",
        "Measurement logging",
      ],
    },
    {
      icon: <Calculator size={48} className="text-red-500" />,
      title: "BMI Calculator",
      description:
        "Understand your body composition and get tailored recommendations for your goals",
      features: ["Instant calculations", "Expert insights", "Goal setting"],
    },
    {
      icon: <MessageSquare size={48} className="text-red-500" />,
      title: "Community Forum",
      description:
        "Connect with fellow fitness enthusiasts and share your journey in our vibrant community",
      features: ["Group challenges", "Success stories", "Expert advice"],
    },
    {
      icon: <Video size={48} className="text-red-500" />,
      title: "Video Tutorials",
      description:
        "Access premium workout content and expert guidance from anywhere, anytime",
      features: [
        "HD quality content",
        "Multiple skill levels",
        "Form guidance",
      ],
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      features: [
        "Basic fitness tracking",
        "Community access",
        "5 video tutorials/month",
        "BMI calculations",
      ],
    },
    {
      name: "Warrior",
      price: "$99",
      period: "per month",
      features: [
        "All Starter features",
        "Personal coach assistance",
        "Unlimited video access",
        "Custom meal plans",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$149",
      period: "per month",
      features: [
        "All Warrior features",
        "1-on-1 coaching sessions",
        "Advanced analytics",
        "Nutrition consulting",
        "VIP workshop access",
      ],
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
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
          {plans.map((plan, index) => (
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
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 mx-8 my-16 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="text-6xl font-extrabold mb-8 text-white">
            START YOUR JOURNEY TODAY
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Transform your life with our premium fitness services and expert
            guidance. Join our community of warriors and achieve your fitness
            goals.
          </p>
          <motion.button 
            onClick={handleJoinNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-red-600 px-12 py-5 text-lg font-bold rounded-full"
          >
            JOIN NOW
            <ArrowRight size={24} />
          </motion.button>
        </motion.div>
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