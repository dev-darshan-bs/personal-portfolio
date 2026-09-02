import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Java",
    description:
      "Build production backend services with strong typing, concurrency, and JVM performance.",
    rating: 5,
    icon: Icons.java,
  },
  {
    name: "Spring Boot",
    description:
      "Ship modular REST services, managed transactions, and production-ready Java applications.",
    rating: 5,
    icon: Icons.springboot,
  },
  {
    name: "Apache Kafka",
    description:
      "Design high-throughput event streams that decouple ingestion from downstream processing.",
    rating: 5,
    icon: Icons.kafka,
  },
  {
    name: "MySQL",
    description:
      "Model transactional data with integrity across rate estimation, wallets, and order persistence.",
    rating: 5,
    icon: Icons.mysql,
  },
  {
    name: "Redis",
    description:
      "Add low-latency caching and resilient state for high-volume booking and billing flows.",
    rating: 4,
    icon: Icons.redis,
  },
  {
    name: "AWS",
    description:
      "Integrate Secrets Manager, S3, and cloud services into secure production backends.",
    rating: 4,
    icon: Icons.amazonaws,
  },
  {
    name: "SQL",
    description:
      "Query and shape relational data for reporting, reconciliation, and service APIs.",
    rating: 4,
    icon: Icons.mysql,
  },
  {
    name: "Python",
    description:
      "Write scripts and supporting tooling around data pipelines and backend automation.",
    rating: 3,
    icon: Icons.python,
  },
  {
    name: "Jenkins",
    description:
      "Automate CI/CD so backend changes ship with tests and repeatable deployments.",
    rating: 4,
    icon: Icons.jenkins,
  },
  {
    name: "JUnit",
    description:
      "Keep services reliable with unit tests and Mockito, targeting 85%+ coverage.",
    rating: 4,
    icon: Icons.junit,
  },
  {
    name: "REST APIs",
    description:
      "Design asynchronous, low-latency HTTP APIs for order ingestion and downstream systems.",
    rating: 5,
    icon: Icons.link,
  },
  {
    name: "Microservices",
    description:
      "Split capabilities across services while keeping contracts clear and failure isolated.",
    rating: 4,
    icon: Icons.gitOrgBuilding,
  },
  {
    name: "Event-Driven Architecture",
    description:
      "Use events to keep booking, publishing, and billing flows fault-tolerant under peak load.",
    rating: 5,
    icon: Icons.zap,
  },
  {
    name: "Spring Data JPA",
    description:
      "Persist domain models with Spring-managed transactions and consistent data access.",
    rating: 4,
    icon: Icons.springboot,
  },
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
