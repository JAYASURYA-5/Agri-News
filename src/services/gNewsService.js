const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4/search';

// Get date 6 months ago in YYYY-MM-DD format
const getSixMonthsAgoDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return date.toISOString().split('T')[0];
};

// Language code mapping for GNews
const languageMap = {
  en: 'en',
  ta: 'ta',
  hi: 'hi',
  te: 'te',
  kn: 'kn',
  ml: 'ml',
  mr: 'mr',
  gu: 'gu',
  bn: 'bn',
  pa: 'pa'
};

export const fetchAgricultureNewsGNews = async (countryName, stateName, language) => {
  if (!GNEWS_API_KEY || GNEWS_API_KEY === 'YOUR_GNEWS_API_KEY_HERE') {
    throw new Error('Please add your GNews API key in the .env file');
  }

  // Build search query in appropriate language
  let searchQuery = '';
  
  switch(language) {
    case 'ta':
      searchQuery = `விவசாயம் ${stateName} OR வேளாண்மை ${stateName}`;
      break;
    case 'hi':
      searchQuery = `कृषि ${stateName} OR खेती ${stateName}`;
      break;
    case 'te':
      searchQuery = `వ్యవసాయం ${stateName} OR రైతు ${stateName}`;
      break;
    case 'kn':
      searchQuery = `ಕೃಷಿ ${stateName} OR ರೈತ ${stateName}`;
      break;
    case 'ml':
      searchQuery = `കൃഷി ${stateName} OR കർഷകൻ ${stateName}`;
      break;
    case 'mr':
      searchQuery = `शेती ${stateName} OR शेतकरी ${stateName}`;
      break;
    case 'gu':
      searchQuery = `ખેતી ${stateName} OR ખેડૂત ${stateName}`;
      break;
    case 'bn':
      searchQuery = `কৃষি ${stateName} OR চাষী ${stateName}`;
      break;
    case 'pa':
      searchQuery = `ਖੇਤੀਬਾੜੀ ${stateName} OR ਕਿਸਾਨ ${stateName}`;
      break;
    default:
      searchQuery = `agriculture ${stateName} ${countryName} OR farming ${stateName}`;
  }

  const fromDate = getSixMonthsAgoDate();
  const langCode = languageMap[language] || 'en';
  
  const url = `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&lang=${langCode}&from=${fromDate}&max=50&apikey=${GNEWS_API_KEY}`;
  
  console.log('GNews Query:', searchQuery);
  console.log('Language:', langCode);
  console.log('From Date:', fromDate);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid GNews API key. Please check your API key.');
    } else if (response.status === 429) {
      throw new Error('API rate limit reached. Please try again later.');
    }
    throw new Error('Failed to fetch news from GNews');
  }
  
  const data = await response.json();
  
  // Convert GNews format to standard format
  return {
    articles: data.articles ? data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      source: { name: article.source.name }
    })) : []
  };
};

// Country-specific news
export const fetchCountryNewsGNews = async (country, language) => {
  if (!GNEWS_API_KEY || GNEWS_API_KEY === 'YOUR_GNEWS_API_KEY_HERE') {
    throw new Error('Please add your GNews API key in the .env file');
  }

  let searchQuery = language === 'en' 
    ? `agriculture ${country} OR farming ${country}`
    : `விவசாயம் ${country}`;

  const fromDate = getSixMonthsAgoDate();
  const langCode = languageMap[language] || 'en';
  
  const url = `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&lang=${langCode}&country=${country}&from=${fromDate}&max=50&apikey=${GNEWS_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch country news');
  }
  
  const data = await response.json();
  
  return {
    articles: data.articles ? data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      source: { name: article.source.name }
    })) : []
  };
};