import React from 'react';
import { Search, Film } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
  showSearchIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  subMessage, 
  showSearchIcon = false 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        {showSearchIcon ? (
          <Search className="h-8 w-8 text-indigo-500" />
        ) : (
          <Film className="h-8 w-8 text-indigo-500" />
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      {subMessage && <p className="text-gray-400">{subMessage}</p>}
    </div>
  );
};

export default EmptyState;