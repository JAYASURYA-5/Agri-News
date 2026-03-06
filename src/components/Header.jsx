import React from 'react';
import { Leaf, RefreshCw } from 'lucide-react';

const Header = ({ onRefresh, loading }) => {
  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Agriculture Daily News</h1>
              <p className="text-green-100 text-sm">
                Live updates • Auto-refresh enabled
              </p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            title="Manually refresh news"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Now'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;