import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Footer from "./Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+94 11 123 4567", "+94 71 234 5678"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["uplift@mail", "support@upliftgym.com"],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Kandy Road", "Kelaniya, Western Province"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Opening Hours",
      details: ["Monday - Friday: 5am - 11pm", "Weekends: 6am - 10pm"],
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-6 h-6" />, url: "#", name: "Instagram" },
    { icon: <Facebook className="w-6 h-6" />, url: "#", name: "Facebook" },
    { icon: <Twitter className="w-6 h-6" />, url: "#", name: "Twitter" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-red-500/40 z-10" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative z-20 px-8 max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            GET IN TOUCH
          </h1>
          <p className="text-2xl font-light tracking-wide text-gray-200">
            Take the first step towards your transformation
          </p>
        </motion.div>
      </motion.div>

      {/* Contact Info Grid */}
      <div className="py-32 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="p-12 bg-gray-900/80 border border-red-500/20 rounded-3xl backdrop-blur-lg text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-8 bg-red-500/10 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                {info.icon}
              </div>
              <h3 className="text-2xl font-bold mb-5 text-white">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-400 text-lg leading-relaxed">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-32 px-8 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-gray-900/80 border border-red-500/20 rounded-3xl backdrop-blur-lg overflow-hidden"
        >
          <div className="p-16">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black/40 border border-red-500/20 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black/40 border border-red-500/20 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-black/40 border border-red-500/20 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 mb-8"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-5 py-4 bg-black/40 border border-red-500/20 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 mb-8"
                required
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:-translate-y-1"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="relative h-[600px] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/30 pointer-events-none z-10" />
        <div className="absolute top-8 left-8 z-20 bg-gray-900/90 p-8 rounded-2xl backdrop-blur-lg border border-red-500/20 max-w-md">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
            Our Location
          </h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            123 Kandy Road
            <br />
            Kelaniya, Western Province
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            Located near the historic Kelaniya Raja Maha Vihara, our facility is easily accessible
            from both Kandy Road and the Colombo-Katunayake Expressway.
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            <MapPin className="w-4 h-4" />
            Get Directions
          </a>
        </div>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=79.915,6.970,79.925,6.980&layer=mapnik"
          className="w-full h-full grayscale contrast-125 brightness-75 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-300"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          title="Location Map"
        />
      </div>

      {/* Social Links */}
      <div className="py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
          >
            Connect With Us
          </motion.h3>
          <div className="flex justify-center gap-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="inline-flex items-center justify-center w-14 h-14 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;