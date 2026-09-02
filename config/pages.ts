import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Darshan BS's portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Backend, distributed systems, and production engineering skills.",
    metadata: {
      title: "Skills",
      description:
        "Darshan BS's key skills in Java, Spring Boot, Kafka, and distributed systems.",
    },
  },
  projects: {
    title: "Projects",
    description: "Production systems and backend platforms I have built.",
    metadata: {
      title: "Projects",
      description:
        "Darshan BS's backend projects — booking platforms, event pipelines, and reconciliation engines.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect about backend systems and engineering roles.",
    metadata: {
      title: "Contact",
      description: "Contact Darshan BS.",
    },
  },
  contributions: {
    title: "Contributions",
    description: "Open-source contributions and community involvement.",
    metadata: {
      title: "Contributions",
      description:
        "Darshan BS's open-source contributions and community involvement.",
    },
  },
  resume: {
    title: "Resume",
    description: "Darshan BS's resume.",
    metadata: {
      title: "Resume",
      description: "Darshan BS's resume.",
    },
  },
  blogs: {
    title: "Blogs",
    description: "Notes on backend engineering, distributed systems, and production software.",
    metadata: {
      title: "Blogs",
      description:
        "Darshan BS's blog — notes on backend engineering and distributed systems.",
    },
  },
  experience: {
    title: "Experience",
    description: "Professional journey and career timeline.",
    metadata: {
      title: "Experience",
      description:
        "Darshan BS's professional journey and experience timeline.",
    },
  },
};
