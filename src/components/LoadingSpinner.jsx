import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ locationName }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <RefreshCw className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
        <p className="text-gray-600">Fetching latest agriculture news...</p>
        <p className="text-gray-500 text-sm mt-2">{locationName}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;