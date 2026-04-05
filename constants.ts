import { Experience, Project, SkillCategory, Education, SocialLinks } from './types';

export const SOCIAL_LINKS: SocialLinks = {
  email: "patyalanurag222@gmail.com",
  phone: "8091712330",
  linkedin: "linkedin.com/in/anuragpatial",
  github: "github.com/AnuragPatial",
  location: "Mohali, Punjab"
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "1",
    role: "Associate Web Developer",
    company: "KasWebtech Solutions Pvt. Ltd.",
    period: "06/2025 – Present",
    location: "Mohali",
    description: [
      "Built n8n automation workflows that reduced repetitive work and saved team time.",
      "Developed web applications with React.js and Node.js, focusing on clean and reliable code.",
      "Tracked down and fixed website issues to keep pages running smoothly.",
      "Created Shopify apps that added useful features and improved store functionality."
    ]
  },
  {
    id: "2",
    role: "Software Developer Intern",
    company: "Raymach Technologies",
    period: "08/2024 – 02/2025",
    location: "Dehradun",
    description: [
      "Tech Stack: ReactJS, NodeJS, Tailwind CSS, Javascript, MySQL.",
      "Built User Dashboard used by 1,200+ users, improving session time by 25%.",
      "Fixed 20+ bugs and performance issues.",
      "Cut page load time by 15%."
    ]
  },
  {
    id: "3",
    role: "Apprentice Developer: Blockchain/React",
    company: "Antier Solutions",
    period: "07/2023 – 12/2023",
    location: "Mohali",
    description: [
      "Deployed smart contract for NFT platform; processed 60+ test transactions.",
      "Built UI for NFT listings and wallet actions; tested across 3 device types.",
      "Created lottery dApp that handled 100+ unique entries and drew winners correctly."
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "nft-marketplace",
    name: "NFT Marketplace",
    techStack: ["ReactJS", "NodeJS", "Solidity", "Ethereum"],
    description: [
      "Created an NFT marketplace using ReactJS and NodeJS.",
      "Wrote Solidity smart contracts to handle transactions.",
      "Tested 10 cases to ensure proper functionality."
    ],
    githubUrl: "https://github.com/AnuragPatial/NftMarketplace",
    liveUrl: ""
  },
  {
    id: "kiosk-food-app",
    name: "Kiosk Food Ordering System",
    techStack: ["ReactJS", "NodeJS", "System Design"],
    description: [
      "Designed and developed a self-service kiosk food ordering interface for a client.",
      "Created an intuitive frontend flow enabling users to browse menu, customize items, and place orders.",
      "Architected the complete backend order processing flow, including order creation, status tracking, and management.",
      "Integrated payment gateway flow to handle secure and seamless transactions.",
      "Defined the end-to-end business logic from order placement to payment confirmation and processing.",
      "Focused on user experience, ensuring fast navigation and minimal friction in high-traffic kiosk environments."
    ],
    githubUrl: "https://github.com/AnuragPatial/burgertech-kiosk",
    liveUrl: "https://burgertech-kiosk.vercel.app"
  },
  {
    id: "restaurant-web",
    name: "Modern Restaurant Web Design",
    techStack: ["HTML", "CSS", "Javascript", "ReactJS"],
    description: [
      "Designed and developed the website layout using HTML and CSS.",
      "Implemented interactive features with JavaScript for enhanced user engagement.",
      "Built dynamic components and pages using ReactJS.",
      "Ensured cross-browser compatibility and responsiveness."
    ],
    githubUrl: "https://github.com/AnuragPatial/Restaurant-s-Website",
    liveUrl: "restaurant-s-website.vercel.app"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["JavaScript", "ReactJS", "HTML", "CSS", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["NodeJS", "Express", "Solidity", "Ethereum"]
  },
  {
    category: "Database & Tools",
    skills: ["MySQL", "Git", "GitHub", "MongoDB"]
  },
  {
    category: "Automation",
    skills: ["n8n (Workflow Automation)", "Integrations"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Bachelors Computer Science & Engineering",
    institution: "Chitkara University",
    year: "2020 – 2024",
    score: "CGPA: 8.82"
  },
  {
    degree: "XII, Non-Medical",
    institution: "Govt. Sen. Sec. School, Kangoo, HP",
    year: "2020",
    score: "Grade: 81.8 %"
  },
  {
    degree: "X",
    institution: "T.R.D.A.V. Public School, Kangoo, HP",
    year: "2018",
    score: "Grade: 70.1 %"
  }
];

export const RESUME_CONTEXT = `
You are an AI assistant for Anurag Patial's portfolio website. You have the following context about Anurag:

Contact: ${JSON.stringify(SOCIAL_LINKS)}
Experience: ${JSON.stringify(EXPERIENCE_DATA)}
Skills: ${JSON.stringify(SKILLS_DATA)}
Projects: ${JSON.stringify(PROJECTS_DATA)}
Education: ${JSON.stringify(EDUCATION_DATA)}

Answer questions about Anurag's experience, skills, and projects as if you are him or his personal assistant. Be professional, concise, and helpful. If asked about technologies, highlight his proficiency in React, Node.js, and Blockchain.
`;