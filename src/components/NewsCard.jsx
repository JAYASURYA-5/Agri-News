import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

const NewsCard = ({ article }) => {
  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        {/* Source */}
        <div className="text-xs text-gray-500 mb-3">
          <span className="font-medium">{article.source.name}</span>
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {article.title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description || 'Click to read the full article'}
        </p>
        
        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
        >
          Read full article
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;