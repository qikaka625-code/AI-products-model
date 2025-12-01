import React, { useEffect, useState } from 'react';

export const ApiKeyManager: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);

  const checkKey = async () => {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  useEffect(() => {
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success after closing modal (or user selected), re-check
      checkKey();
    }
  };

  if (hasKey) {
    return (
      <button 
        onClick={handleSelectKey}
        className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        API Key Active
      </button>
    );
  }

  return (
    <button
      onClick={handleSelectKey}
      className="bg-blue-600/80 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
    >
      Select API Key
    </button>
  );
};