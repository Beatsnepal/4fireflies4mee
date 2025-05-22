
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Beats for Nepali Artists
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            High-quality beats crafted for Nepali musicians and producers
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#beats" 
              className="bg-white text-blue-900 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition-colors"
            >
              Browse Beats
            </a>
            <a 
              href="#services" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white/10 transition-colors"
            >
              Mixing Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
