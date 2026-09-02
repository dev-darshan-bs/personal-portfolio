import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "dtdc",
    position: "Software Engineer – Backend",
    company: "DTDC Express",
    location: "Bengaluru, India",
    startDate: new Date("2024-10-01"),
    endDate: "Present",
    description: [
      "Architected a modular Spring Boot booking engine to bring the core booking platform in-house, scaling to 300K–500K daily bookings and boosting company margins by eliminating third-party vendor fees.",
      "Designed high-throughput asynchronous REST APIs and Kafka event streams, decoupling order ingestion from downstream publishing for fault tolerance and low latency under peak loads.",
      "Implemented resilient data layers using MySQL, Redis, and Spring-managed transactions so rate estimation, wallet validation, and order persistence stay atomic with zero data discrepancies.",
    ],
    achievements: [
      "Architected an in-house modular Spring Boot booking platform scaling to 300K–500K daily bookings while removing third-party vendor fees.",
      "Built high-throughput asynchronous REST APIs and Kafka event streams that keep order ingestion decoupled from downstream publishing.",
      "Delivered transactional state and caching with MySQL, Redis, and Spring-managed transactions across rate estimation, wallet validation, and order persistence.",
      "Developed an automated cost reconciliation engine comparing vendor vs. internal billing, auto-triggering rebilling APIs, cutting manual auditing by ~90%, and preventing revenue leaks.",
      "Integrated AWS Secrets Manager, S3, and Jenkins CI/CD while enforcing 85%+ code coverage (JUnit/Mockito) and running RCAs that reduced operational overhead by 60–70%.",
      "Awarded Employee of the Month for high-impact backend delivery and system stability improvements.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "MySQL",
      "Redis",
      "AWS",
      "Jenkins",
      "JUnit",
    ],
    companyUrl: "https://www.dtdc.in",
  },
  {
    id: "nie",
    position: "Bachelor of Engineering in Computer Science",
    company: "The National Institute of Engineering",
    location: "Mysuru, Karnataka",
    startDate: new Date("2020-08-01"),
    endDate: new Date("2024-06-01"),
    description: [
      "Completed a Bachelor of Engineering in Computer Science in 2024.",
      "Built a foundation in data structures, databases, and software engineering that I now apply to distributed backend systems.",
    ],
    achievements: [
      "Graduated with a Bachelor of Engineering in Computer Science (2024).",
      "Focused on software engineering fundamentals that underpin production Java and distributed systems work.",
    ],
    skills: ["Java", "Python", "SQL"],
    companyUrl: "https://www.nie.ac.in",
  },
];
