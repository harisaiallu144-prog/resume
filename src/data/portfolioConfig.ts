/**
 * Portfolio Configuration for Allu Kumarswami
 * 
 * Centralized, fully-typed personal information data store.
 * You can edit all text, links, and project descriptions here.
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  metrics?: string;
  highlights: string[];
}

export interface SkillCategory {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
}

export interface JourneyMilestone {
  stage: string;
  period: string;
  title: string;
  category: string;
  description: string;
  points: string[];
}

export interface PortfolioConfig {
  personal: {
    fullName: string;
    heroDisplayText: string;
    monogram: string;
    roles: string[];
    primaryTitle: string;
    tagline: string;
    email: string;
    linkedin: string;
    github: string;
    location: string;
    avatarPhoto: string;
    secondaryPhoto: string;
  };
  hero: {
    subtitle: string;
    hintText: string;
    revealButtonText: string;
    resetButtonText: string;
    particleCountDesktop: number;
    particleCountMobile: number;
  };
  about: {
    sectionNumber: string;
    heading: string;
    quote: string;
    introParagraph1: string;
    introParagraph2: string;
    introParagraph3: string;
    tagline: string;
  };
  skills: {
    sectionNumber: string;
    heading: string;
    categories: SkillCategory[];
  };
  projects: {
    sectionNumber: string;
    heading: string;
    items: ProjectItem[];
  };
  journey: {
    sectionNumber: string;
    heading: string;
    milestones: JourneyMilestone[];
  };
  philosophy: {
    sectionNumber: string;
    quoteLines: string[];
    description: string;
  };
  contact: {
    sectionNumber: string;
    heading: string;
    subtitle: string;
    social: {
      platform: string;
      label: string;
      url: string;
    }[];
  };
  footer: {
    monogram: string;
    name: string;
    title: string;
    roleDescription: string;
    closingStatement: string;
  };
}

export const initialPortfolioConfig: PortfolioConfig = {
  personal: {
    fullName: "Allu Kumarswami",
    heroDisplayText: "ALLU KUMARSWAMI",
    monogram: "AKS",
    roles: [
      "B.Tech Student",
      "Aspiring AI Engineer",
      "Creative Technology Enthusiast",
      "Future Software Developer"
    ],
    primaryTitle: "Aspiring AI Engineer & Creative Developer",
    tagline: "Turning curiosity into code, and ideas into intelligent solutions.",
    email: "harisaiallu144@gmail.com",
    linkedin: "https://www.linkedin.com/in/harisai-allu-221a44434",
    github: "https://github.com/harisaiallu144-prog",
    location: "India",
    avatarPhoto: "/assets/aistudio/WhatsApp_Image_2026-11-08_at_11.47.38_c3d6ab0a.jpeg",
    secondaryPhoto: "/assets/photo_natural.jpg",
  },
  hero: {
    subtitle: "Cinematic 3D Particle Sculpture & Digital Experience",
    hintText: "Move your cursor\nto see the magic",
    revealButtonText: "REVEAL →",
    resetButtonText: "← BACK TO DOTS",
    particleCountDesktop: 60000,
    particleCountMobile: 25000,
  },
  about: {
    sectionNumber: "01",
    heading: "THE MIND BEHIND THE CODE.",
    quote: "Curiosity is where every great idea begins.",
    introParagraph1: "I'm Allu Kumarswami a B.Tech student passionate about software development, artificial intelligence, and creative problem-solving.",
    introParagraph2: "I'm currently exploring Python programming, web development, and Generative AI.",
    introParagraph3: "I enjoy turning ideas into practical projects, participating in hackathons and ideathons, and discovering new ways technology can make an impact.",
    tagline: "Curiosity is where every great idea begins.",
  },
  skills: {
    sectionNumber: "02",
    heading: "EXPLORING THE FUTURE THROUGH TECHNOLOGY.",
    categories: [
      {
        number: "01",
        title: "PROGRAMMING",
        subtitle: "Core Foundations & Algorithmic Logic",
        description: "Exploring Python programming and developing a strong foundation in software development.",
        topics: [
          "Python 3.x Fundamentals",
          "Data Structures & Control Flow",
          "Object-Oriented Programming (OOP)",
          "Problem Solving & Logic Building"
        ]
      },
      {
        number: "02",
        title: "WEB DEVELOPMENT",
        subtitle: "Interactive Digital Interfaces",
        description: "Learning to create clean, responsive, and user-friendly websites using HTML and CSS.",
        topics: [
          "Semantic HTML5 & Modern Layouts",
          "Responsive CSS3 & Flexbox / Grid",
          "Clean Visual Hierarchy",
          "Modern Frontend Workflows"
        ]
      },
      {
        number: "03",
        title: "GENERATIVE AI",
        subtitle: "Intelligent Systems & Neural Models",
        description: "Exploring generative AI tools and understanding how artificial intelligence can be applied to real-world problems.",
        topics: [
          "LLM Prompt Engineering & Prompt Tuning",
          "Multimodal AI Workflows",
          "AI-Assisted Rapid Prototyping",
          "Real-World Problem Identification"
        ]
      }
    ]
  },
  projects: {
    sectionNumber: "04",
    heading: "IDEAS TURNED INTO PROJECTS.",
    items: [
      {
        id: "voter-checker",
        number: "01",
        title: "VOTER ELIGIBILITY CHECKER",
        category: "Logic & Decision Systems",
        description: "A simple application that determines whether a person meets the required voting age based on their age.",
        longDescription: "An interactive civic eligibility verification tool that validates user age constraints against legal voting criteria, offering instant feedback and status determination with clean input handling.",
        techStack: ["Python", "Control Flow", "Input Validation", "CLI / Web UI"],
        image: "/src/assets/images/project_voter_checker_1794117520549.jpg",
        githubUrl: "https://github.com/harisaiallu144-prog",
        demoUrl: "#projects",
        metrics: "Instant Validation",
        highlights: [
          "Age boundary condition verification",
          "Defensive input error handling",
          "Clear visual eligibility states"
        ]
      },
      {
        id: "calculator-app",
        number: "02",
        title: "CALCULATOR",
        category: "Software Utilities",
        description: "A basic calculator application designed to perform mathematical operations through a simple interface.",
        longDescription: "A reliable computational utility that handles arithmetic operations, operator precedence, and numeric expression parsing with a clean, ergonomic layout.",
        techStack: ["Python", "Arithmetic Engine", "Modular Functions"],
        image: "/src/assets/images/project_calculator_app_1794117535241.jpg",
        githubUrl: "https://github.com/harisaiallu144-prog",
        demoUrl: "#projects",
        metrics: "Precision Engine",
        highlights: [
          "Addition, subtraction, multiplication & division",
          "Division-by-zero protection",
          "Clean continuous expression chaining"
        ]
      },
      {
        id: "atm-system",
        number: "03",
        title: "ATM MANAGEMENT SYSTEM",
        category: "Fintech Systems Simulation",
        description: "A beginner programming project that simulates basic ATM operations and banking interactions.",
        longDescription: "A banking interaction simulator modeling core financial transactions including account PIN verification, cash withdrawals, balance inquiries, and transaction logging.",
        techStack: ["Python", "State Management", "Transaction Logic"],
        image: "/src/assets/images/project_atm_system_1794117521001.jpg",
        githubUrl: "https://github.com/harisaiallu144-prog",
        demoUrl: "#projects",
        metrics: "Secure State Flow",
        highlights: [
          "PIN authentication & session validation",
          "Balance checking & withdrawal limit checks",
          "Transaction receipt log generation"
        ]
      },
      {
        id: "grade-calculator",
        number: "04",
        title: "STUDENT GRADE CALCULATOR",
        category: "Academic Analytics",
        description: "An application that calculates student grades based on marks and grading criteria.",
        longDescription: "An academic performance calculator that computes percentages, GPA conversions, and grade bands from multi-subject mark inputs according to institutional grading standards.",
        techStack: ["Python", "Grading Algorithms", "Statistical Mapping"],
        image: "/src/assets/images/project_grade_calculator_1794117520170.jpg",
        githubUrl: "https://github.com/harisaiallu144-prog",
        demoUrl: "#projects",
        metrics: "Accurate Banding",
        highlights: [
          "Weighted mark aggregation",
          "Dynamic grade boundary classification",
          "Performance summary generation"
        ]
      }
    ]
  },
  journey: {
    sectionNumber: "05",
    heading: "THE JOURNEY IS JUST BEGINNING.",
    milestones: [
      {
        stage: "01",
        period: "CURRENT",
        title: "B.Tech — First Semester",
        category: "Higher Education",
        description: "Enrolled in undergraduate engineering, actively mastering computational fundamentals, algorithms, and software engineering principles.",
        points: [
          "Studying foundational computer science principles",
          "Practicing daily algorithmic problem solving",
          "Collaborating with peers on creative technology concepts"
        ]
      },
      {
        stage: "02",
        period: "EXPERIENCE",
        title: "HACKATHONS & IDEATHONS",
        category: "Competitive Prototyping",
        description: "Participated in hackathons and ideathons, exploring innovative ideas, collaboration, and creative problem-solving.",
        points: [
          "Brainstorming tech-first solutions for real-world pain points",
          "Prototyping functional MVP applications under time constraints",
          "Presenting concepts to judges and engineering mentors"
        ]
      }
    ]
  },
  philosophy: {
    sectionNumber: "06",
    quoteLines: [
      "Curiosity creates ideas.",
      "Ideas inspire innovation.",
      "Innovation shapes tomorrow."
    ],
    description: "I believe in continuous learning, creative experimentation, and building things that turn ideas into reality."
  },
  contact: {
    sectionNumber: "07",
    heading: "LET'S BUILD SOMETHING EXTRAORDINARY.",
    subtitle: "Let's connect, exchange ideas, and explore opportunities to build something impactful.",
    social: [
      {
        platform: "LinkedIn",
        label: "linkedin.com/in/harisai-allu-221a44434",
        url: "https://www.linkedin.com/in/harisai-allu-221a44434"
      },
      {
        platform: "GitHub",
        label: "github.com/harisaiallu144-prog",
        url: "https://github.com/harisaiallu144-prog"
      },
      {
        platform: "Email",
        label: "harisaiallu144@gmail.com",
        url: "mailto:harisaiallu144@gmail.com"
      }
    ]
  },
  footer: {
    monogram: "AKS",
    name: "ALLU KUMARSWAMI",
    title: "Aspiring AI Engineer",
    roleDescription: "B.Tech Student | Creative Technology Enthusiast",
    closingStatement: "Designed with curiosity. Built with purpose."
  }
};

const STORAGE_KEY = 'aks_portfolio_custom_config_v2';

export function getPortfolioConfig(): PortfolioConfig {
  if (typeof window === 'undefined') return initialPortfolioConfig;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialPortfolioConfig, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Failed to load portfolioConfig from localStorage', err);
  }
  return initialPortfolioConfig;
}

export function savePortfolioConfig(config: PortfolioConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save portfolioConfig', err);
  }
}

export function resetPortfolioConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
