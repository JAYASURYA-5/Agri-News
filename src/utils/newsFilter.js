// Filter news by date range
export const filterNewsByDateRange = (articles, months = 6) => {
  const dateLimit = new Date();
  dateLimit.setMonth(dateLimit.getMonth() - months);
  
  return articles.filter(article => {
    const articleDate = new Date(article.publishedAt);
    return articleDate >= dateLimit && articleDate <= new Date();
  });
};

// Filter news by relevance to agriculture
export const filterAgricultureNews = (articles, language = 'en') => {
  const keywords = {
    en: ['agriculture', 'farming', 'crop', 'harvest', 'farmer', 'cultivation', 'irrigation', 'pesticide', 'fertilizer', 'soil'],
    ta: ['விவசாயம்', 'பயிர்', 'விவசாயி', 'வேளாண்மை', 'நீர்ப்பாசனம்', 'உரம்'],
    hi: ['कृषि', 'खेती', 'फसल', 'किसान', 'सिंचाई', 'खाद'],
    // Add more language keywords
  };
  
  const relevantKeywords = keywords[language] || keywords.en;
  
  return articles.filter(article => {
    const text = `${article.title} ${article.description}`.toLowerCase();
    return relevantKeywords.some(keyword => text.includes(keyword.toLowerCase()));
  });
};

// Sort news by date (newest first)
export const sortNewsByDate = (articles) => {
  return [...articles].sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
};