import { links } from './links'

export const profile = {
  name: 'MELANIE  ESCOBAR',
  fullName: 'Melanie Escobar',
  promptUser: 'visitor@melesco.com',
  bio: "I'm a new grad from the University of Houston looking for a full-time software engineering role. I'm interested in full-stack development, cloud, DevOps/CI/CD, and building useful apps with clean user experiences.",
  location: 'Los Angeles, CA',
  skills: [
    { skillName: 'Frontend', skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'SwiftUI'] },
    { skillName: 'Backend', skills: ['Python', 'FastAPI', 'Node.js', 'Express', 'C++', 'C#'] },
    { skillName: 'Databases', skills: ['SQL', 'MySQL', 'PostgreSQL', 'Supabase', 'Firebase', 'Cloud Firestore'] },
    { skillName: 'AI/Data', skills: ['LangChain', 'Gemini', 'OpenAI embeddings', 'Firebase AI', 'R'] },
    { skillName: 'Cloud/Tools', skills: ['Google Cloud', 'Docker', 'Git', 'GitHub', 'GitHub Actions', 'Vercel', 'Postman'] }
  ],
  experience: [
    {
      org: 'Energytech Cypher',
      role: 'Database Project Development Intern',
      dateRange: 'Feb 2026 – May 2026',
      description: 'Helped design a more scalable data system for a startup by improving record organization, data flow, and the structure used to support future applications.'
    },
    {
      org: 'IEEE-NSM',
      role: 'Lead Webmaster Officer',
      dateRange: 'Jul 2025 – May 2026',
      description: 'Built and managed the organization website, automated event updates, and led a small web team to make event information easier for students to access.'
    }
  ],
  education: [
    {
      school: 'University of Houston',
      degree: 'B.S. in Computer Science',
      minor: 'Mathematics',
      dateRange: 'Aug 2022 – May 2026',
      honors: 'Summa Cum Laude'
    }
  ],
  links: links,
  copyright: '© 2026 Made by Melanie'
}
