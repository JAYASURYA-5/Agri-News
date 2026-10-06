# 🌾 Agri-News – Agriculture Daily News App

**Agri-News** is a modern and responsive agriculture news application designed to provide users with the latest agricultural news and updates from different countries and regions.

The application allows users to explore agriculture-related news based on **country, state/province, and language**, making agricultural information more accessible to farmers, students, researchers, and agriculture enthusiasts.

---

## 📌 Project Overview

Agriculture is strongly influenced by changes in weather, markets, government policies, technology, farming practices, and global agricultural developments.

Finding relevant agricultural news from different sources can be difficult. **Agri-News** provides a centralized platform where users can discover agriculture-related news through an easy-to-use web interface.

The application uses **NewsAPI.org** to retrieve news articles and presents them through a responsive React-based interface.

---

## 🎯 Objectives

- 🌾 Provide easy access to agricultural news.
- 📰 Display the latest agriculture-related news.
- 🌍 Support news from multiple countries.
- 📍 Provide state/province-specific filtering.
- 🌐 Support multiple languages.
- 📱 Provide a responsive user experience.
- 🔄 Retrieve updated news through an external news API.
- 🎓 Help students, farmers, and agriculture enthusiasts stay informed.

---

## ✨ Key Features

### 🌍 Multi-Country News

Users can explore agriculture news from different countries, including:

- 🇮🇳 India
- 🇺🇸 USA
- 🇨🇳 China
- 🇧🇷 Brazil
- 🇦🇺 Australia

These countries are currently supported by the project.

---

### 📍 State / Province Filtering

The application provides location-based filtering so users can find agriculture-related information relevant to a particular state or province.

This makes the news experience more useful for users looking for regional agricultural developments.

---

### 🌐 Multi-Language Support

The application supports multiple languages, including:

- 🇬🇧 English
- 🇮🇳 Tamil
- 🇮🇳 Hindi
- 🇮🇳 Telugu
- And additional supported languages

The repository currently describes support for **10 languages**.

---

### 🔄 Real-Time News Updates

Agri-News connects with **NewsAPI.org** to retrieve current news articles.

Users can access updated agriculture-related news without manually adding articles to the application.

---

### 📱 Responsive Design

The application is designed to work across different devices:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

---

### 🎨 Modern User Interface

The application uses:

- React components
- Tailwind CSS
- Lucide React icons
- Responsive layouts
- Clean news-card presentation

to create a simple and modern user experience.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend development |
| **Tailwind CSS** | Styling and responsive design |
| **Lucide React** | UI icons |
| **NewsAPI.org** | Agriculture news data |
| **JavaScript** | Application logic |
| **HTML5** | Page structure |
| **CSS** | Visual styling |
| **Git & GitHub** | Version control |

The technologies listed above are based on the repository's current README and project configuration.

---

## 🏗️ Application Architecture

```text
                  ┌─────────────────────┐
                  │        User         │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Agri-News Website  │
                  │   React Frontend    │
                  └──────────┬──────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
         Country          Location        Language
         Filter           Filter           Filter
             │               │               │
             └───────────────┼───────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    NewsAPI      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Agriculture     │
                    │ News Articles   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ User Interface  │
                    └─────────────────┘
```

---

## 🔄 Application Workflow

```text
Start
  │
  ▼
Open Agri-News
  │
  ▼
Select Country
  │
  ▼
Select State / Province
  │
  ▼
Select Language
  │
  ▼
Request Agriculture News
  │
  ▼
NewsAPI
  │
  ▼
Retrieve Latest News
  │
  ▼
Display News Articles
  │
  ▼
Read Agriculture News
```

---

## 📂 Project Structure

The repository uses a React application structure with components, configuration, services, utilities, and application entry files.

