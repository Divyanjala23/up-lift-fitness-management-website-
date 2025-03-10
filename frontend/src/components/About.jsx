import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Dumbbell,
  Target,
  Award,
  Clock,
  ArrowRight,
  ChevronDown,
  Flame,
  Heart,
  Zap,
} from "lucide-react";
import Footer from "./Footer";

const About = () => {
  const navigate = useNavigate(); 
  
  const handleSignUp = () => {
    navigate('/signup');
  };
  
  const stats = [
    {
      icon: <Users className="text-red-500 mx-auto" />,
      value: "2000+",
      label: "Active Members",
      suffix: "warriors",
    },
    {
      icon: <Clock className="text-red-500 mx-auto" />,
      value: "24/7",
      label: "Access",
      suffix: "available",
    },
    {
      icon: <Award className="text-red-500 mx-auto" />,
      value: "15+",
      label: "Expert Trainers",
      suffix: "certified",
    },
    {
      icon: <Target className="text-red-500 mx-auto" />,
      value: "50+",
      label: "Weekly Classes",
      suffix: "programs",
    },
  ];

  const features = [
    {
      icon: <Dumbbell className="w-12 h-12 text-red-500" />,
      title: "Elite Equipment",
      description:
        "Train with state-of-the-art fitness technology and premium gear engineered for maximum performance",
      highlight: "Latest Technology",
    },
    {
      icon: <Users className="w-12 h-12 text-red-500" />,
      title: "Expert Trainers",
      description:
        "World-class coaches dedicated to forging your path to unprecedented strength and conditioning",
      highlight: "Certified Experts",
    },
    {
      icon: <Target className="w-12 h-12 text-red-500" />,
      title: "Custom Programs",
      description:
        "Tailored training and nutrition strategies designed to crush your specific fitness goals",
      highlight: "Personalized Plans",
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Supportive Community",
      description:
        "Join a passionate community of like-minded individuals committed to growth and excellence",
      highlight: "Strong Together",
    },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-inter">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-600/30 to-black z-10" />

        <div className="absolute inset-0 bg-[url('/gym-hero.jpg')] bg-cover bg-center scale-105" />

        <motion.div
          className="relative z-20 text-center max-w-6xl px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-red-500 whileInView-pulse" />
            <span className="text-red-500 tracking-widest font-semibold text-lg">
              ELEVATE YOUR POTENTIAL
            </span>
            <Zap className="w-8 h-8 text-red-500 whileInView-pulse" />
          </div>

          <h1 className="text-7xl font-black mb-8 leading-none bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            FORGE YOUR LEGACY
          </h1>

          <p className="text-3xl text-gray-100 font-light tracking-widest mb-12">
            TRANSFORM • STRENGTHEN • DOMINATE
          </p>

          <motion.button
            className="bg-gradient-to-r from-red-700 to-red-500 text-white px-12 py-5 rounded-full font-semibold tracking-wider shadow-lg shadow-red-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignUp}
          >
            START YOUR JOURNEY
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 z-20"
          whileInView={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-red-500 w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-10 text-center bg-gray-900/80 border border-red-500/20 rounded-lg backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="scale-150 mb-6">{stat.icon}</div>
              <h3 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-gray-300 uppercase tracking-wider text-sm font-medium mb-2">
                {stat.label}
              </p>
              <span className="text-gray-400 text-xs italic">
                {stat.suffix}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-red-500/10 radial-gradient" />

        <h2 className="text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
          DOMINATE YOUR LIMITS
        </h2>

        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative p-12 bg-gray-900/60 border border-red-500/20 rounded-lg backdrop-blur-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative inline-block mb-8">
                {feature.icon}
                <div className="absolute inset-0 bg-red-500/20 blur-lg rounded-full" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {feature.description}
              </p>
              <span className="inline-block px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-sm font-medium">
                {feature.highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 mx-8 my-16 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-extrabold mb-8 text-white">
            READY TO RISE?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Your transformation begins here. Join the elite community of
            warriors who dare to push their limits and redefine what's possible.
          </p>
          <motion.button
            className="inline-flex items-center gap-3 bg-white text-red-600 px-12 py-5 text-lg font-bold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignUp} 
          >
            BEGIN YOUR CONQUEST
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;