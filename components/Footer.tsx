import React from 'react';
import { Music, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music size={24} />
              <span className="font-bold text-xl">Beats 4 Nepal</span>
            </div>
            <p className="text-blue-200 mb-4">
              Premium beats and mixing services for Nepali artists and producers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#beats" className="text-blue-200 hover:text-white transition-colors">Browse Beats</a></li>
              <li><a href="#services" className="text-blue-200 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Beat Licensing</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Mixing</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Mastering</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Custom Beats</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-blue-300" />
                <span className="text-blue-200">contact@beats4nepal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-blue-300" />
                <span className="text-blue-200">+977 1234567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-300" />
                <span className="text-blue-200">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} Beats 4 Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};