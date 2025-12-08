export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  description: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

export interface SocialLinks {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}