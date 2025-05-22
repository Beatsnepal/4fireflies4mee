import React from 'react';
import { Sliders, Music, Award, Headphones } from 'lucide-react';

interface MixingMasteringSectionProps {
  onJoinClick: () => void;
}

export const MixingMasteringSection: React.FC<MixingMasteringSectionProps> = ({ onJoinClick }) => {
  return (
    <section id="services" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mixing & Mastering Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional mixing and mastering services to take your music to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-5">
              <Sliders size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Mixing</h3>
            <p className="text-gray-600">
              Get your tracks mixed by experienced engineers who understand the unique sound of Nepali music
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-5">
              <Headphones size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Perfect Mastering</h3>
            <p className="text-gray-600">
              Final touches to make your music sound professional on all platforms and streaming services
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-5">
              <Award size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied? We'll revise until you're happy with the final result of your music
            </p>
          </div>
        </div>

        <div className="bg-blue-800 text-white rounded-lg p-8 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Join Our Engineers Network</h3>
          <p className="mb-6 text-blue-100">
            Are you an experienced mixing or mastering engineer? Join our network and connect with artists looking for your skills.
          </p>
          <button
            onClick={onJoinClick} 
            className="bg-white text-blue-800 px-8 py-3 rounded-md font-bold hover:bg-blue-100 transition-colors inline-flex items-center"
          >
            <Music className="mr-2" size={18} />
            Join as Engineer
          </button>
        </div>
      </div>
    </section>
  );
};