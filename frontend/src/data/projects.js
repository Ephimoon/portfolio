export const projects = [
  {
    name: 'Spara AI Video Chatbot',
    dateRange: 'Jan – May 2025',
    aliases: ['spara', 'ai', 'chatbot', 'video', 'project 1'],
    description:
      'A chatbot website built for Spara that lets potential customers ask questions and get helpful answers with product videos when a video is relevant.',
    problemSolved:
      'Instead of making visitors search through product pages or watch demos on their own, the chatbot guides them through a conversation and brings up the right product video when it helps.',
    myContribution:
      'I worked on the chat experience, saved conversations, backend connection, testing, planning, and the logic that helped the chatbot understand follow-up questions.',
    technicalStory:
      'The project used a React frontend, FastAPI backend, Supabase database, OpenAI embeddings, Gemini, and Google Cloud Storage. When a user sent a message, the backend compared the message to stored product information, decided whether the match was strong enough to show a video, generated an AI response, saved the conversation, updated the chat score, and returned the answer plus an optional video URL.',
    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'Supabase',
      'PostgreSQL',
      'OpenAI embeddings',
      'Gemini',
      'LangChain',
      'Google Cloud Storage',
      'Docker',
      'Jest',
      'pytest'
    ],
    links: {
      github: 'Private Repo',
      live: ''
    }
  },
  {
    name: 'FoodLens AI Nutrition Tracker',
    dateRange: 'Oct – Dec 2025',
    aliases: ['foodlens', 'food', 'lens', 'nutrition', 'ios', 'project 2'],
    description:
      'An iPhone nutrition app that helps users log meals, track calories and macros, follow weight progress, and get AI-generated nutrition advice.',
    problemSolved:
      'Many food tracking apps show numbers without explaining what they mean. FoodLens helps users connect their meals, goals, trends, and habits into clearer nutrition feedback.',
    myContribution:
      'I designed the app screens and built most of the SwiftUI app flow, including sign in, onboarding, user profiles, goal setup, trends, settings, and AI coaching.',
    technicalStory:
      'The app used SwiftUI, Firebase Auth, Cloud Firestore, Firebase AI, USDA FoodData Central, Open Food Facts, Swift Charts, and UserDefaults. User accounts and profile goals were stored with Firebase, food data came from search and barcode sources, logged meals and weight entries powered the trends dashboard, and Gemini returned structured JSON that the app decoded into insight cards and next steps.',
    stack: [
      'Swift',
      'SwiftUI',
      'Firebase Auth',
      'Cloud Firestore',
      'Firebase AI',
      'Gemini',
      'Swift Charts',
      'USDA FoodData Central API',
      'Open Food Facts API',
      'UserDefaults',
      'Figma'
    ],
    links: {
      github: 'https://github.com/monuorah/FoodLens',
      live: ''
    }
  },
  {
    name: 'IEEE-NSM Website',
    dateRange: 'Jul 2025 – Present',
    aliases: ['ieee', 'nsm', 'website', 'webmaster', 'project 3'],
    description:
      'A live website for the University of Houston IEEE-NSM chapter where students can find events, join the organization, view officers, and access updates.',
    problemSolved:
      'The organization needed one official place for event information instead of relying only on Instagram, Discord, announcements, or word of mouth.',
    myContribution:
      'I led the web team and built most of the public website, including the homepage, events page, layout, mobile navigation, event update flow, calendar integration, deployment, and early Supabase setup.',
    technicalStory:
      'The current site uses React, Vercel, Google Forms, Google Sheets, Apps Script, and Google Calendar. Officers can submit or edit event information through Google tools, Apps Script turns the data into JSON, React separates events into upcoming and previous sections, and the custom calendar merges Google Calendar events with website metadata. The next version is moving toward Supabase Auth, Database, and Storage for an internal officer dashboard.',
    stack: [
      'React',
      'JavaScript',
      'React Router',
      'CSS',
      'Vercel',
      'Google Forms',
      'Google Sheets',
      'Google Apps Script',
      'Google Calendar API',
      'react-big-calendar',
      'date-fns',
      'Supabase'
    ],
    links: {
      github: 'https://github.com/Ephimoon/Ieee-nsm',
      live: 'https://www.ieee-nsm.com/'
    }
  },
  {
    name: 'Museum Management Web App',
    dateRange: 'Aug – Nov 2024',
    aliases: ['museum', 'management', 'collection', 'mfa', 'project 4'],
    description:
      'A full-stack museum management app for collections, exhibitions, events, tickets, gift shop inventory, memberships, users, and reports.',
    problemSolved:
      'Museums have many connected workflows, so this app brings collection management, sales, memberships, events, and reporting into one role-based system.',
    myContribution:
      'I worked on frontend pages, backend routes, database design, SQL queries, role-based visibility, art and artwork management, membership reports, event reports, and image handling.',
    technicalStory:
      'The project used React, Express, and MySQL. The database connected users, roles, artists, artworks, departments, exhibitions, tickets, memberships, gift shop items, events, and transactions through foreign keys and relationship tables. Reports used SQL joins and filters, images were uploaded through Express and stored as MySQL BLOBs, and role-based pages gave admins, staff, customers, and members different views of the system.',
    stack: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MySQL',
      'SQL',
      'mysql2',
      'Multer',
      'bcrypt',
      'jsPDF',
      'Azure Static Web Apps',
      'Vercel'
    ],
    links: {
      github: 'https://github.com/Ephimoon/MuseumDB',
      live: 'Not active anymore, previously hosted on Azure'
    }
  }
]