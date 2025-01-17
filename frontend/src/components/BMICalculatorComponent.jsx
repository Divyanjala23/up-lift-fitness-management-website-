import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Ruler, Calendar, Activity, Dumbbell, Zap } from "lucide-react";

const BMICalculatorComponent = () => {
  const [metrics, setMetrics] = useState({
    height: "",
    weight: "",
    age: "",
  });
  const [bmi, setBMI] = useState(null);
  const [status, setStatus] = useState("");
  const [animation, setAnimation] = useState(false);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!metrics.height || !metrics.weight) return;

    const heightInMeters = metrics.height / 100;
    const bmiValue = (
      metrics.weight /
      (heightInMeters * heightInMeters)
    ).toFixed(1);
    setBMI(bmiValue);
    setAnimation(true);
    determineStatus(bmiValue);
  };

  const determineStatus = (bmiValue) => {
    if (bmiValue < 16) {
      setStatus({ label: "Severely Underweight", color: "text-yellow-500" });
    } else if (bmiValue < 17) {
      setStatus({ label: "Underweight", color: "text-yellow-400" });
    } else if (bmiValue < 18.5) {
      setStatus({ label: "Mildly Underweight", color: "text-yellow-300" });
    } else if (bmiValue < 25) {
      setStatus({ label: "Normal Weight", color: "text-green-500" });
    } else if (bmiValue < 30) {
      setStatus({ label: "Overweight", color: "text-orange-500" });
    } else if (bmiValue < 40) {
      setStatus({ label: "Obese", color: "text-red-500" });
    } else {
      setStatus({ label: "Severely Obese", color: "text-red-600" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  return (
    <div className="bg-black text-white overflow-x-hidden py-24">
      <div className="absolute inset-0 bg-red-500/10 radial-gradient" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Background Effects */}

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-8 h-8 text-red-500" />
            <span className="text-red-500 tracking-widest font-semibold text-lg">
              MEASURE YOUR PROGRESS
            </span>
            <Zap className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            Calculate Your BMI
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Track your fitness journey with our advanced BMI calculator
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          className="relative bg-gray-900/60 border border-red-500/20 rounded-2xl backdrop-blur-lg p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Input Form */}
            <div className="space-y-6">
              <form onSubmit={calculateBMI} className="space-y-6">
                <InputField
                  icon={Ruler}
                  label="Height"
                  name="height"
                  value={metrics.height}
                  handleInputChange={handleInputChange}
                  placeholder="Enter height in cm"
                />

                <InputField
                  icon={Scale}
                  label="Weight"
                  name="weight"
                  value={metrics.weight}
                  handleInputChange={handleInputChange}
                  placeholder="Enter weight in kg"
                />

                <InputField
                  icon={Calendar}
                  label="Age"
                  name="age"
                  value={metrics.age}
                  handleInputChange={handleInputChange}
                  placeholder="Enter age"
                />

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white px-8 py-4 rounded-xl font-semibold tracking-wider shadow-lg shadow-red-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  CALCULATE BMI
                </motion.button>
              </form>
            </div>

            {/* Results Display */}
            <div className="flex items-center justify-center">
              {bmi ? (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="relative inline-flex items-center justify-center w-40 h-40 rounded-full bg-gray-800/80 border border-red-500/20 backdrop-blur-sm mb-8"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div>
                      <h3 className="text-4xl font-bold text-red-500">{bmi}</h3>
                      <p className="text-gray-400">BMI</p>
                    </div>
                  </motion.div>

                  <h4 className={`text-2xl font-bold mb-4 ${status.color}`}>
                    {status.label}
                  </h4>

                  <p className="text-gray-400 mb-6">
                    Healthy BMI range: 18.5 - 24.9
                  </p>

                  <motion.div
                    className="p-6 bg-gray-800/80 border border-red-500/20 rounded-xl backdrop-blur-sm"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-gray-300">
                      Want personalized fitness advice?
                      <span className="block text-red-500 font-semibold mt-2">
                        Contact our expert trainers today!
                      </span>
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="text-center text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Activity className="h-20 w-20 mx-auto mb-6 text-red-500 opacity-50" />
                  <p className="text-xl">
                    Enter your details to calculate your BMI
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const InputField = ({
  icon: Icon,
  label,
  name,
  value,
  placeholder,
  handleInputChange,
}) => (
  <motion.div className="relative" whileHover={{ y: -2 }}>
    <label className="block text-gray-300 mb-2 font-medium">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-red-500" />
      </div>
      <input
        type="number"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-gray-800/80 border border-red-500/20 rounded-xl
                   text-gray-100 placeholder-gray-500
                   focus:ring-2 focus:ring-red-500 focus:border-red-500
                   transition-all duration-200
                   [&::-webkit-inner-spin-button]:appearance-none
                   [&::-webkit-outer-spin-button]:appearance-none"
        autoComplete="off"
      />
    </div>
  </motion.div>
);

export default BMICalculatorComponent;
