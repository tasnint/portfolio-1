import arc from './assets/exp-arc.jpg'
import eeco from './assets/exp-eeco.jpg'
import mcmaster from './assets/exp-mcmaster.jpg'
import lankabangla from './assets/logo-lankabangla.png'
import monarch from './assets/logo-monarch.png'

export const RESUME_URL = `${import.meta.env.BASE_URL}Tanisha-Tasnin_Resume.pdf`
export const GITHUB_URL = 'https://github.com/tasnint'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/tanishatasnin/'
export const EMAIL = 'tanisha.tasnin03@gmail.com'

export type NoteColor = 'yellow' | 'pink' | 'mint' | 'lavender' | 'peach' | 'blue'

export type Experience = {
  company: string
  role: string
  dates: string
  caption: string
  color: NoteColor
  tilt: number
  image: { src: string; alt: string; fit: 'cover' | 'logo' | 'logo-fill' }
  points: string[]
}

// Newest first. Rows alternate photo-left / photo-right.
export const EXPERIENCES: Experience[] = [
  {
    company: 'The Applied Reports Company',
    role: 'Full Stack Software Developer',
    dates: 'May – Aug 2026',
    caption: 'ARC, summer ’26',
    color: 'yellow',
    tilt: 1,
    image: { src: arc, alt: 'The Applied Reports Company website homepage', fit: 'cover' },
    points: [
      'When I joined ARC, it was a team of 6, and I became member number 7. The simplest way to describe ARC: an AI B2B SaaS company building for the AEC (architecture, engineering and construction) industry.',
      'Everything was new: the product, the tech stack (has anyone else heard of Elixir??) and, most importantly, the market we were stepping into.',
      'In three and a half months, I shipped over 30,000 lines of code, built 2 end-to-end features, wrote a product vision memo and somehow stayed (mostly) sane.',
      'One day I was a prompt engineer, the next I was doing UI/UX. Some days I sat with our customer service team to brainstorm new features, then went off and built them. It was scary, thrilling and completely insane!',
      'Somewhere in the middle of it all, I fell in love with the vast world of AI and machine learning and all of its untapped potential.',
    ],
  },
  {
    company: 'EECOMOBILITY Inc.',
    role: 'Software Developer',
    dates: 'May 2025 – May 2026',
    caption: 'EECOMOBILITY, ’25–’26',
    color: 'pink',
    tilt: -1,
    image: { src: eeco, alt: 'EECOMOBILITY website homepage', fit: 'cover' },
    points: [
      'EECOMOBILITY was my first ever co-op in Canada. And it was quite interesting.',
      'This was also a SaaS company. However, our product interacted with batteries and there was a lot of hardware involved as well.',
      'Was it fully related to the niche I was interested in? No. But I learned so much.',
      'I designed an entire API system and decoupled our software.',
      'I used Python and hit so many drywalls trying to optimize latency in the face of Global Interpreter Locks.',
      'While EECOMOBILITY may have not been exactly what I had expected, it was exactly what I needed to find my footing and true passion in tech.',
      'Will forever be grateful to them for taking a chance on a nervous little girl who was really trying to put herself out there.',
    ],
  },
  {
    company: 'Engineering Faculty, McMaster University',
    role: 'International Recruitment & Events Assistant',
    dates: 'October 2024 – April 2025',
    caption: 'Mac, ’24–’25',
    color: 'lavender',
    tilt: 0.8,
    image: { src: mcmaster, alt: 'University Hall at McMaster University', fit: 'cover' },
    points: [
      'This was my first real part-time job in Canada, and it was incredible!',
      'I got to connect with the student community and contribute to initiatives that directly shaped their experience at Mac.',
      'The highlight was definitely hosting the in-person workshops. I met so many people from different walks of life, all starting their journey at McMaster. Knowing my work was helping them through such a big transition was incredibly rewarding.',
      'Unlike most admin jobs, even the administrative tasks were genuinely interesting. I researched competitors and presented my findings to our recruitment team, and that research went on to shape our recruitment strategy and, with it, the future of so many students.',
    ],
  },
  {
    company: 'LankaBangla Securities',
    role: 'IT Department',
    dates: 'June – August 2024',
    caption: 'LankaBangla, ’24',
    color: 'mint',
    tilt: -0.8,
    image: { src: lankabangla, alt: 'LankaBangla Finance logo', fit: 'logo' },
    points: [
      'Contributed to the back-end of a full-stack task manager using Spring Boot, and MySQL stack incorporating DevOps and Software Development Life Cycle principles',
      'Processed and extracted large datasets from the financial portal using R and Ablebits Tools in Excel and visualized using PowerBI to identify trends and calculate metrics for reports',
      'Automated the delivery of client workbooks using VBA scripting in Excel, improving on-time deliveries by 25%',
    ],
  },
  {
    company: 'Monarch Mart',
    role: 'Software Developer Intern',
    dates: 'May – August 2024',
    caption: 'Monarch Mart, ’24',
    color: 'peach',
    tilt: 1,
    image: { src: monarch, alt: 'Monarch Mart logo', fit: 'logo-fill' },
    points: [
      'Audited the company website’s UI, and implemented changes in React and CSS that are projected to speed up customer checkout times by 20%',
      'Worked on REST API projects using Nest.js and Next.js to support microservice architecture',
    ],
  },
]

