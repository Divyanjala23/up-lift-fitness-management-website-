import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, ArrowRight } from "lucide-react";
import PaymentGateway from "./PaymentGateway"; // Import the payment component

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const plans = [
    {
      name: "Basic Plan",
      price: "$29",
      period: "/month",
      features: ["Access to gym", "Group classes", "Personal trainer support"],
      popular: false,
    },
    {
      name: "Pro Plan",
      price: "$49",
      period: "/month",
      features: ["All Basic Plan features", "Sauna & Spa", "Diet Consultation"],
      popular: true,
    },
    {
      name: "Elite Plan",
      price: "$79",
      period: "/month",
      features: ["All Pro Plan features", "VIP Lounge", "24/7 Access"],
      popular: false,
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
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
            Transform your life with our premium fitness services and expert guidance.
          </p>
          <motion.button 
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
    </div>
  );
};

export default MembershipPlans;
