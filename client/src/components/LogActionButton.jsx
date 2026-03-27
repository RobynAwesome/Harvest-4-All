import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LogActionButton = ({ actionType, description, value, unit, location, notes, onActionLogged }) => {
  const { logAction } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogAction = async () => {
    setIsLoading(true);
    try {
      const actionData = {
        type: actionType,
        description,
        value: parseFloat(value),
        unit,
        location,
        notes
      };

      const result = await logAction(actionData);
      if (result) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        if (onActionLogged) {
          onActionLogged(result);
        }
      }
    } catch (error) {
      console.error('Error logging action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogAction}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : showSuccess
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-green-600 hover:bg-green-700 text-white'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging...
        </span>
      ) : showSuccess ? (
        '✅ Action Logged!'
      ) : (
        'Log Action'
      )}
    </button>
  );
};

export default LogActionButton;