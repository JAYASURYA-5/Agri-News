import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Leaf, Info, Clock } from 'lucide-react';
import Header from './Header';
import FilterSection from './FilterSection';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import { locations } from '../config/locations';
import { languages } from '../config/languages';
import { fetchAgricultureNews } from '../services/newsService';

const AgricultureNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('india');
  const [selectedState, setSelectedState] = useState('tamilnadu');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const countryName = locations[selectedCountry].name;
      const stateName = locations[selectedCountry].states[selectedState];
      
      const data = await fetchAgricultureNews(countryName, stateName, selectedLanguage);
      
      if (data.articles && data.articles.length > 0) {
        setNews(data.articles);
        setLastUpdated(new Date());
      } else {
        setNews([]);
        setError(`No agriculture news found for ${stateName}, ${countryName}`);
      }
    } catch (err) {
      setError(`Failed to fetch news: ${err.message}`);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, selectedState, selectedLanguage]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing news...');
      fetchNews();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [autoRefresh, fetchNews]);

  const handleCountryChange = (country, state) => {
    setSelectedCountry(country);
    setSelectedState(state);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const getDateRange = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return `${oneMonthAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header onRefresh={fetchNews} loading={loading} />
      
      <FilterSection
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        selectedLanguage={selectedLanguage}
        onCountryChange={handleCountryChange}
        onStateChange={handleStateChange}
        onLanguageChange={handleLanguageChange}
      />

      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="inline-flex items-center cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Auto-refresh (5 min)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {selectedLanguage !== 'en' && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Regional Language News</p>
                <p className="text-blue-700">
                  Showing news in {languages[selectedLanguage]} for {locations[selectedCountry].states[selectedState]}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <LoadingSpinner 
            locationName={`${locations[selectedCountry].states[selectedState]}, ${locations[selectedCountry].name}`}
          />
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && news.length > 0 && (
          <div>
            <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
              <div className="text-gray-600 text-sm">
                Found <strong>{news.length}</strong> articles
                <span className="ml-2 text-green-600">• Live</span>
              </div>
              <div className="text-gray-500 text-xs">
                {getDateRange()}
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-20">
            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No news found</p>
            <button
              onClick={fetchNews}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        )}
      </main>

      <footer className="bg-green-600 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>© 2025 Agriculture Daily News • Powered by NewsAPI.org</p>
          <p className="text-green-100 text-sm mt-1">
            Auto-updates every 5 minutes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AgricultureNews;