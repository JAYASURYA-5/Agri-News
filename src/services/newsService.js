const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

// Fetch latest agriculture news (FREE - last 1 month)
export const fetchAgricultureNews = async (countryName, stateName, language) => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Please add your NewsAPI key in the .env file');
  }

  // FREE TIER: Only last 1 month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const fromDate = oneMonthAgo.toISOString().split('T')[0];

  let searchQuery = '';
  
  // Build comprehensive search query
  if (language === 'en') {
    searchQuery = `agriculture OR farming OR crops OR harvest OR farmers OR irrigation OR seeds OR fertilizer ${stateName}`;
  } else if (language === 'hi') {
    searchQuery = `कृषि OR खेती OR फसल OR किसान ${stateName}`;
  } else if (language === 'ta') {
    searchQuery = `விவசாயம் OR பயிர் OR விவசாயி ${stateName}`;
  } else if (language === 'te') {
    searchQuery = `వ్యవసాయం OR పంట OR రైతు ${stateName}`;
  } else if (language === 'kn') {
    searchQuery = `ಕೃಷಿ OR ಬೆಳೆ OR ರೈತ ${stateName}`;
  } else if (language === 'ml') {
    searchQuery = `കൃഷി OR വിള OR കർഷകൻ ${stateName}`;
  } else if (language === 'mr') {
    searchQuery = `शेती OR पीक OR शेतकरी ${stateName}`;
  } else if (language === 'gu') {
    searchQuery = `ખેતી OR પાક OR ખેડૂત ${stateName}`;
  } else if (language === 'bn') {
    searchQuery = `কৃষি OR ফসল OR কৃষক ${stateName}`;
  } else if (language === 'pa') {
    searchQuery = `ਖੇਤੀਬਾੜੀ OR ਫਸਲ OR ਕਿਸਾਨ ${stateName}`;
  } else {
    searchQuery = `agriculture farming ${stateName}`;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&from=${fromDate}&language=${language}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;
  
  console.log('Fetching news from API:', searchQuery);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 426) {
      throw new Error('API subscription limit reached');
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please wait.');
    }
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Filter agriculture-specific news
  if (data.articles) {
    const filteredArticles = data.articles.filter(article => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      return text.includes('agricult') || 
             text.includes('farm') || 
             text.includes('crop') || 
             text.includes('harvest') ||
             text.includes('farmer');
    });
    
    return {
      ...data,
      articles: filteredArticles.length > 0 ? filteredArticles : data.articles
    };
  }
  
  return data;
};

// Get cached news from localStorage
export const getCachedNews = (country, state, language) => {
  try {
    const cacheKey = `news_${country}_${state}_${language}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const { articles, timestamp } = JSON.parse(cached);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      // Return cached if less than 1 hour old
      if (Date.now() - timestamp < oneHour) {
        console.log('Using cached news');
        return articles;
      } else {
        console.log('Cache expired');
        // Remove expired cache
        localStorage.removeItem(cacheKey);
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  
  return null;
};

// Save news to localStorage
export const cacheNews = (country, state, language, articles) => {
  const cacheKey = `news_${country}_${state}_${language}`;
  const cacheData = {
    articles,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    console.log('News cached successfully');
  } catch (error) {
    console.error('Failed to cache news:', error);
    // If localStorage is full, clear old cache
    if (error && (error.name === 'QuotaExceededError' || error.code === 22)) {
      console.log('Storage full, clearing old cache...');
      clearOldCache();
      // Try again
      try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      } catch (retryError) {
        console.error('Failed to cache after clearing:', retryError);
      }
    }
  }
};

// Clear old cache entries
const clearOldCache = () => {
  try {
    const keys = Object.keys(localStorage);
    const newsKeys = keys.filter(key => key.startsWith('news_'));
    
    // Remove all cache entries
    newsKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log(`Cleared ${newsKeys.length} old cache entries`);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Fetch from Google News (Fallback)
export const fetchGoogleNews = async (countryName, stateName, language) => {
  const languageCode = language === 'ta' ? 'ta-IN' : 
                       language === 'hi' ? 'hi-IN' :
                       language === 'te' ? 'te-IN' :
                       language === 'kn' ? 'kn-IN' :
                       language === 'ml' ? 'ml-IN' :
                       language === 'mr' ? 'mr-IN' :
                       language === 'gu' ? 'gu-IN' :
                       language === 'bn' ? 'bn-IN' :
                       language === 'pa' ? 'pa-IN' : 'en-IN';
  
  const query = `agriculture+farming+${stateName}`;
  const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=${languageCode}&gl=IN&ceid=IN:${language}`;
  
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      return {
        articles: data.items.map(item => ({
          title: item.title,
          description: item.description,
          url: item.link,
          urlToImage: item.enclosure?.link || null,
          publishedAt: item.pubDate,
          source: { name: item.author || 'Google News' }
        })),
        totalResults: data.items.length
      };
    }
    throw new Error('Failed to fetch from Google News');
  } catch (error) {
    console.error('Google News fetch failed:', error);
    throw error;
  }
};