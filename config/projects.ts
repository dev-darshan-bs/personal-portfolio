import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "dtdc-booking-platform",
    companyName: "In-House Core Booking Platform",
    type: "Professional",
    category: ["Backend", "Full Stack"],
    shortDescription:
      "Modular Spring Boot booking engine brought in-house at DTDC, scaling to 300K–500K daily bookings and removing third-party vendor fees.",
    websiteLink: "https://www.dtdc.in",
    techStack: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Redis",
      "REST APIs",
      "Microservices",
    ],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/booking.svg",
    pagesInfoArr: [
      {
        title: "Modular booking engine",
        description:
          "In-house Spring Boot platform covering rate estimation, wallet validation, and order persistence.",
        imgArr: ["/projects/dtdc/booking.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "At DTDC Express I architected a modular Spring Boot booking engine so the complete core booking platform could run in-house instead of depending on a third-party vendor.",
        "The system is built to absorb 300K–500K daily bookings with transactional integrity across rating, wallet checks, and order writes, which also improved company margins by cutting vendor fees.",
      ],
      bullets: [
        "Architected a modular Spring Boot booking engine to bring the platform in-house.",
        "Scaled to 300K–500K daily bookings while eliminating third-party vendor fees.",
        "Used MySQL, Redis, and Spring-managed transactions so rate estimation, wallet validation, and order persistence stay atomic.",
      ],
    },
  },
  {
    id: "dtdc-kafka-pipelines",
    companyName: "Event-Driven Booking Pipelines",
    type: "Professional",
    category: ["Backend"],
    shortDescription:
      "High-throughput asynchronous REST APIs and Kafka streams that decouple order ingestion from downstream publishing under peak load.",
    websiteLink: "https://www.dtdc.in",
    techStack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "Event-Driven Architecture",
      "REST APIs",
    ],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/kafka.svg",
    pagesInfoArr: [
      {
        title: "Kafka event streams",
        description:
          "Order ingestion is decoupled from downstream publishing for fault tolerance and low latency.",
        imgArr: ["/projects/dtdc/kafka.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "I designed high-throughput asynchronous REST APIs and Apache Kafka event streams for DTDC's booking platform.",
        "Decoupling order ingestion from downstream publishing keeps the system fault-tolerant and low-latency when traffic spikes.",
      ],
      bullets: [
        "Designed asynchronous REST APIs for high-throughput order ingestion.",
        "Built Kafka event streams to isolate downstream publishing from the ingest path.",
        "Focused on fault tolerance and ultra-low latency under peak loads.",
      ],
    },
  },
  {
    id: "dtdc-reconciliation",
    companyName: "Automated Cost Reconciliation Engine",
    type: "Professional",
    category: ["Backend"],
    shortDescription:
      "Pipelines that compare vendor vs. internal billing, auto-trigger rebilling APIs, cut manual auditing by ~90%, and stop revenue leaks.",
    websiteLink: "https://www.dtdc.in",
    techStack: ["Java", "Spring Boot", "MySQL", "SQL", "Jenkins", "AWS"],
    startDate: new Date("2024-10-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/dtdc/reconciliation.svg",
    pagesInfoArr: [
      {
        title: "Billing discrepancy detection",
        description:
          "Automated comparison of vendor and internal records with downstream rebilling.",
        imgArr: ["/projects/dtdc/reconciliation.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "I developed automated data pipelines that compare vendor billing records against internal books to catch discrepancies early.",
        "When a mismatch is found, the engine auto-triggers downstream rebilling APIs. That cut manual auditing by about 90% and reduced revenue leakage.",
      ],
      bullets: [
        "Compared vendor vs. internal billing records to detect discrepancies automatically.",
        "Auto-triggered downstream rebilling APIs to close gaps without manual follow-up.",
        "Cut manual auditing by ~90% and helped prevent revenue leaks.",
        "Paired the work with AWS Secrets Manager, S3, Jenkins CI/CD, and 85%+ JUnit/Mockito coverage.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
