
import React from 'react';

export const FounderSection: React.FC = () => {
  return (
    <section id="about" className="bg-white text-black py-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="/rayzor.jpg"
            alt="Rayzor Jung"
            className="w-72 h-72 object-cover rounded-full border-4 border-blue-700 shadow-lg mx-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-12 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Rayzor Jung</h3>
          <p className="text-gray-700 leading-relaxed">
            Rayzor Jung is a visionary Nepali artist and entrepreneur who created Beats4Nepal to uplift local producers, engineers,
            and artists. His mission is to build a strong Nepali music community that thrives on collaboration and exposure.
          </p>
        </div>
      </div>
    </section>
  );
};