export type SkillGroup = { title: string; color: NoteColor; pin: [string, string]; tilt: number; skills: string[] }

export const SKILLS: SkillGroup[] = [
  { title: 'AI / ML', color: 'yellow', pin: ['#F2675B', '#C3322A'], tilt: -3, skills: ['Python', 'PyTorch', 'NumPy', 'TensorFlow', 'scikit-learn'] },
  { title: 'Databases', color: 'pink', pin: ['#5B93EE', '#2457B8'], tilt: 2, skills: ['SQL', 'MongoDB', 'GraphQL', 'PostgreSQL', 'Firebase'] },
  { title: 'Functional Programming', color: 'mint', pin: ['#F5C04A', '#C98D12'], tilt: -1.5, skills: ['Elixir', 'Phoenix', 'Ash'] },
  { title: 'Web & Mobile', color: 'lavender', pin: ['#45C08A', '#1E8458'], tilt: 2.5, skills: ['JavaScript', 'TypeScript', 'React', 'Flutter', 'Solidity', 'Tailwind'] },
  { title: 'Backend & Systems', color: 'peach', pin: ['#A47BEA', '#6A3FBF'], tilt: -2, skills: ['Java', 'Spring Boot', 'Node.js', 'Go', 'C', 'C++'] },
  { title: 'Cloud & DevOps', color: 'blue', pin: ['#F58A45', '#C2561A'], tilt: 1.5, skills: ['Docker', 'Kubernetes', 'Azure', 'GCP', 'Linux'] },
]

export type Doodle = 'console' | 'fire' | 'balance' | 'pill' | 'dish' | 'coral'

export type Project = {
  title: string
  date: string
  description: string
  repo: string
  doodle: Doodle
  tab: string
  tape: string
  mark: string
  tilt: number
}

// Newest first, two per notebook spread.
export const PROJECTS: Project[] = [
  { title: 'ConsoleViz', date: 'Mar 2026', description: 'A Go command-line tool that turns data into live terminal dashboards, with bar charts, plots and tables.', repo: 'tasnint/console-viz', doodle: 'console', tab: '#FFE97A', tape: 'rgba(255, 210, 80, 0.72)', mark: 'rgba(255, 226, 110, 0.85)', tilt: -2 },
  { title: 'Wild-or-Fire?', date: 'Jan 2026', description: 'Deep learning wildfire detection that compares CNN architectures to classify images as Fire or No Fire.', repo: 'tasnint/wildfire-detection-4AL3-project', doodle: 'fire', tab: '#FFD0AE', tape: 'rgba(255, 165, 110, 0.7)', mark: 'rgba(255, 196, 150, 0.85)', tilt: 2 },
  { title: 'PolyBalance', date: 'Dec 2025', description: 'A Go HTTP load balancer with round-robin, least-connections and latency-based routing, plus a live dashboard.', repo: 'tasnint/polyBalance', doodle: 'balance', tab: '#DCCEFF', tape: 'rgba(185, 160, 245, 0.7)', mark: 'rgba(205, 185, 255, 0.85)', tilt: 1.5 },
  { title: 'Pillmaxxer', date: 'Apr 2025', description: 'A team-built mobile app that helps people stay on top of their medication, powered by a Java backend.', repo: 'hydrowoxy/Pillmaxxer', doodle: 'pill', tab: '#FFC8DA', tape: 'rgba(255, 150, 190, 0.7)', mark: 'rgba(255, 182, 206, 0.85)', tilt: -1.5 },
  { title: 'What’s That Dish', date: 'Mar 2025', description: 'The software design for an Android app that identifies dishes from a photo, a description or an ingredient list.', repo: 'tasnint/3A04-Project', doodle: 'dish', tab: '#C9F0D7', tape: 'rgba(130, 210, 165, 0.7)', mark: 'rgba(165, 228, 190, 0.85)', tilt: -2 },
  { title: 'Coral Shield', date: 'May 2024', description: 'A synthetic biology project protecting coral reefs from oxybenzone, the sunscreen ingredient behind coral bleaching.', repo: 'tasnint/CoralShield', doodle: 'coral', tab: '#CFE6FC', tape: 'rgba(130, 185, 240, 0.7)', mark: 'rgba(160, 205, 248, 0.85)', tilt: 2 },
]
