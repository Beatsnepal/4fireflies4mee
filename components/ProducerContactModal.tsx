import React from 'react';
import { X, Phone } from 'lucide-react';

interface ProducerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  producerPhone: string;
}

export const ProducerContactModal: React.FC<ProducerContactModalProps> = ({ 
  isOpen, 
  onClose, 
  producerPhone 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm relative overflow-hidden">
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <Phone size={20} className="mr-2" />
            Contact Producer
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Contact the producer directly to purchase this beat:
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-lg font-medium text-blue-800">{producerPhone}</p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};