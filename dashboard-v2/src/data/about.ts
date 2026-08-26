export interface Role {
  title: string
  dates: string
  location?: string
  current?: boolean
  remote?: boolean
  bullets?: string[]
  blurb?: string
  tech?: string[]
}

export interface Company {
  name: string
  location?: string
  roles: Role[]
}

export interface EducationItem {
  school?: string
  title: string
  dates: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export const profile = {
  name: 'Fernando Brandao',
  headline: 'Tech Lead | React, TypeScript, Google Cloud, Firebase | AI Engineer',
  location: 'Brazil',
  email: 'fwbrandao@gmail.com',
  github: 'https://github.com/fwbrandao',
  linkedin: 'https://www.linkedin.com/in/fernando-b-b3b63021b/',
  summary: [
    'Logically and analytically minded, results-driven, and passionate about problem-solving — that path led to software engineering.',
    'As a Tech Lead at VASS, I lead a team delivering scalable, user-centric web applications with React, TypeScript, JavaScript, GCP, Firebase, and microfrontends. I started as a Software Engineer, moved to Senior, and now drive technical strategy and mentorship in a fast-paced, feature-rich environment.',
  ],
}

export const experience: Company[] = [
  {
    name: 'VASS UK&I',
    location: 'London, United Kingdom',
    roles: [
      {
        title: 'Technical Lead — Rentokil-Initial',
        dates: 'January 2025 – Present',
        location: 'London Area, United Kingdom',
        current: true,
        remote: true,
        bullets: [
          'Lead a fast-paced software development team specializing in modern web technologies.',
          'Advanced from Software Engineer to Senior Software Engineer, then Tech Lead.',
          'Bring technical expertise, strategic problem-solving, and mentoring to ship high-quality solutions.',
          'Use AI daily to accelerate development and design agentic workflows.',
        ],
        tech: ['React', 'TypeScript', 'JavaScript', 'GCP', 'Firebase', 'Microfrontends'],
      },
      {
        title: 'Senior Software Engineer',
        dates: 'January 2024 – January 2025',
        location: 'London Area, United Kingdom',
      },
      {
        title: 'Software Engineer',
        dates: 'December 2022 – December 2023',
        location: 'London, England, United Kingdom',
      },
    ],
  },
  {
    name: 'Adarga',
    location: 'London, England, United Kingdom',
    roles: [
      {
        title: 'Software Engineer',
        dates: 'July 2019 – December 2022',
        location: 'London, England, United Kingdom',
        bullets: [
          'Helped take the platform from early stages to a fully functional microfrontend architecture.',
          'Prototyped for initial customers and worked with UX to improve usability.',
          'Implemented core features from the ground up and shipped them to production.',
          'Extended and maintained the internal library of custom components.',
          'Collaborated with Back End and Data Science teams to build and improve features.',
          'Built, tested, and delivered code to production environments.',
        ],
        tech: ['Microfrontends'],
      },
      {
        title: 'Junior Software Engineer',
        dates: 'October 2018 – June 2019',
        location: 'London, England, United Kingdom',
        blurb:
          'The Adarga Knowledge Platform deploys AI to solve complex data challenges. The platform combines NLP, machine learning, and network science to understand and analyze unstructured data in context.',
      },
    ],
  },
  {
    name: 'InformedActions',
    location: 'London, England, United Kingdom',
    roles: [
      {
        title: 'Junior Software Developer',
        dates: 'June 2018 – October 2018',
        location: 'London, England, United Kingdom',
        bullets: [
          'Developed and deployed a new MVP dashboard using Angular.',
          'Maintained and improved the performance of existing software.',
          'Deployed code to Azure and managed databases.',
          'Helped design and update software databases with Node.js.',
        ],
        tech: ['Angular', 'Azure', 'Node.js'],
      },
    ],
  },
  {
    name: 'Just IT',
    location: 'London, England, United Kingdom',
    roles: [
      {
        title: 'Immersive Student — Software Engineering',
        dates: 'November 2017 – June 2018',
        location: 'London, England, United Kingdom',
      },
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Top skills',
    items: ['Artificial Intelligence (AI)', 'Retrieval-Augmented Generation (RAG)', 'Model Context Protocol (MCP)'],
  },
  {
    label: 'Languages',
    items: ['English (Native or Bilingual)', 'Portuguese (Native or Bilingual)', 'Spanish (Limited Working)'],
  },
  {
    label: 'Certifications',
    items: [
      'EF SET English Certificate 75/100 (C2 Proficient)',
      'Agentic AI',
      'Google Cloud Certification: Cloud Developer',
    ],
  },
]

export const education: EducationItem[] = [
  {
    school: 'General Assembly',
    title: 'Data Science Immersive — London UK',
    dates: 'January 2020 – May 2020',
  },
  {
    school: 'Coursera',
    title: 'Deep Learning Specialization',
    dates: 'June 2020 – October 2020',
  },
  {
    school: 'Udacity',
    title: 'React Nanodegree',
    dates: 'April 2018 – June 2018',
  },
  {
    title: 'Computer Science',
    dates: 'June 2018 – January 2020',
  },
  {
    school: 'Just IT',
    title: 'Computer Software Engineering Immersive',
    dates: 'November 2017 – June 2018',
  },
]
