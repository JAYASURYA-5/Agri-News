# Agriculture Daily News App

Real-time agriculture news application built with React.

## Features
- 🌍 Multi-country news (India, USA, China, Brazil, Australia)
- 📍 State/Province specific filtering
- 🌐 Multi-language support (10 languages including Tamil, Hindi, Telugu)
- 🔄 Real-time news updates
- 📱 Responsive design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get NewsAPI Key
1. Visit https://newsapi.org/register
2. Sign up for free account
3. Copy your API key

### 3. Configure API Key
Create a `.env` file in the root directory:
```
REACT_APP_NEWS_API_KEY=your_api_key_here
```

### 4. Run the Application
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure
```
src/
├── components/        # React components
├── config/           # Configuration files
├── services/         # API services
├── utils/            # Utility functions
├── App.js            # Main app component
└── index.js          # Entry point
```

## Technologies Used
- React 18
- Tailwind CSS
- Lucide React (Icons)
- NewsAPI.org

## License
MIT