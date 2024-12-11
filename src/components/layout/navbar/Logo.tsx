import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-xl font-bold text-white">P</span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-construction-900">ProBidHub</span>
        <span className="text-xs text-construction-500 -mt-1">Construction Bidding</span>
      </div>
    </div>
  );
};