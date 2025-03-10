import React from "react";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Zap, ChevronDown } from "lucide-react";

import { HeroContent } from "../const";



const HeroComponent = () => {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-red-600/30 to-black z-10" />

        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('src/assets/images/Bgs/mainBg.jpg')] bg-cover bg-center scale-105" />

        {/* Content */}
        <motion.div
          className="z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 absolute bottom-14 left-0 right-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <Zap className="w-8 h-8 text-red-500" />
              <span className="text-red-500 tracking-widest font-semibold text-lg">
                ELEVATE YOUR POTENTIAL
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-none bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              {HeroContent.heading}
            </h1>

            <p className="text-2xl lg:text-3xl text-gray-100 font-light tracking-widest mb-12">
              TRANSFORM • STRENGTHEN • DOMINATE
            </p>

            <Link to={HeroContent.button.Linkto}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-red-700 to-red-500 text-white px-12 py-5 rounded-full font-semibold tracking-wider shadow-lg shadow-red-500/30"
                >
                  {HeroContent.button.text}
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Right Column */}
          <div className="relative flex items-end justify-end">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
              <a
               
  href="https://www.youtube.com/watch?v=ruX4Le0kBng&t=45s"
  target="_blank"
  rel="noopener noreferrer"
  className="relative bg-gradient-to-r from-red-700 to-red-500 rounded-full shadow-lg shadow-red-500/30 w-16 h-16 flex justify-center items-center"
>
  <FaPlay size={30} className="text-white ml-2" />
</a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 z-20 left-1/2 transform -translate-x-1/2"
          whileInView={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-red-500 w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroComponent;
