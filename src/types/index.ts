export type Language = 'id' | 'en';

export interface Project {
  id: string;
  title: string;
  category: 'laravel' | 'react' | 'fullstack' | 'javascript';
  tagline: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  metrics?: string[];
  architecture?: {
    id: string;
    en: string;
  };
  keyFeatures: {
    id: string[];
    en: string[];
  };
  technologies: string[];
  image: string;
  githubUrl?: string;
  gitlabUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  role: string;
  badge?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: {
    id: string;
    en: string;
  };
  period: string;
  type: {
    id: string;
    en: string;
  };
  location: string;
  summary: {
    id: string;
    en: string;
  };
  projects: {
    name: string;
    highlights: {
      id: string[];
      en: string[];
    };
  }[];
  stack: string[];
  current?: boolean;
}

export interface SkillCategory {
  category: {
    id: string;
    en: string;
  };
  skills: {
    name: string;
    level: string; // e.g., 'Advanced', 'Proficient', 'Working Knowledge'
    experienceYears: string;
    icon: string;
    color: string;
    description: {
      id: string;
      en: string;
    };
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period: string;
  credentialUrl: string;
  isPdf?: boolean;
  category: string;
}

export interface Education {
  institution: string;
  degree: {
    id: string;
    en: string;
  };
  period: string;
  score: string;
  description: {
    id: string;
    en: string;
  };
  tags: string[];
}
