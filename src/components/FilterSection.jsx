import React from 'react';
import { MapPin, Languages } from 'lucide-react';
import { locations } from '../config/locations';
import { languages } from '../config/languages';

const FilterSection = ({ 
  selectedCountry, 
  selectedState, 
  selectedLanguage,
  onCountryChange,
  onStateChange,
  onLanguageChange
}) => {
  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    const firstState = Object.keys(locations[newCountry].states)[0];
    onCountryChange(newCountry, firstState);
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-700 font-medium mb-3">
          <MapPin className="w-5 h-5 text-green-600" />
          <span>Select Location & Language:</span>
        </div>
        
        <div className="flex gap-4 items-end flex-wrap">
          {/* Country Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-600 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {Object.entries(locations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-600 mb-1">State/Province</label>
            <select
              value={selectedState}
              onChange={(e) => onStateChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {Object.entries(locations[selectedCountry].states).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-600 mb-1">
              <Languages className="w-4 h-4 inline mr-1" />
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Filters Display */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <span className="font-medium">Showing news for:</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            {locations[selectedCountry].states[selectedState]}, {locations[selectedCountry].name}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            {languages[selectedLanguage]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;