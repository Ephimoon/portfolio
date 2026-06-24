// description = quick summary
// userFlow = how the user interacts with the project
// problemSolved = why the project matters
// myContribution = what I personally worked on
// technicalStory = how the project works technically
// stack = technologies used
// links = github and live links

export const projects = [
  {
    name: 'Spara AI Video Chatbot',
    dateRange: 'Jan – May 2025',
    aliases: ['spara', 'ai', 'chatbot', 'video', 'project 1'],
    description:
      'A chatbot website built for Spara that lets potential customers ask questions and get helpful answers with product videos when a video is relevant.',
    userFlow: 
    'A visitor starts a chat, asks a product question, and gets a conversational answer. If their question strongly matches a product, the chatbot also shows the most relevant product video, saves the conversation, and keeps enough context to answer follow-up questions.',
    problemSolved:
      'Instead of making visitors search through product pages or watch demos on their own, the chatbot turns product discovery into a guided conversation and supports the sponsor’s sales use case by helping identify more engaged buyers.',
    myContribution:
      'I worked on the chat experience, saved conversations, backend connection, testing, planning, and the logic that helped the chatbot understand follow-up questions.',
    technicalStory:
      'The project used a React frontend, FastAPI backend, Supabase database, OpenAI embeddings, Gemini, and Google Cloud Storage. When a user sent a message, the backend generated a 1536-dimensional embedding, compared it against product records, checked confidence thresholds, generated an AI response, saved the conversation, updated the chat score, and returned the answer plus an optional video URL. The final prototype included saved chats, summaries, title generation, video fallback handling, and 100+ frontend/backend test cases.',
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
    userFlow:
      'A user signs in, completes onboarding, sets nutrition goals, then logs meals through food search or barcode scanning. As they track meals and weight over time, the app shows trends and turns their nutrition data into AI-generated coaching cards.',
    problemSolved:
      'Many food tracking apps show numbers without explaining what they mean. FoodLens helps users connect meals, goals, trends, and habits into clearer nutrition feedback instead of only showing raw calorie totals.',
    myContribution:
      'I designed the app screens and built most of the SwiftUI app flow, including sign in, onboarding, user profiles, goal setup, trends, settings, and AI coaching.',
    technicalStory:
      'The app used SwiftUI, Firebase Auth, Cloud Firestore, Firebase AI, USDA FoodData Central, Open Food Facts, Swift Charts, and UserDefaults. Firebase handled authentication and profile goals, 2 food data sources powered search and barcode logging, saved meals and weight entries powered the trends dashboard, and Gemini returned structured JSON that the app decoded into insight cards and next steps. The app included 10+ completed iOS app flows such as onboarding, authentication, food search, barcode scanning, meal logging, weight tracking, goal setting, trends visualization, AI insights, and profile management, and worked end-to-end on simulator and real device.',
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
    userFlow:
      'A student visits the site to learn about IEEE-NSM, view upcoming events, open event details, add events to Google Calendar, become a member, or find officer/contact links. Officers can update event information through Google tools while the site displays the latest public event data.',
    problemSolved:
      'The organization needed one official place for event information instead of relying only on Instagram, Discord, announcements, or word of mouth. The site became a live resource where students can check events, join the organization, and find officer/contact links.',
    myContribution:
      'I led the web team and built most of the public website, including the homepage, events page, layout, mobile navigation, event update flow, calendar integration, deployment, and early Supabase setup.',
    technicalStory:
      'The current site uses React, Vercel, Google Forms, Google Sheets, Apps Script, and Google Calendar. Officers can submit or edit event information through Google tools, Apps Script turns the data into JSON, React filters published events, separates upcoming and previous sections, and refreshes event data every 20 seconds. The custom calendar merges Google Calendar events with website metadata, and the next version is moving toward Supabase Auth, Database, and Storage for an internal officer dashboard.',
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
    userFlow:
      'A public user can browse museum content, buy tickets, shop gift items, or manage membership. Admins and staff sign in to manage artworks, artists, exhibitions, events, inventory, users, reports, and role-based museum workflows from one system.',
    problemSolved:
      'Museums have many connected workflows, so this app brings collection management, sales, memberships, events, inventory, and reporting into one role-based system instead of separating those operations across disconnected tools.',
    myContribution:
      'I worked on frontend pages, backend routes, database design, SQL queries, role-based visibility, art and artwork management, membership reports, event reports, and image handling.',
    technicalStory:
      'The project used React, Express, and MySQL. The database connected users, 4 role types, artists, artworks, departments, exhibitions, tickets, memberships, gift shop items, events, and transactions through foreign keys and relationship tables. The system supported 20+ workflows including artwork cataloging, artist management, exhibition scheduling, ticket sales, membership enrollment, membership renewal, gift shop inventory tracking, purchase transactions, event creation, event registration, department assignment, role-based access control, user account management, report generation, sales analytics, attendance tracking, inventory updates, image uploads, artwork search/filtering, and data export. Reports used SQL joins with date range, month, year, and single-day filters, images were uploaded through Express and stored as MySQL BLOBs, and role-based pages gave admins, staff, customers, and members different views of the system.',
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