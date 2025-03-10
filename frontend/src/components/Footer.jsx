import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:-mb-2">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    Classes
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    Trainers
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    Membership
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:-mb-2">
                Contact Info
              </h4>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4" /> 011 123 4567
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4" /> uplift@mail.com
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" /> 123 Kandy Road
                  Kelaniya, Western Province
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4" /> Open 8am - 8pm
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-red-500 after:-mb-2">
                Newsletter
              </h4>
              <p className="text-gray-400 mb-6">
                Subscribe to get updates on special offers and events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-black/20 border border-gray-800 rounded-lg text-white focus:border-red-500 focus:outline-none"
                />
                <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-4">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-red-500 transition-all duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-red-500 transition-all duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#faq"
                className="text-gray-400 hover:text-red-500 transition-all duration-300"
              >
                FAQ
              </a>
            </div>
            <p className="text-gray-400">
              © 2025 Uplift Gym. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