```text
Agri-News/
│
├── public/
│   └── Public assets
│
├── src/
│   ├── components/
│   │   └── Reusable React components
│   │
│   ├── config/
│   │   └── Application configuration
│   │
│   ├── services/
│   │   └── API and news services
│   │
│   ├── utils/
│   │   └── Utility functions
│   │
│   ├── App.js
│   │   └── Main application component
│   │
│   └── index.js
│       └── Application entry point
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Requirements

Before running the project, make sure you have:

- **Node.js**
- **npm**
- **Git**
- **NewsAPI API Key**
- A modern web browser
- **Visual Studio Code** or another code editor

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JAYASURYA-5/Agri-News.git
```

### 2. Navigate to the Project

```bash
cd Agri-News
```

### 3. Install Dependencies

```bash
npm install
```

---

## 🔑 NewsAPI Configuration

Agri-News uses **NewsAPI.org** to retrieve news articles.

Create an account on NewsAPI and generate an API key.

Then create a `.env` file in the root directory:

```env
REACT_APP_NEWS_API_KEY=your_api_key_here
```

Replace:

```text
your_api_key_here
```

with your actual NewsAPI key.

> ⚠️ Never upload your real API key to GitHub.

---

## ▶️ Run the Application

Start the development server:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:3000
```

The repository's existing setup instructions use `npm install`, an environment variable named `REACT_APP_NEWS_API_KEY`, and `npm start`.

---

## 📰 News Retrieval Process

The application follows this process to retrieve news:

```text
User Selection
      │
      ▼
Country / Region
      │
      ▼
News Search Parameters
      │
      ▼
NewsAPI Request
      │
      ▼
NewsAPI Response
      │
      ▼
Process News Data
      │
      ▼
Display News Cards
```

---

## 👨‍🌾 Target Users

Agri-News can be useful for:

### 🌾 Farmers

Access agricultural developments, farming-related information, and regional news.

### 🎓 Students

Follow agriculture-related developments for academic learning and research.

### 🔬 Researchers

Stay updated with developments and trends in agriculture.

### 🏢 Agricultural Organizations

Monitor agricultural news and regional developments.

### 🌱 Agriculture Enthusiasts

Explore current developments in the agriculture sector.

---

## 🌟 Benefits

- 📰 Centralized agriculture news platform
- 🌍 Multi-country coverage
- 📍 Regional filtering
- 🌐 Multilingual support
- 🔄 Updated news through API integration
- 📱 Responsive interface
- 🎨 Simple and clean UI
- ⚡ Easy to use
- 🌾 Agriculture-focused information

---

## 🔮 Future Enhancements

The project can be further improved with:

- 🤖 AI-powered agriculture news summarization
- 🧠 Personalized news recommendations
- 🔔 Breaking-news notifications
- 🌦️ Weather information
- 📈 Agricultural market prices
- 💰 Crop price tracking
- 🌾 Government agriculture schemes
- 📊 Agriculture market analytics
- 🎙️ Voice-based news search
- 🔖 Bookmark and save articles
- 🔍 Advanced news search
- 👤 User accounts
- 🌐 Additional Indian regional languages
- 📱 Progressive Web App support
- 📴 Offline article reading

---

## 🎓 Educational Value

This project demonstrates practical knowledge of:

- React.js development
- API integration
- REST API consumption
- Responsive web design
- Component-based architecture
- Tailwind CSS
- JavaScript
- Multilingual application development
- Git and GitHub
- Environment variable configuration

---

## 📈 Project Outcome

Agri-News provides a centralized and responsive platform for accessing agricultural news from different regions.

By combining **React, NewsAPI, location filtering, and multilingual support**, the application makes agriculture-related information easier to discover and access.

---

## 👨‍💻 Developer

**Jayasurya K**

GitHub:  
https://github.com/JAYASURYA-5

---

## 📌 Repository

**Agri-News**

https://github.com/JAYASURYA-5/Agri-News

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

# 🌾 Agri-News

**Stay Updated • Stay Informed • Grow Better**

Built with ❤️ using **React, Tailwind CSS, and NewsAPI**.
